import { Form, Input, Button, Upload, Breadcrumb, Image } from 'antd';
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

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

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
                    onFinish={hooks.onCreateCate}
                    form={hooks.form}
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
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng không để trống name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label={(
                        <div className='font-bold'>
                            Mô tả
                        </div>
                    )}
                        name='description'
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
                        <Upload
                            // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                            listType="picture-card"
                            fileList={hooks.fileList}
                            onPreview={hooks.handlePreview}
                            onChange={hooks.handleChange}
                        >
                            {hooks.fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                        {hooks.previewImage && (
                            <Image
                                wrapperStyle={{ display: 'none' }}
                                preview={{
                                    visible: hooks.previewOpen,
                                    onVisibleChange: (visible) => hooks.setPreviewOpen(visible),
                                    afterOpenChange: (visible) => !visible && hooks.setPreviewImage(''),
                                }}
                                src={hooks.previewImage}
                            />
                        )}
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
