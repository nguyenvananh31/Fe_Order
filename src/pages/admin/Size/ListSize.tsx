/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Popconfirm, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import ApiUtils from '../../../utils/api/api.utils';

const { Option } = Select;

interface Size {
    key: string;
    name: string;
    status: number;
}

const ListSize: React.FC = () => {
    const [data, setData] = useState<Size[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState<null | Size>(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await ApiUtils.fetch('/api/admin/sizes');
            const transformedData = res.data.map((size: any, index: number) => ({
                key: size.id,
                name: size.name,
                status: size.status,
                index: index + 1, // Số thứ tự (STT)
            }));
            setData(transformedData);
        } catch (error) {
            console.error('Error fetching sizes:', error);
        }
    };

    const handleAdd = () => {
        setEditingRecord(null);
        form.resetFields();
        setModalVisible(true);
    };

    const handleEdit = (record: Size) => {
        setEditingRecord(record);
        form.setFieldsValue(record);
        setModalVisible(true);
    };

    const handleDelete = (key: string) => {
        ApiUtils.remove(`/api/admin/sizes/${key}`)
            .then(() => {
                fetchData();
                notification.success({ message: 'Deleted size successfully!' });
            })
            .catch((error) => {
                notification.error({ message: 'Error deleting size!' });
                console.error('Error deleting size:', error);
            });
    };

    const handleSubmit = async (values: { name: string; status: number }) => {
        if (editingRecord) {
            ApiUtils.put(`/api/admin/sizes/${editingRecord.key}`, values)
                .then(() => {
                    fetchData();
                    notification.success({ message: 'Size updated successfully!' });
                    setModalVisible(false);
                })
                .catch((error) => {
                    notification.error({ message: 'Error updating size!' });
                    console.error('Error updating size:', error);
                });
        } else {
            ApiUtils.post('/api/admin/sizes', values)
                .then(() => {
                    fetchData();
                    notification.success({ message: 'Size added successfully!' });
                    setModalVisible(false);
                })
                .catch((error) => {
                    notification.error({ message: 'Error adding size!' });
                    console.error('Error adding size:', error);
                });
        }
    };

    const columns: ColumnsType<Size> = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Size Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: number) => (
                <span className={`p-2 text-white rounded-md ${status === 1 ? 'bg-green-500' : 'bg-red-500'}`}>
                    {status === 1 ? 'Active' : 'Inactive'}
                </span>
            ),
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_, record: Size) => (
                <span>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                        style={{ marginRight: 8 }}
                        type="default"
                    />
                    <Popconfirm
                        title="Are you sure to delete this size?"
                        onConfirm={() => handleDelete(record.key)}
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
                <Button
                    type="primary"
                    onClick={handleAdd}
                    className="inline-flex items-center justify-center px-4 py-2 mt-4 font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md lg:mt-6 hover:bg-blue-700 focus:bg-blue-700"
                >
                    Add Size
                </Button>

                <div className="mt-6">
                    <Table columns={columns} dataSource={data} rowKey="key" pagination={{ pageSize: 5 }} />
                </div>

                <Modal
                    visible={modalVisible}
                    title={editingRecord ? 'Edit Size' : 'Add Size'}
                    onCancel={() => setModalVisible(false)}
                    footer={null}
                    destroyOnClose
                >
                    <Form form={form} onFinish={handleSubmit} layout="vertical">
                        <Form.Item
                            name="name"
                            label="Size Name"
                            rules={[{ required: true, message: 'Please enter size name!' }]}
                        >
                            <Input placeholder="Enter size name" />
                        </Form.Item>
                        <Form.Item
                            name="status"
                            label="Status"
                            rules={[{ required: true, message: 'Please select status!' }]}
                        >
                            <Select placeholder="Select status">
                                <Option value={1}>Active</Option>
                                <Option value={0}>Inactive</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="w-full">
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </section>
        </>
    );
};

export default ListSize;
