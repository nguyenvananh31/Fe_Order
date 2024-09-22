/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useMemo } from 'react';
import { Form, Input, Button, Select, Upload, message, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import useProducts from './utils/ListProduct.hooks';
import { FileRule } from '../../../constants/common';
import useToast from '../../../hooks/useToast';

import ApiUtils from '../../../utils/api/api.utils';
import { ResponeBase } from '../../../interFaces/common.types';

const { Option } = Select;

const AddProduct: React.FC = () => {
  const [form] = Form.useForm();
  const [thumbnailFileList, setThumbnailFileList] = useState<any[]>([]);
  const [variantFileLists, setVariantFileLists] = useState<any[][]>([]); // Store images for each variant
  const { showToast } = useToast();
  const { cate } = useProducts();
  const [size, setSize] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([])

  useEffect(() => {
    (async () => {
      const { data } = await ApiUtils.fetch<any, ResponeBase<any[]>>('/api/admin/sizes');
      setSize(data);
    })();
  }, []);

  const sizeOptions = useMemo(() => size.map((item) => (
    <Option key={item.id} value={item.id}>
      {item.name}
    </Option>
  )), [size]);

  const cateOptions = useMemo(() => cate.map((item) => (
    <Option key={item.id} value={item.id}>
      {item.name}
    </Option>
  )), [cate]);

  const handleThumbnailChange = (info: any) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    setThumbnailFileList(fileList);
  };

  const handleBeforeUpload = (file: any) => {
    if (!FileRule.accepts.includes(file.type)) {
      showToast('error', 'Định dạng hình ảnh không hợp lệ, vui lòng chọn hình ảnh khác');
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const handleVariantImageChange = (info: any, index: number) => {
    const updatedFileList = [...variantFileLists];
    updatedFileList[index] = info.fileList;
    setVariantFileLists(updatedFileList);
  };

  const onFinish = async (values: any) => {
    const formData = new FormData();
    console.log(values);

    let thumbnailFile = thumbnailFileList[0];
    if (!thumbnailFile && values.variants && values.variants.length > 0) {
      const firstVariantWithImages = variantFileLists.find((fileList) => fileList.length > 0);
      if (firstVariantWithImages) {
        thumbnailFile = firstVariantWithImages[0].originFileObj;
      }
    }

    if (!thumbnailFile) {
      message.error('Vui lòng tải lên ít nhất một ảnh thumbnail hoặc thêm ảnh cho biến thể.');
      return;
    }

    formData.append('thumbnail', thumbnailFile.originFileObj);

    values.variants.forEach((variant: any, index: number) => {

      formData.append(`product_details[${index}][size_id]`, variant.size)
      formData.append(`product_details[${index}][price]`, variant.price)
      formData.append(`product_details[${index}][quantity]`, variant.quantity)
      formData.append(`product_details[${index}][sale]`, variant.sale)
      variant.images.fileList.forEach((item) => {
        formData.append(`product_details[${index}][images][][file]`, item.originFileObj)
      })
      // return {
      //   size_id: variant.size,
      //   quantity: Number(variant.quantity),
      //   price: Number(variant.price),
      //   sale: Number(variant.sale),
      //   images: variantImages,
      //   status: 1,
      // };
    });

    formData.append('name', values.name);
    formData.append('status', '1');
    formData.append('category_id', values.category_id);
    // formData.append('product_details', productDetails);

    try {
      const response = await ApiUtils.postForm('/api/admin/products', formData);
      if (response) {
        message.success('Sản phẩm đã được thêm thành công!');
      }
    } catch (error) {
      console.error('Failed to add product:', error);
      message.error('Failed to add product. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-sm font-semibold md:mx-4 md:px-3">
      <h1 className="text-2xl font-bold mb-4">Thêm Sản Phẩm</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}>
          <Input />
        </Form.Item>

        {/* Upload Thumbnail */}
        <Form.Item label="Ảnh Thumbnail" name="thumbnail">
          <Upload
            listType="picture-card"
            fileList={thumbnailFileList}
            onChange={handleThumbnailChange}
            beforeUpload={handleBeforeUpload}
            accept={FileRule.accepts}
          >
            {thumbnailFileList.length >= 1 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải lên</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item label="Danh mục" name="category_id" rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}>
          <Select placeholder="Chọn danh mục">
            {cateOptions}
          </Select>
        </Form.Item>

        {/* Phần biến thể */}
        <div className="bg-blue-100 rounded-md px-4 py-2 mb-4 shadow-md">
          <Form.List name="variants">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                  <Row key={key} gutter={16} className="mb-4 items-center bg-white p-3 rounded-md shadow-md">
                    {/* Size */}
                    <Col span={8}>
                      <Form.Item
                        {...restField}
                        name={[name, 'size']}
                        fieldKey={[fieldKey as any, 'size']}
                        label="Size"
                        rules={[{ required: true, message: 'Vui lòng nhập tên biến thể!' }]}
                      >
                        <Select placeholder="Size">
                          {sizeOptions}
                        </Select>
                      </Form.Item>
                    </Col>

                    {/* Description */}
                    <Col span={16}>
                      <Form.Item
                        {...restField}
                        name={[name, 'description']}
                        fieldKey={[fieldKey as any, 'description']}
                        label="Mô tả"
                      >
                        <Input.TextArea placeholder="Mô tả biến thể" />
                      </Form.Item>
                    </Col>

                    {/* Price */}
                    <Col span={8}>
                      <Form.Item
                        {...restField}
                        name={[name, 'price']}
                        fieldKey={[fieldKey as any, 'price']}
                        label="Giá"
                        rules={[{ required: true, message: 'Vui lòng nhập giá biến thể!' }]}
                      >
                        <Input type="number" placeholder="Giá biến thể" />
                      </Form.Item>
                    </Col>

                    {/* Quantity */}
                    <Col span={8}>
                      <Form.Item
                        {...restField}
                        name={[name, 'quantity']}
                        fieldKey={[fieldKey as any, 'quantity']}
                        label="Kho"
                        rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
                      >
                        <Input type="number" placeholder="Kho" />
                      </Form.Item>
                    </Col>

                    {/* Sale */}
                    <Col span={8}>
                      <Form.Item
                        {...restField}
                        name={[name, 'sale']}
                        fieldKey={[fieldKey as any, 'sale']}
                        label="Sale"
                        rules={[{ required: true, message: 'Vui lòng nhập giá sale' }]}
                      >
                        <Input type="number" placeholder="Sale" />
                      </Form.Item>
                    </Col>

                    {/* Images */}
                    <Col span={24}>
                      <Form.Item label="Ảnh" name={[name, 'images']}>
                        <Upload
                          listType="picture-card"
                          fileList={variantFileLists[index] || []}
                          onChange={(info) => handleVariantImageChange(info, index)}
                          multiple
                        >
                          {variantFileLists[index]?.length >= 8 ? null : (
                            <div>
                              <PlusOutlined /> Thêm ảnh
                            </div>
                          )}
                        </Upload>
                      </Form.Item>
                    </Col>

                    {/* Button */}
                    <Col span={24} className="flex items-center">
                      <Button
                        className="btn w-full bg-red-600 font-bold text-[#fff]"
                        onClick={() => remove(name)}
                        type="text"
                      >
                        Xóa
                      </Button>
                    </Col>
                  </Row>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    className="w-full"
                  >
                    Thêm biến thể
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </div>

        <Form.Item>
          <Button className="w-full py-5 font-bold text-white bg-green-800 hover:bg-green-950" htmlType="submit">
            Thêm sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;

