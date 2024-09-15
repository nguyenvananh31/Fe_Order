/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Form, Input, Button, Select, Upload, message, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import ApiUtils from '../../../utils/api/api.utils';

const { Option } = Select;

const AddProduct: React.FC = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [thumbnailFileList, setThumbnailFileList] = useState<any[]>([]);

  
  const getThumbnailUrl = (file: any) => {
    // Kiểm tra các thuộc tính có thể chứa URL của file upload
    return file?.response?.url || file?.thumbUrl || file?.url;
  };

  const onFinish = async (values: any) => {
    let thumbnailUrl = '';

    // Nếu thumbnailFileList có ảnh, lấy ảnh đầu tiên từ thumbnailFileList
    if (thumbnailFileList.length > 0) {
      thumbnailUrl = getThumbnailUrl(thumbnailFileList[0]);
    }
    // Nếu không có ảnh thumbnail riêng, lấy ảnh đầu tiên từ fileList
    else if (fileList.length > 0) {
      thumbnailUrl = getThumbnailUrl(fileList[0]);
    }

    // Nếu không có ảnh nào, báo lỗi
    if (!thumbnailUrl) {
      message.error('Vui lòng tải lên ít nhất một ảnh.');
      return;
    }

    console.log('Received values:', { ...values, thumbnail: thumbnailUrl });
    const formData = { ...values, thumbnail: thumbnailUrl }
    const dataPost = await ApiUtils.post('/api/admin/products',formData);
    
    message.success('Product added successfully!');
  };

  const handleChange = (info: any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
    setFileList(info.fileList);
  };

  const handleThumbnailChange = (info: any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} thumbnail uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} thumbnail upload failed.`);
    }
    setThumbnailFileList(info.fileList);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Thêm Sản Phẩm</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item label="Tên sản phẩm" name="productName" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}>
          <Input />
        </Form.Item>

        {/* Thêm trường upload ảnh thumbnail */}
        <Form.Item label="Ảnh Thumbnail" name="thumbnail">
          <Upload
            action="/upload" // Replace with your upload URL
            listType="picture-card"
            fileList={thumbnailFileList}
            onChange={handleThumbnailChange}
            onRemove={(file) => setThumbnailFileList(thumbnailFileList.filter(f => f.uid !== file.uid))}
          >
            {thumbnailFileList.length >= 1 ? null : <div><PlusOutlined /> Thêm Thumbnail</div>}
          </Upload>
        </Form.Item>

        <Form.Item label="Danh mục" name="category" rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}>
          <Select placeholder="Chọn danh mục">
            <Option value="category1">Danh mục 1</Option>
            <Option value="category2">Danh mục 2</Option>
          </Select>
        </Form.Item>

        {/* Luôn hiển thị nút thêm biến thể */}
        <Form.List name="variants">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Row key={key} gutter={16} className="mb-4 items-center">
                  <Col span={6}>
                    <Form.Item
                      {...restField}
                      name={[name, 'variantName']}
                      fieldKey={[fieldKey as any, 'variantName']}
                      label="Tên biến thể"
                      rules={[{ required: true, message: 'Vui lòng nhập tên biến thể!' }]}
                    >
                      <Input placeholder="Tên biến thể" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      {...restField}
                      name={[name, 'variantDescription']}
                      fieldKey={[fieldKey as any, 'variantDescription']}
                      label="Mô tả biến thể"
                      rules={[{ required: true, message: 'Vui lòng nhập mô tả biến thể!' }]}
                    >
                      <Input placeholder="Mô tả biến thể" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      {...restField}
                      name={[name, 'variantPrice']}
                      fieldKey={[fieldKey as any, 'variantPrice']}
                      label="Giá biến thể"
                      rules={[{ required: true, message: 'Vui lòng nhập giá biến thể!' }]}
                    >
                      <Input type="number" placeholder="Giá biến thể" />
                    </Form.Item>
                  </Col>
                  <Col span={6} className="flex items-center">
                    <Button onClick={() => remove(name)} danger type="text">
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

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea rows={4} placeholder="Mô tả sản phẩm" />
        </Form.Item>

        <Form.Item label="Ảnh" name="image">
          <Upload
            action="/upload" // Replace with your upload URL
            listType="picture-card"
            fileList={fileList}
            onChange={handleChange}
            onRemove={(file) => setFileList(fileList.filter(f => f.uid !== file.uid))}
            multiple
          >
            {fileList.length >= 8 ? null : <div><PlusOutlined /> Thêm ảnh</div>}
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">Thêm sản phẩm</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddProduct;
