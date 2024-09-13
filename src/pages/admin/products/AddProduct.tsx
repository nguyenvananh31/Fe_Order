import React, { useState } from 'react';
import { Form, Input, Button, Select, Checkbox, Upload, message, Row, Col } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';

const { Option } = Select;

const AddProduct: React.FC = () => {
  const [hasVariants, setHasVariants] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  const onFinish = (values: any) => {
    console.log('Received values:', values);
    message.success('Product added successfully!');
  };

  const handleCheckboxChange = (e: any) => {
    setHasVariants(e.target.checked);
  };

  const handleChange = (info: any) => {
    if (info.file.status === 'done') {
      // File upload success
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      // File upload error
      message.error(`${info.file.name} file upload failed.`);
    }
    setFileList(info.fileList);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Thêm Sản Phẩm</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item label="Tên sản phẩm" name="productName" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Danh mục" name="category" rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}>
          <Select placeholder="Chọn danh mục">
            <Option value="category1">Danh mục 1</Option>
            <Option value="category2">Danh mục 2</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Checkbox onChange={handleCheckboxChange}>Có biến thể</Checkbox>
        </Form.Item>

        {hasVariants ? (
          <Form.List name="variants">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Row key={key} gutter={16} className="mb-4 items-center">
                    <Col span={8}>
                      <Form.Item
                        {...restField}
                        name={[name, 'variantName']}
                        fieldKey={[fieldKey, 'variantName']}
                        label="Tên biến thể"
                        rules={[{ required: true, message: 'Vui lòng nhập tên biến thể!' }]}
                      >
                        <Input placeholder="Tên biến thể" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        {...restField}
                        name={[name, 'variantPrice']}
                        fieldKey={[fieldKey, 'variantPrice']}
                        label="Giá biến thể"
                        rules={[{ required: true, message: 'Vui lòng nhập giá biến thể!' }]}
                      >
                        <Input type="number" placeholder="Giá biến thể" />
                      </Form.Item>
                    </Col>
                    <Col span={8} className="flex items-center">
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
        ) : null}

        <Form.Item label="Giá" name="price" rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}>
          <Input type="number" placeholder="Giá" />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea rows={4} placeholder="Mô tả sản phẩm" />
        </Form.Item>

        <Form.Item label="Ảnh" name="image">
          <Upload
            action="/upload"  // Replace with your upload URL
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
