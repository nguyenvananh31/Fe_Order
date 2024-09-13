import React, { useState } from 'react';
import { Form, Input, Button, Select, Upload, message, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import { uploadImageToCloudinary } from '../../../configs/Cloudinary';

const { Option } = Select;

const AddProduct: React.FC = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [variantFields, setVariantFields] = useState<any[]>([]);

  const handleUploadChange = async (info: any) => {
    if (info.file.status === 'done') {
      const response = await uploadImageToCloudinary(info.file.originFileObj);
      if (response) {
        const fileUrl = info.file.response.secure_url;
        if (info.file.originFileObj.type.startsWith('image/thumbnail')) {
          setThumbnail(fileUrl);
        } else {
          setFileList(prevFileList => [...prevFileList, { url: fileUrl }]);
          // Nếu không có thumbnail và có ảnh, chọn ảnh đầu tiên làm thumbnail
          if (!thumbnail && fileList.length === 0) {
            setThumbnail(fileUrl);
          }
        }
        message.success(`${info.file.name} đã được tải lên thành công`);
      }
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} tải lên thất bại.`);
    }
  };

  const onFinish = (values: any) => {
    // Trích xuất liên kết ảnh từ fileList
    const imageFiles = fileList.map(file => file.url);

    // Định dạng dữ liệu biến thể
    const variants = variantFields.map((_, index) => ({
      variantName: values.variants[index]?.variantName,
      variantDescription: values.variants[index]?.variantDescription,
      variantPrice: values.variants[index]?.variantPrice,
    }));

    // Ghi log dữ liệu
    console.log('Dữ liệu gửi lên:', {
      productName: values.productName,
      category: values.category,
      description: values.description,
      thumbnail,
      images: imageFiles,
      variants,
    });

    message.success('Sản phẩm đã được thêm thành công!');
  };

  const addVariant = () => {
    setVariantFields([...variantFields, { id: Date.now() }]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Thêm Sản Phẩm</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item label="Tên sản phẩm" name="productName" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Ảnh thumbnail" name="thumbnail">
          <Upload
            action="/upload-thumbnail"  // Tải ảnh thumbnail lên đây
            listType="picture-card"
            showUploadList={false}
            onChange={handleUploadChange}
            accept="image/*"
          >
            {thumbnail ? <img src={thumbnail} alt="Thumbnail" style={{ width: '100%' }} /> : <div><PlusOutlined /> Thêm thumbnail</div>}
          </Upload>
        </Form.Item>

        <Form.Item label="Danh mục" name="category" rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}>
          <Select placeholder="Chọn danh mục">
            <Option value="category1">Danh mục 1</Option>
            <Option value="category2">Danh mục 2</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea rows={4} placeholder="Mô tả sản phẩm" />
        </Form.Item>

        <Form.Item label="Ảnh" name="image">
          <Upload
            action="/upload"  // Tải ảnh lên đây
            listType="picture-card"
            fileList={fileList.map(file => ({
              url: file.url,
              name: file.name,
              uid: file.uid,
            }))}
            onChange={handleUploadChange}
            multiple
          >
            {fileList.length >= 8 ? null : <div><PlusOutlined /> Thêm ảnh</div>}
          </Upload>
        </Form.Item>

        {variantFields.length > 0 && (
          <div>
            {variantFields.map((variant, index) => (
              <Row key={variant.id} gutter={16} className="mb-4 items-center">
                <Col span={8}>
                  <Form.Item
                    name={['variants', index, 'variantName']}
                    label="Tên biến thể"
                    rules={[{ required: true, message: 'Vui lòng nhập tên biến thể!' }]}
                  >
                    <Input placeholder="Tên biến thể" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name={['variants', index, 'variantDescription']}
                    label="Mô tả biến thể"
                  >
                    <Input placeholder="Mô tả biến thể" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name={['variants', index, 'variantPrice']}
                    label="Giá biến thể"
                    rules={[{ required: true, message: 'Vui lòng nhập giá biến thể!' }]}
                  >
                    <Input type="number" placeholder="Giá biến thể" />
                  </Form.Item>
                </Col>
              </Row>
            ))}
          </div>
        )}

        <Form.Item>
          <Button
            type="dashed"
            onClick={addVariant}
            icon={<PlusOutlined />}
            className="w-full"
          >
            Thêm biến thể
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">Thêm sản phẩm</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddProduct;
