import { DeleteOutlined, PlusOutlined, QuestionCircleOutlined, ZoomInOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Drawer, Form, Image, Input, Popconfirm, Space, Table, Tooltip, Upload } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { FileRule, getImageUrl } from '../../../constants/common';
import { Icate } from '../../../interFaces/categories';
import useListCate from './utils/list-categories.hooks';
const { TextArea } = Input;


export default function ListCategories() {

    const { ...hooks } = useListCate();

    const columns: ColumnProps<Icate>[] = [
        {
            title: 'STT',
            dataIndex: 'stt',
            width: 50,
            align: 'center',
            fixed: 'left',
            render: (_: any, __: Icate, index: number) => {
                return (
                    <span>
                        {Number(hooks.state.pageIndex) > 1 ? (Number(hooks.state.pageIndex) - 1) * hooks.state.pageSize + (index + 1) : index + 1}
                    </span>
                );
            },
        },
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: 'name',
            render: (_: any, item: Icate) => {
                return (
                    <div onClick={() => {hooks.handleEditCate(item.id)}} className='text-purple font-semibold cursor-pointer'>
                        {item.name}
                    </div>
                )
            }
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            width: 'auto',
            align: 'center',
            render: (_: any, item: any) => {
                return (
                    <Image
                        style={{ objectFit: 'cover', width: '120px', height: '80px' }}
                        src={item.image ? getImageUrl(item.image) : '/images/no-image.png'}
                        preview={{
                            mask: (
                                <Space direction="vertical" align="center">
                                    <ZoomInOutlined />
                                </Space>
                            ),
                        }}
                    />
                );
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            align: 'center',
            width: '15%',
            render: (_: any, { status }: any) => (
                <Tooltip title="Thay đổi trạng thái">
                    <Button danger={!status} className={`${!!status && 'border-green-600 text-green-600'} min-w-[80px]`}>
                        {!!status ? "Hiển thị" : 'Ẩn'}
                    </Button>
                </Tooltip>
            )
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            align: 'center',
            width: '15%',
            fixed: 'right',
            render: (_: any, { id }: any) => (
                <Tooltip title="Xoá danh mục">
                    <Popconfirm
                        placement='topRight'
                        title="Xoá danh mục"
                        description="Bạn có muốn xoá danh mục này?"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        okText="Có"
                        cancelText="Không"
                        onConfirm={() => hooks.handleDeleteCate(id)}
                    >
                        <Button className='ml-2' danger icon={<DeleteOutlined />}></Button>
                    </Popconfirm>
                </Tooltip>
            )
        },
    ];

    return (
        <>
            {hooks.contextHolder}
            <Breadcrumb
                style={{
                    fontSize: "24px",
                    margin: "16px 0 28px 0"
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
                <div className='flex items-center justify-between'>
                    <h1 className='p-6 text-xl font-semibold'>Danh mục</h1>
                    <Button
                        type='primary'
                        icon={<PlusOutlined />}
                        className='mx-6'
                        onClick={hooks.showDraw}
                    >
                        Thêm mới
                    </Button>
                </div>
                <Table
                    loading={hooks.state.loading}
                    dataSource={hooks.dataSource}
                    columns={columns}
                    rowKey="id"
                    pagination={{
                        pageSize: hooks.state.pageSize,
                        showSizeChanger: true,
                        pageSizeOptions: ['5', '10', '20', '50'], // Các tùy chọn số lượng bản ghi
                        total: hooks.state.totalCate,
                        current: hooks.state.pageIndex,
                        style: {
                            paddingRight: "24px",
                        },
                        onChange(page, pageSize) {
                            hooks.handlePageChange(page, pageSize);
                        },
                    }}
                />
            </div>
            <Drawer
                closable
                destroyOnClose
                title={<div className='text-primary font-bold'>Danh mục</div>}
                placement="right"
                open={hooks.state.showDrawAdd}
                loading={hooks.state.loading}
                onClose={hooks.showDraw}
            >
                <Form
                    form={hooks.form}
                    onFinish={hooks.onCreateCate}
                    name="categoryForm"
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
                        rules={[{ required: true, message: 'Vui lòng không để trống name!' }]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item label={(
                        <div className='font-bold'>
                            Hình ảnh mô tả
                        </div>
                    )}
                        valuePropName="fileList" getValueFromEvent={hooks.normFile}
                    >
                        <Upload
                            listType="picture-card"
                            fileList={hooks.fileList}
                            onPreview={hooks.handlePreview}
                            onChange={hooks.handleChange}
                            accept={FileRule.accepts}
                            beforeUpload={hooks.handleBeforeUpload}
                        >
                            {hooks.fileList?.length >= 1 ? null :
                                (
                                    <button style={{ border: 0, background: 'none' }} type="button">
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </button>
                                )
                            }
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
            </Drawer>
        </>
    );
}
