import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, InputNumber, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import useProducts from './utils/ListProduct.hooks';
import { IProduct } from '../../../interFaces/product';
import ApiUtils from '../../../utils/api/api.utils';
import { ResponeBase } from '../../../interFaces/common.types';

const { Option } = Select;

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();  
  const navigate = useNavigate();
  const { products, cate } = useProducts(); 
  const [form] = Form.useForm();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);  
  const [previewImage, setPreviewImage] = useState<string>('');  

  const [variations, setVariations] = useState<any[]>([]);  // Biến thể sản phẩm

  useEffect(() => {
    const selectedProduct = products.find((p: IProduct) => p.id === Number(id));
    if (selectedProduct) {
      setProduct(selectedProduct);
      setPreviewImage(selectedProduct.thumbnail);  
      form.setFieldsValue({
        name: selectedProduct.name,
        price: selectedProduct.price,
        sub_categories_id: selectedProduct.sub_categories_id,
        description: selectedProduct.description,
        variations: selectedProduct.variations || [], // Set biến thể nếu có
      });
    }
  }, [id, products, form]);

  const onFinish = (values: any) => {
    const updatedProduct = { ...product, ...values, thumbnail: previewImage, variations };
    onUpdate(updatedProduct);
    navigate('/products');
  };

  const handleUpload = (info: any) => {
    if (info.file.status === 'done') {
      setPreviewImage(info.file.response.url);
      message.success(`${info.file.name} tải lên thành công.`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} tải lên thất bại.`);
    }
  };

  const apiUpdatePro = async (id: number, body: FormData, params?: any) => { 
    const res = await ApiUtils.postForm<FormData, ResponeBase<IProduct>>(`/api/admin/products/${id}?${params}`, body); 
    return res;
  };

  const onUpdate = async (updatedProduct: any) => {
    try {
      const { id, name, price, sub_categories_id, description, thumbnail, variations } = updatedProduct;
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', String(price)); 
      formData.append('sub_categories_id', String(sub_categories_id));
      formData.append('description', description || ''); 
      formData.append('variations', JSON.stringify(variations)); // Add variations
      if (thumbnail) {
        formData.append('thumbnail', thumbnail); 
      }

      const response = await apiUpdatePro(id, formData);

      if (response.success) {
        message.success('Cập nhật sản phẩm thành công!');
      } else {
        message.error('Cập nhật sản phẩm thất bại!');
      }
    } catch (error) {
      message.error('Đã xảy ra lỗi khi cập nhật sản phẩm.');
      console.error(error);
    }
  };

  // Hàm thêm biến thể mới
  const addVariation = () => {
    setVariations([...variations, { size: '', color: '', stock: 0 }]);
  };

  // Hàm cập nhật thông tin biến thể
  const updateVariation = (index: number, key: string, value: any) => {
    const newVariations = [...variations];
    newVariations[index][key] = value;
    setVariations(newVariations);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sửa Sản Phẩm</h1>
      {product && (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            name: product.name,
            price: product.price,
            sub_categories_id: product.sub_categories_id,
            description: product.description,
          }}
        >
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: 'Tên sản phẩm là bắt buộc!' }]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>

          <Form.Item
            label="Giá sản phẩm"
            name="price"
            rules={[{ required: true, message: 'Giá sản phẩm là bắt buộc!' }]}
          >
            <InputNumber
              min={0}
              formatter={(value) => `${value} VND`}
              parser={(value) => value!.replace(' VND', '')}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            label="Danh mục"
            name="sub_categories_id"
            rules={[{ required: true, message: 'Danh mục là bắt buộc!' }]}
          >
            <Select placeholder="Chọn danh mục">
              {cate.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Mô tả" name="description">
            <Input.TextArea rows={4} placeholder="Nhập mô tả sản phẩm" />
          </Form.Item>

          <Form.Item label="Ảnh sản phẩm">
            {previewImage && (
              <div className="mb-4">
                <img src={previewImage} alt="Product Thumbnail" className="w-48 h-32 object-cover rounded" />
              </div>
            )}
            <Upload
              name="thumbnail"
              listType="picture"
              className="upload-list-inline"
              maxCount={1}
              fileList={fileList}
              onChange={handleUpload}
              beforeUpload={(file) => {
                const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                if (!isJpgOrPng) {
                  message.error('You can only upload JPG/PNG file!');
                }
                return isJpgOrPng;
              }}
            >
              <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
            </Upload>
          </Form.Item>

          {/* Biến thể */}
          <h3 className="text-lg font-medium mb-2">Biến thể sản phẩm</h3>
          {variations.map((variation, index) => (
            <div key={index} className="mb-4">
              <Form.Item label="Kích thước">
                <Input
                  placeholder="Nhập kích thước"
                  value={variation.size}
                  onChange={(e) => updateVariation(index, 'size', e.target.value)}
                />
              </Form.Item>

              <Form.Item label="Màu sắc">
                <Input
                  placeholder="Nhập màu sắc"
                  value={variation.color}
                  onChange={(e) => updateVariation(index, 'color', e.target.value)}
                />
              </Form.Item>

              
            </div>
          ))}
          <Button onClick={addVariation}>Thêm biến thể</Button>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default EditProduct;
