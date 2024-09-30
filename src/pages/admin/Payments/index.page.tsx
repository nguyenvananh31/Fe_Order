/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloseCircleFilled, DeleteOutlined, EditOutlined, LoadingOutlined, PlusOutlined, QuestionCircleOutlined, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Col, Form, Input, Modal, notification, Popconfirm, Row, Select, Table, Tooltip } from 'antd';
import 'antd/dist/reset.css';
import type { ColumnsType } from 'antd/es/table';
import React, { useCallback, useEffect, useState } from 'react';
import ApiUtils from '../../../utils/api/api.utils';

const { Option } = Select;

interface PaymentMethod {
    key: string;
    name: string;
    status: number;
}

const ListPayment: React.FC = () => {
    const [data, setData] = useState<PaymentMethod[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState<null | PaymentMethod>(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res: any = await ApiUtils.fetch('/api/admin/payments');
            const transformedData = res.data.map((payment: any, index: number) => ({
                key: payment.id,
                name: payment.name,
                status: payment.status,
                index: index + 1 // Thêm số thứ tự (STT) cho mỗi bản ghi
            }));
            console.log("Transformed Data:", transformedData); // Kiểm tra dữ liệu đã chuyển đổi
            setData(transformedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleAdd = () => {
        setEditingRecord(null);
        form.resetFields();
        setModalVisible(true);
    };

    const handleEdit = (record: any) => {
        setEditingRecord(record);
        form.setFieldsValue(record);
        setModalVisible(true);
    };

    const handleDelete = (key: string) => {
        ApiUtils.remove(`/api/admin/payments/${key}`)
            .then(() => {
                fetchData(); // Cập nhật danh sách dữ liệu ngay sau khi xóa thành công
                notification.success({ message: 'Xóa phương thức thanh toán thành công!' });
            })
            .catch(error => {
                notification.error({ message: 'Lỗi khi xóa phương thức thanh toán!' });
                console.error('Error deleting data:', error);
            });
    };

    const handleSubmit = (values: { name: string; status: number }) => {
        if (editingRecord) {
            ApiUtils.put(`/api/admin/payments/${editingRecord.key}`, values)
                .then(() => {
                    fetchData(); // Cập nhật danh sách dữ liệu ngay sau khi sửa thành công
                    notification.success({ message: 'Sửa phương thức thanh toán thành công!' });
                    setModalVisible(false);
                })
                .catch(error => {
                    notification.error({ message: 'Lỗi khi cập nhật phương thức thanh toán!' });
                    console.error('Error updating data:', error);
                });
        } else {
            ApiUtils.post('/api/admin/payments', values)
                .then(response => {
                    console.log('Response from server:', response); // Xem phản hồi từ server
                    fetchData(); // Lấy lại dữ liệu mới nhất sau khi thêm thành công
                    notification.success({ message: 'Thêm phương thức thanh toán thành công!' });
                    setModalVisible(false);
                })
                .catch(error => {
                    console.error('Error adding data:', error); // In chi tiết lỗi
                    notification.error({ message: 'Lỗi khi thêm phương thức thanh toán!' });
                });
        }
    };

    //     //Search
    // /** Event KeyEnter */
    // useEffect(() => {

    //     const keyDownListener = (event: KeyboardEvent) => {
    //         if (event.code === 'Enter' || event.code === 'NumpadEnter') {
    //             setState((prev) => ({ ...prev, pageIndex: 1, search: false, enterSearch: true, refresh: !prev.refresh }));
    //         }
    //     };
    //     document.addEventListener('keydown', keyDownListener);
    //     return () => {
    //         document.removeEventListener('keydown', keyDownListener);
    //     };
    // }, []);

    // //Search text
    // const handleChangeTextSearch = (value: string) => {
    //     setOptions([]);
    //     setState(prev => ({ ...prev, textSearch: value, search: true }));
    // }

    // //Handle click btn search
    // const handleSearchBtn = useCallback(() => {
    //     setState((prev) => ({ ...prev, pageIndex: 1, search: false, enterSearch: true, refresh: !prev.refresh }));
    // }, []);

    // // làm mới data
    // const refreshPage = useCallback(() => {
    //     setState((prev) => ({ ...initState, refresh: !prev.refresh }));
    // }, []);


    const columns: ColumnsType<PaymentMethod> = [
        {
            title: 'STT',
            dataIndex: 'index', // Sử dụng số thứ tự (index) cho cột STT
            key: 'index',
        },
        {
            title: 'Tên phương thức thanh toán',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            align: 'center',
            width: '15%',
            render: (_: any, { status }: any) => (
                <Tooltip title="Thay đổi trạng thái">
                    <Popconfirm
                        placement='topRight'
                        title={`${!status ? 'Hiển thị' : 'Ẩn'} danh mục`}
                        description={`Bạn có muốn ${!status ? 'hiển thị' : 'ẩn'} danh mục này?`}
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        okText="Có"
                        cancelText="Không"
                    // onConfirm={() => hooks.handleChangeStatus(id, status)}
                    >
                        <Button danger={!status} className={`${!!status && 'border-green-600 text-green-600'} min-w-[80px]`}>
                            {!!status ? "Hiển thị" : 'Ẩn'}
                        </Button>
                    </Popconfirm>
                </Tooltip>
            )
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record: PaymentMethod) => (
                <span>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                        style={{ marginRight: 8 }}
                        type="default"
                    />
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa phương thức thanh toán này?"
                        onConfirm={() => handleDelete(record.key)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </span>
            ),
        },
    ];

    return (
        <>
            <section className="py-2 bg-white sm:py-8 lg:py-6 rounded-lg shadow-md">
                {/* <Row gutter={[16, 16]} className="px-6 py-6" align={"middle"} justify={"space-between"} >
                    <Col xs={24} sm={24} md={24} lg={15} className="flex gap-2 max-sm:flex-col">
                        <AutoComplete
                            size="large"
                            options={options}
                            className="max-sm:w-full md:w-[400px] flex-1"
                            onSearch={handleChangeTextSearch}
                            placeholder={
                                <div className="flex items-center gap-1 cursor-pointer h-max">
                                    <SearchOutlined className="text-lg text-ghost" />
                                    <span className="text-ghost text-[14px]">Tìm kích thước</span>
                                </div>
                            }
                            allowClear={{ clearIcon: state.loadingSearch ? <LoadingOutlined /> : <CloseCircleFilled /> }}
                            onSelect={(id) => handleEdit(+id)}
                            value={state.textSearch}
                        />
                        <div className="flex gap-2">
                            <Button onClick={handleSearchBtn} className="w-max" size="large" icon={<SearchOutlined />}>Tìm kiếm</Button>
                            <Button className="w-max" size="large" icon={<UndoOutlined />} onClick={refreshPage}>Làm mới</Button>
                        </div>
                    </Col>
                    <Col>
                        <Button
                            size="large"
                            type='primary'
                            icon={<PlusOutlined />}
                            onClick={() => handleAdd()}
                        >
                            Thêm phương thức
                        </Button>
                    </Col>
                </Row> */}

                <div className="px-4 mx-auto sm:px-3 lg:px-4 max-w-7xl mt-6">
                    <Table columns={columns} dataSource={data} rowKey="key" />

                    <Modal
                        open={modalVisible}
                        title={editingRecord ? 'Sửa phương thức thanh toán' : 'Thêm phương thức thanh toán'}
                        onCancel={() => setModalVisible(false)}
                        footer={null}
                        destroyOnClose
                    >
                        <Form form={form} onFinish={handleSubmit} layout="vertical">
                            <Form.Item
                                name="name"
                                className="text-base font-medium text-gray-900"
                                label="Tên phương thức thanh toán"
                                rules={[{ required: true, message: 'Vui lòng nhập tên phương thức!' }]} >
                                <Input className="block w-full text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                            </Form.Item>
                            <Form.Item
                                name="status"
                                className="text-base font-medium text-gray-900"
                                label="Trạng thái"
                                rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}>
                                <Select placeholder="Chọn trạng thái">
                                    <Option value={1}>Hoạt động</Option>
                                    <Option value={0}>Ngừng hoạt động</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="w-full mt-1">
                                    Lưu
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </section>
        </>
    );
};

export default ListPayment;
