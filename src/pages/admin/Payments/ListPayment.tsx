// src/App.tsx

import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Popconfirm, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';

const { Option } = Select;

interface PaymentMethod {
    key: string;
    name: string;
    status: boolean;
}

const initialData: PaymentMethod[] = [
    { key: '1', name: 'Thẻ tín dụng', status: true },
    { key: '2', name: 'PayPal', status: false },
];

const ListPayment: React.FC = () => {
    const [data, setData] = useState<PaymentMethod[]>(initialData);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState<null | PaymentMethod>(null);
    const [form] = Form.useForm();

    const handleAdd = () => {
        setEditingRecord(null);
        form.resetFields();
        setModalVisible(true);
    };

    const handleEdit = (record: PaymentMethod) => {
        setEditingRecord(record);
        form.setFieldsValue(record);
        setModalVisible(true);
    };

    const handleDelete = (key: string) => {
        Popconfirm({
            title: 'Bạn có chắc chắn muốn xóa phương thức thanh toán này?',
            onConfirm: () => {
                setData(data.filter(item => item.key !== key));
                notification.success({ message: 'Xóa phương thức thanh toán thành công!' });
            },
            okText: 'Có',
            cancelText: 'Không',
        });
    };

    const handleSubmit = (values: { name: string; status: boolean }) => {
        if (editingRecord) {
            setData(data.map(item => item.key === editingRecord.key ? { ...item, ...values } : item));
            notification.success({ message: 'Sửa phương thức thanh toán thành công!' });
        } else {
            setData([...data, { key: (data.length + 1).toString(), ...values }]);
            notification.success({ message: 'Thêm phương thức thanh toán thành công!' });
        }
        setModalVisible(false);
    };

    const columns: ColumnsType<PaymentMethod> = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Tên phương thức thanh toán',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: boolean) => (
                <span className={`p-2 text-white rounded-md ${status ? 'bg-green-500' : 'bg-red-500'}`}>
                    {status ? 'Hoạt động' : 'Ngừng hoạt động'}
                </span>
            ),
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
                        title="Bạn có chắc chắn muốn xóa?"
                        onConfirm={() => handleDelete(record.key)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button
                            icon={<DeleteOutlined />}
                            danger
                        />
                    </Popconfirm>
                </span>
            ),
        },
    ];

    return (
        <>
            <section className="py-4 bg-white sm:py-16 lg:py-10 mt-8 rounded-lg shadow-md">
                <div className="px-4 mx-auto sm:px-3 lg:px-4 max-w-7xl">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="flex items-center justify-center">
                            <div className="w-20 h-20 -mr-6 overflow-hidden bg-gray-300 rounded-full shadow-lg">
                                <img
                                    className="object-fill w-full h-full ob"
                                    src="https://www.brookings.edu/wp-content/uploads/2021/07/shutterstock_712977508_small.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="relative overflow-hidden bg-gray-300 border-8 border-white rounded-full shadow-lg w-28 h-28">
                                <img
                                    className="object-fill w-full h-full"
                                    src="https://img.utdstc.com/icon/d49/c48/d49c4851fcbdecccece71a27cddf0a6bddb23173461e763ec32cd08eeb778c69:200"
                                    alt=""
                                />
                            </div>
                            <div className="w-20 h-20 -ml-6 overflow-hidden bg-gray-300 rounded-full shadow-lg">
                                <img
                                    className="object-fill w-full h-full"
                                    src="https://news.nganluong.vn/wp-content/uploads/nhung-uu-diem-dang-noi-cua-hinh-thuc-thanh-toan-qr-pay1-300x200.jpg"
                                    alt=""
                                />
                            </div>
                        </div>
                        <h2 className="mt-8 text-2xl font-bold leading-tight text-black lg:mt-12 sm:text-3xl lg:text-4xl">
                            Join <span className="border-b-8 border-yellow-300">5,482</span> other
                            developers
                        </h2>
                        <p className="max-w-xl mx-auto mt-6 text-xl text-gray-600 md:mt-10">
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
                            sint. Velit officia consequat duis.
                        </p>
                        <Button type="primary" onClick={handleAdd} className='inline-flex items-center justify-center px-4 py-4 mt-4 font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md lg:mt-6 hover:bg-blue-700 focus:bg-blue-700'>
                            Thêm phương thức
                        </Button>
                    </div>
                </div>
                <div className="px-4 mx-auto sm:px-3 lg:px-4 max-w-7xl border-t-2 mt-6">

                    <Table columns={columns} dataSource={data} rowKey="key" />

                    <Modal
                        visible={modalVisible}
                        title={editingRecord ? 'Sửa phương thức thanh toán' : 'Thêm phương thức thanh toán'}
                        onCancel={() => setModalVisible(false)}
                        footer={null}
                        destroyOnClose
                    >
                        <Form
                            form={form}
                            onFinish={handleSubmit}
                            layout="vertical"
                        >
                            <Form.Item
                                name="name"
                                className='text-base font-medium text-gray-900'
                                label="Tên phương thức thanh toán"
                                rules={[{ required: true, message: 'Vui lòng nhập tên phương thức!' }]}
                            >
                                <Input className='block w-full text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600' />
                            </Form.Item>
                            <Form.Item
                                name="status"
                                className='text-base font-medium text-gray-900'
                                label="Trạng thái"
                                rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
                            >
                                <Select placeholder="Chọn trạng thái">
                                    <Option value={true}>Hoạt động</Option>
                                    <Option value={false}>Ngừng hoạt động</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className='w-full mt-1'>
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
