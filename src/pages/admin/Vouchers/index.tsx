/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Popconfirm, Upload, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import ApiUtils from '../../../utils/api/api.utils';

const { Option } = Select;

interface Voucher {
    key: string;
    name: string;
    value: string;
    image: string;
    expiration_date: string;
    status: number;
    customer_id: string | null;
}

const ListVoucher: React.FC = () => {
    const [data, setData] = useState<Voucher[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState<null | Voucher>(null);
    const [form] = Form.useForm();
    const [imageFile, setImageFile] = useState<any>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res: any = await ApiUtils.fetch('/api/admin/vouchers');
            const transformedData = res.data.map((voucher: any, index: number) => ({
                key: voucher.id,
                name: voucher.name,
                value: Number(voucher.value),
                image: voucher.image,
                expiration_date: voucher.expiration_date,
                status: voucher.status,
                customer_id: voucher.customer_id,
                index: index + 1 // Add row number (STT)
            }));
            console.log(transformedData);
            
            setData(transformedData);
        } catch (error) {
            console.error("Error fetching vouchers:", error);
        }
    };

    const handleAdd = () => {
        setEditingRecord(null);
        form.resetFields();
        setImageFile(null);
        setModalVisible(true);
    };

    const handleEdit = (record: Voucher) => {
        setEditingRecord(record);
        form.setFieldsValue(record);
        setModalVisible(true);
    };

    const handleDelete = (key: string) => {
        ApiUtils.remove(`/api/admin/vouchers/${key}`)
            .then(() => {
                fetchData(); 
                notification.success({ message: 'Deleted voucher successfully!' });
            })
            .catch(error => {
                notification.error({ message: 'Error deleting voucher!' });
                console.error('Error deleting voucher:', error);
            });
    };

    const handleUpload = (info: any) => {
        if (info.file.status === 'done') {
            setImageFile(info.file.originFileObj);
            notification.success({ message: 'Image uploaded successfully!' });
        }
    };

    const handleSubmit = async (values: { name: string; value: string; expiration_date: string; status: number }) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('value', values.value);
        formData.append('expiration_date', values.expiration_date);
        formData.append('status', values.status.toString());
        if (imageFile) {
            formData.append('image', imageFile);
        }

        if (editingRecord) {
            ApiUtils.put(`/api/admin/vouchers/${editingRecord.key}`, formData)
                .then(() => {
                    fetchData();
                    notification.success({ message: 'Voucher updated successfully!' });
                    setModalVisible(false);
                })
                .catch(error => {
                    notification.error({ message: 'Error updating voucher!' });
                    console.error('Error updating voucher:', error);
                });
        } else {
            ApiUtils.post('/api/admin/vouchers', formData)
                .then(() => {
                    fetchData();
                    notification.success({ message: 'Voucher added successfully!' });
                    setModalVisible(false);
                })
                .catch(error => {
                    notification.error({ message: 'Error adding voucher!' });
                    console.error('Error adding voucher:', error);
                });
        }
    };

    const columns: ColumnsType<Voucher> = [
        {
            title: 'STT',
            dataIndex: 'index', 
            key: 'index',
        },
        {
            title: 'Voucher Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
        },
        {
            title: 'Expiration Date',
            dataIndex: 'expiration_date',
            key: 'expiration_date',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image: string) => (
                <img src={`/uploads/${image}`} alt="voucher" style={{ width: '80px', height: '80px' }} />
            ),
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
            render: (_, record: Voucher) => (
                <span>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                        style={{ marginRight: 8 }}
                        type="default"
                    />
                    <Popconfirm
                        title="Are you sure to delete this voucher?"
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
                    Add Voucher
                </Button>

                <div className="mt-6">
                    <Table columns={columns} dataSource={data} rowKey="key" pagination={{ pageSize: 5 }} />
                </div>

                <Modal
                    visible={modalVisible}
                    title={editingRecord ? 'Edit Voucher' : 'Add Voucher'}
                    onCancel={() => setModalVisible(false)}
                    footer={null}
                    destroyOnClose
                >
                    <Form form={form} onFinish={handleSubmit} layout="vertical">
                        <Form.Item
                            name="name"
                            label="Voucher Name"
                            rules={[{ required: true, message: 'Please enter voucher name!' }]}
                        >
                            <Input placeholder="Enter voucher name" />
                        </Form.Item>
                        <Form.Item
                            name="value"
                            label="Value"
                            rules={[{ required: true, message: 'Please enter value!' }]}
                        >
                            <Input placeholder="Enter voucher value" />
                        </Form.Item>
                        <Form.Item
                            name="expiration_date"
                            label="Expiration Date"
                            rules={[{ required: true, message: 'Please enter expiration date!' }]}
                        >
                            <Input type="date" />
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
                        <Form.Item
                            label="Upload Image"
                            valuePropName="fileList"
                        >
                            <Upload
                                name="image"
                                listType="picture"
                                maxCount={1}
                                beforeUpload={() => false}
                                onChange={handleUpload}
                            >
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
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

export default ListVoucher;
