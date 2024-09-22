/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Popconfirm, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import ApiUtils from '../../../utils/api/api.utils';

interface OrderDetail {
    id: number;
    table_id: number;
    user_id: number;
    phone_number: string;
    date_order: string;
    time_order: string;
    description: string;
    status: string;
}

const DetailOrderTable: React.FC = () => {
    const [data, setData] = useState<OrderDetail[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState<null | OrderDetail>(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await ApiUtils.fetch('/api/admin/time_order_table');
            console.log("Data fetched:", res.data);
            setData(res.data); // Set the data directly as it is returned from the API
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleAdd = () => {
        setEditingRecord(null);
        form.resetFields();
        setModalVisible(true);
    };

    const handleEdit = (record: OrderDetail) => {
        setEditingRecord(record);
        form.setFieldsValue(record);
        setModalVisible(true);
    };

    const handleDelete = async (id: number) => {
        try {
            await ApiUtils.remove(`/api/admin/time_order_table/${id}`);
            fetchData();
            notification.success({ message: 'Order deleted successfully!' });
        } catch (error) {
            console.error('Error deleting order:', error);
            notification.error({ message: 'Failed to delete order!' });
        }
    };

    const handleSubmit = async (values: any) => {
        try {
            if (editingRecord) {
                await ApiUtils.put(`/api/admin/time_order_table/${editingRecord.id}`, values);
                notification.success({ message: 'Order updated successfully!' });
            } else {
                await ApiUtils.post('/api/admin/time_order_table', values);
                notification.success({ message: 'Order added successfully!' });
            }
            setModalVisible(false);
            fetchData();
        } catch (error) {
            console.error('Error submitting form:', error);
            notification.error({ message: 'Failed to submit order!' });
        }
    };

    const columns: ColumnsType<OrderDetail> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Table ID',
            dataIndex: 'table_id',
            key: 'table_id',
        },
        {
            title: 'User ID',
            dataIndex: 'user_id',
            key: 'user_id',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
        {
            title: 'Date Order',
            dataIndex: 'date_order',
            key: 'date_order',
        },
        {
            title: 'Time Order',
            dataIndex: 'time_order',
            key: 'time_order',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record: OrderDetail) => (
                <span>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                        style={{ marginRight: 8 }}
                        type="default"
                    />
                    <Popconfirm
                        title="Are you sure you want to delete this order?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
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
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold leading-tight text-black">
                            Order Details
                        </h2>
                        <Button
                            type="primary"
                            onClick={handleAdd}
                            className="inline-flex items-center justify-center px-4 py-4 mt-4 font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md lg:mt-6 hover:bg-blue-700 focus:bg-blue-700"
                        >
                            Add Order
                        </Button>
                    </div>
                </div>

                <div className="px-4 mx-auto sm:px-3 lg:px-4 max-w-7xl border-t-2 mt-6">
                    <Table columns={columns} dataSource={data} rowKey="id" pagination={{ pageSize: 5 }} />

                    <Modal
                        open={modalVisible}
                        title={editingRecord ? 'Edit Order' : 'Add Order'}
                        onCancel={() => setModalVisible(false)}
                        footer={null}
                        destroyOnClose
                    >
                        <Form form={form} onFinish={handleSubmit} layout="vertical">
                            <Form.Item
                                name="table_id"
                                label="Table ID"
                                rules={[{ required: true, message: 'Please enter the Table ID!' }]}
                            >
                                <Input type="number" />
                            </Form.Item>
                            <Form.Item
                                name="user_id"
                                label="User ID"
                                rules={[{ required: true, message: 'Please enter the User ID!' }]}
                            >
                                <Input type="number" />
                            </Form.Item>
                            <Form.Item
                                name="phone_number"
                                label="Phone Number"
                                rules={[{ required: true, message: 'Please enter the phone number!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="date_order"
                                label="Date Order"
                                rules={[{ required: true, message: 'Please enter the order date!' }]}
                            >
                                <Input type="date" />
                            </Form.Item>
                            <Form.Item
                                name="time_order"
                                label="Time Order"
                                rules={[{ required: true, message: 'Please enter the order time!' }]}
                            >
                                <Input type="time" />
                            </Form.Item>
                            <Form.Item
                                name="description"
                                label="Description"
                            >
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item
                                name="status"
                                label="Status"
                                rules={[{ required: true, message: 'Please enter the status!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="w-full mt-1">
                                    Save
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </section>
        </>
    );
};

export default DetailOrderTable;
