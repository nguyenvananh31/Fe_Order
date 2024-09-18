// import React, { useState, useEffect } from 'react';
// import { Form, Input, Button, Select, Upload, message, Row, Col } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';
// import 'antd/dist/reset.css';
// import useProducts from './utils/ListProduct.hooks';
// import { FileRule } from '../../../constants/common';
// import useToast from '../../../hooks/useToast';
// import { useEditProduct, useProductDetails } from './utils/EditProduct.hooks'; // Import the hooks

// const { Option } = Select;

// const EditProduct: React.FC<{ productId: string }> = ({ productId }) => {
//   const { cate } = useProducts();
//   const { showToast } = useToast();
//   const { productDetails, fetchProductDetails } = useProductDetails();
//   const { updateProduct } = useEditProduct();
//   const [form] = Form.useForm();
//   const [thumbnailFileList, setThumbnailFileList] = useState<any[]>([]);
//   const [variantFileLists, setVariantFileLists] = useState<any[][]>([]); // Store images for each variant

//   useEffect(() => {
//     const loadProductDetails = async () => {
//       const details = await fetchProductDetails(productId);
//       if (details) {
//         form.setFieldsValue({
//           name: details.name,
//           category_id: details.category_id,
//           variants: details.product_details.map((detail: any) => ({
//             ...detail,
//             images: detail.images.map((image: any) => ({
//               uid: image.id,
//               name: image.name,
//               status: 'done',
//               url: image.url
//             }))
//           }))
//         });
//         setThumbnailFileList([{ uid: '-1', name: 'thumbnail', status: 'done', url: details.thumbnail }]);
//         setVariantFileLists(details.product_details.map((detail: any) => detail.images.map((image: any) => ({
//           uid: image.id,
//           name: image.name,
//           status: 'done',
//           url: image.url
//         }))));
//       }
//     };
//     loadProductDetails();
//   }, [fetchProductDetails, form, productId]);

//   const handleThumbnailChange = (info: any) => {
//     let fileList = [...info.fileList];
//     fileList = fileList.slice(-1);
//     setThumbnailFileList(fileList);
//   };

//   const handleBeforeUpload = (file: any) => {
//     if (!FileRule.accepts.includes(file.type)) {
//       showToast('error', 'Định dạng hình ảnh không hợp lệ, vui lòng chọn hình ảnh khác');
//       return Upload.LIST_IGNORE;
//     }
//     return false; // Prevent automatic upload
//   };

//   const handleVariantImageChange = (info: any, index: number) => {
//     const updatedFileList = [...variantFileLists];
//     updatedFileList[index] = info.fileList;
//     setVariantFileLists(updatedFileList);
//   };

//   const onFinish = async (values: any) => {
//     let thumbnailUrl = '';

//     const hasVariants = values.variants && values.variants.length > 0;

//     if (!thumbnailFileList.length && hasVariants) {
//       const firstVariantWithImages = variantFileLists.find((fileList) => fileList.length > 0);
//       if (firstVariantWithImages) {
//         thumbnailUrl = hooks.getThumbnailUrl(firstVariantWithImages[0]);
//       }
//     } else if (thumbnailFileList.length > 0) {
//       thumbnailUrl = hooks.getThumbnailUrl(thumbnailFileList[0]);
//     }

//     if (!thumbnailUrl) {
//       message.error('Vui lòng tải lên ít nhất một ảnh thumbnail hoặc thêm ảnh cho biến thể.');
//       return;
//     }

//     const productDetails = values.variants.map((variant: any, index: number) => ({
//       size: variant.size,
//       quantity: variant.quantity,
//       sale: variant.sale,
//       status: 1,
//       images: hooks.getImageUrls(variantFileLists[index] || []),
//     }));

//     const data = {
//       name: values.name,
//       thumbnail: thumbnailUrl,
//       status: 1,
//       category_id: values.category_id,
//       product_details: productDetails,
//     };

//     await updateProduct(productId, data);
//     message.success('Product updated successfully!');
//   };

//   return (
//     <div className="container mx-auto p-4 bg-white shadow-sm font-semibold md:mx-4 md:px-3">
//       <h1 className="text-2xl font-bold mb-4">Sửa Sản Phẩm</h1>
//       <Form form={form} onFinish={onFinish} layout="vertical">
//         <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}>
//           <Input />
//         </Form.Item>

//         {/* Upload Thumbnail */}
//         <Form.Item label="Ảnh Thumbnail" name="thumbnail">
//           <Upload
//             listType="picture-card"
//             fileList={thumbnailFileList}
//             onChange={handleThumbnailChange}
//             beforeUpload={handleBeforeUpload}
//             accept={FileRule.accepts}
//           >
//             {thumbnailFileList.length >= 1 ? null : (
//               <div>
//                 <PlusOutlined />
//                 <div style={{ marginTop: 8 }}>Tải lên</div>
//               </div>
//             )}
//           </Upload>
//         </Form.Item>

