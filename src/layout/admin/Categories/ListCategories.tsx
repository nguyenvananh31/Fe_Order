import { Form, Input, Button, Upload, Breadcrumb } from 'antd';
import useListCate from './utils/list-categories.hooks';
import { PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

export default function ListCategories() {
    const { ...hooks } = useListCate();


    return (
        <div className="">
            <Breadcrumb
                style={{
                    fontSize: "24px",
                    margin: "28px 0"
                }}
                items={[
                    {
                        title: 'Dashboard',
                    },
                    {
                        title: <h1 className="font-bold">Danh mục</h1>,
                    },
                ]}
            />

            <div className='bg-primary drop-shadow-primary rounded-primary'>
                <h1 className='p-6 text-2xl font-semibold'>Thêm danh mục</h1>
                <Form
                    style={{
                        padding: "0 24px"
                    }}
                    name="categoryForm"
                    // onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        label={(
                            <div className='font-bold'>
                                Tên danh mục
                            </div>
                        )}
                        name="categoryInput"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label={(
                        <div className='font-bold'>
                            Mô tả
                        </div>
                    )}
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item label={(
                        <div className='font-bold'>
                            Hình ảnh mô tả
                        </div>
                    )}
                        valuePropName="fileList" getValueFromEvent={normFile}
                    >
                        <Upload action="/upload.do" listType="picture-card">
                            <button style={{ border: 0, background: 'none' }} type="button">
                                <PlusOutlined />
                                <div className='mt-2'>Upload</div>
                            </button>
                        </Upload>
                    </Form.Item>
                    <Form.Item style={{ paddingBottom: "24px" }}>
                        <Button type="primary" htmlType="submit">
                            Thêm
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
