import React, { useState } from 'react';
import { Form, Input, Button, Select, Upload, message, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import useProducts from './utils/ListProduct.hooks';
import { FileRule } from '../../../constants/common';
import useToast from '../../../hooks/useToast';

const { Option } = Select;

const AddProduct: React.FC = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [thumbnailFileList, setThumbnailFileList] = useState<any[]>([]);
  const { showToast } = useToast();

  const getThumbnailUrl = (file: any) => {
    return file?.response?.url || file?.thumbUrl || file?.url;
  };

  const getImageUrls = (fileList: any[]) => {
    return fileList.map(file => getThumbnailUrl(file));
  };

  const { cate } = useProducts();

  const onFinish = async (values: any) => {
    let thumbnailUrl = '';
    let imageUrls = [];

    // Lấy đường dẫn của ảnh thumbnail
    if (thumbnailFileList.length > 0) {
      thumbnailUrl = getThumbnailUrl(thumbnailFileList[0]);
    } else if (fileList.length > 0) {
      thumbnailUrl = getThumbnailUrl(fileList[0]);
    }

    // Kiểm tra nếu không có thumbnail nào
    if (!thumbnailUrl) {
      message.error('Vui lòng tải lên ít nhất một ảnh thumbnail.');
      return;
    }

    // Lấy danh sách đường dẫn ảnh
    imageUrls = getImageUrls(fileList);

    // Log dữ liệu nhận được
    console.log('Received values:', { ...values, thumbnail: thumbnailUrl, images: imageUrls });

    // Tạo dữ liệu để gửi lên server
    const formData = { ...values, thumbnail: thumbnailUrl, images: imageUrls };
    console.log(formData);

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

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleBeforeUpload = async (file: any) => {
    if (!FileRule.accepts.includes(file.type)) {
      showToast('error', 'Định dạng hình ảnh không hợp lệ, vui lòng chọn hình ảnh khác');
      return Upload.LIST_IGNORE;
    }

    return false;
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-sm">
      <h1 className="text-2xl font-bold mb-4">Thêm Sản Phẩm</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Ảnh Thumbnail" name="thumbnail"
          valuePropName="fileList" getValueFromEvent={normFile}
        >
          <Upload
            listType="picture-card"
            fileList={thumbnailFileList}
            onChange={handleThumbnailChange}
            accept={FileRule.accepts}
            beforeUpload={handleBeforeUpload}
          >
            {thumbnailFileList?.length >= 1 ? null :
              (
                <button style={{ border: 0, background: 'none' }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              )
            }
          </Upload>
        </Form.Item>

        <Form.Item label="Danh mục" name="category" rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}>
          <Select placeholder="Chọn danh mục">
            <Option value="" hidden selected>Danh mục</Option>
            {cate.map(item => (
              <Option key={item.id} value={item.id}>{item.name}</Option>
            ))}
          </Select>
        </Form.Item>

        {/* Phần biến thể */}
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

        <Form.Item label="Số lượng" name="quantity">
          <Input type='number' placeholder="Số lượng" />
        </Form.Item>

        <Form.Item label="Ảnh" name="images">
          <Upload
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