//         <Form.Item label="Danh mục" name="category_id" rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}>
//           <Select placeholder="Chọn danh mục">
//             <Option value="1">Danh mục</Option>
//             {cate.map((item) => (
//               <Option key={item.id} value={item.id}>
//                 {item.name}
//               </Option>
//             ))}
//           </Select>
//         </Form.Item>

//         {/* Phần biến thể */}
//         <div className="bg-blue-100 rounded-md px-4 py-2 mb-4 shadow-md">
//           <Form.List name="variants">
//             {(fields, { add, remove }) => (
//               <>
//                 {fields.map(({ key, name, fieldKey, ...restField }, index) => (
//                   <Row key={key} gutter={16} className="mb-4 items-center bg-white p-3 rounded-md shadow-md">
//                     {/* Size */}
//                     <Col span={8}>
//                       <Form.Item
//                         {...restField}
//                         name={[name, 'size']}
//                         fieldKey={[fieldKey as any, 'size']}
//                         label="Size"
//                         rules={[{ required: true, message: 'Vui lòng nhập tên biến thể!' }]}
//                       >
//                         <Select placeholder="Size">
//                           <Option value="1">Size</Option>
//                           {/* Add your size options */}
//                         </Select>
//                       </Form.Item>
//                     </Col>

//                     {/* Description */}
//                     <Col span={16}>
//                       <Form.Item
//                         {...restField}
//                         name={[name, 'description']}
//                         fieldKey={[fieldKey as any, 'description']}
//                         label="Mô tả"
//                       >
//                         <Input.TextArea placeholder="Mô tả biến thể" />
//                       </Form.Item>
//                     </Col>

//                     {/* Price */}
//                     <Col span={8}>
//                       <Form.Item
//                         {...restField}
//                         name={[name, 'price']}
//                         fieldKey={[fieldKey as any, 'price']}
//                         label="Giá"
//                         rules={[{ required: true, message: 'Vui lòng nhập giá biến thể!' }]}
//                       >
//                         <Input type="number" placeholder="Giá biến thể" />
//                       </Form.Item>
//                     </Col>

//                     {/* Quantity */}
//                     <Col span={8}>
//                       <Form.Item
//                         {...restField}
//                         name={[name, 'quantity']}
//                         fieldKey={[fieldKey as any, 'quantity']}
//                         label="Kho"
//                         rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
//                       >
//                         <Input type="number" placeholder="Kho" />
//                       </Form.Item>
//                     </Col>

//                     {/* Sale */}
//                     <Col span={8}>
//                       <Form.Item
//                         {...restField}
//                         name={[name, 'sale']}
//                         fieldKey={[fieldKey as any, 'sale']}
//                         label="Sale"
//                         rules={[{ required: true, message: 'Vui lòng nhập trạng thái sale' }]}
//                       >
//                         <Select placeholder="Sale">
//                           <Option value="1">Hỗ trợ</Option>
//                           <Option value="0">Không hỗ trợ</Option>
//                         </Select>
//                       </Form.Item>
//                     </Col>

//                     {/* Image Upload for Each Variant */}
//                     <Col span={24}>
//                       <Form.Item label="Ảnh" name={[name, 'images']}>
//                         <Upload
//                           listType="picture-card"
//                           fileList={variantFileLists[index] || []}
//                           onChange={(info) => handleVariantImageChange(info, index)}
//                           multiple
//                         >
//                           {variantFileLists[index]?.length >= 8 ? null : (
//                             <div>
//                               <PlusOutlined /> Thêm ảnh
//                             </div>
//                           )}
//                         </Upload>
//                       </Form.Item>
//                     </Col>

//                     {/* Remove Button */}
//                     <Col span={24} className="flex items-center">
//                       <Button
//                         className="btn w-full bg-red-600 font-bold text-[#fff]"
//                         onClick={() => remove(name)}
//                         type="text"
//                       >
//                         Xóa
//                       </Button>
//                     </Col>
//                   </Row>
//                 ))}
//                 <Form.Item>
//                   <Button
//                     type="dashed"
//                     onClick={() => add()}
//                     icon={<PlusOutlined />}
//                     className="w-full"
//                   >
//                     Thêm biến thể
//                   </Button>
//                 </Form.Item>
//               </>
//             )}
//           </Form.List>
//         </div>

//         <Form.Item>
//           <Button className="w-full py-5 font-bold text-white bg-green-800 hover:bg-green-950" htmlType="submit">
//             Cập nhật sản phẩm
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default EditProduct;
import React from 'react'

const EditProducts = () => {
  return (
    <div>EditProducts</div>
  )
}

export default EditProducts
