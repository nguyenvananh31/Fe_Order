/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Modal, Form, Input, Select, Popconfirm, Upload, notification, Row, Col, AutoComplete, Tooltip, Image, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined, UploadOutlined, SearchOutlined, LoadingOutlined, CloseCircleFilled, UndoOutlined, PlusOutlined, QuestionCircleOutlined, ZoomInOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import ApiUtils from '../../../utils/api/api.utils';
import { PAGINATE_DEFAULT } from '../../../constants/enum';
import { AutoCompleteProps } from 'antd/lib';
import useDebounce from '../../../hooks/useDeBounce';
import { fallBackImg, getImageUrl } from '../../../constants/common';

const { Option } = Select;


interface ISate {
    loadingSubmit: boolean;
    loading: boolean;
    data: Voucher[];
    pageSize: number;
    pageIndex: number;
    total: number;
    showModal: boolean;
    selectedItemId?: number;
    selectedStatus?: string;
    refresh: boolean;
    search: boolean;
    loadingSearch: boolean;
    textSearch?: string;
    filtertatus?: boolean;
    filterDate?: string[];
    enterSearch: boolean;
}

const initState: ISate = {
    loadingSubmit: false,
    loading: true,
    data: [],
    pageSize: PAGINATE_DEFAULT.LIMIT,
    pageIndex: 1,
    total: 0,
    showModal: false,
    refresh: false,
    search: false,
    loadingSearch: false,
    textSearch: '',
    filtertatus: undefined,
    filterDate: undefined,
    enterSearch: false
}

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

    const [state, setState] = useState<ISate>(initState);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState<null | any>(null);
    const [form] = Form.useForm();
    const [imageFile, setImageFile] = useState<any>(null);
    const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
    const debouncedSearch = useDebounce(state.textSearch?.trim() || '');

    useEffect(() => {
        fetchData();
    }, [state.refresh, debouncedSearch]);

    const fetchData = async () => {
        try {
            if (state.search) {
                setState(prev => ({ ...prev, loadingSearch: true }));
            } else {
                setState(prev => ({ ...prev, loading: true }));
            }

            const conds: any = { page: state.pageIndex, per_page: state.pageSize };

            if (state.textSearch) {
                conds.name = debouncedSearch;
            }
            const res: any = await ApiUtils.fetch('/api/admin/vouchers');

            if (state.search && !state.enterSearch) {
                setOptions(res.data.map((i: any) => ({ value: `${i.id}`, label: i.name, data: i })))
                setState(prev => ({ ...prev, loading: false, search: false, loadingSearch: false }));
            } else {
                setState(prev => ({ ...prev, data: res.data || [], loading: false, total: res.meta.total, search: false, loadingSearch: false, enterSearch: false }));
            }
        } catch (error) {
            console.error("Error fetching vouchers:", error);
            setState((prev) => ({ ...prev, data: [], loading: false, total: 0 }));
        }
    };

    const handleAdd = () => {
        setEditingRecord(null);
        form.resetFields();
        setImageFile(null);
        setModalVisible(true);
    };

    const handleEdit = (record: any) => {
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
    
    const handleChangeStatus = async (id: number, status: number) => {
        try {
            setState(prev => ({ ...prev, loading: true }));
            await ApiUtils.put('/api/admin/vouchers/' + id, { status });
            setState(prev => ({ ...prev, loading: false, refresh: !prev.refresh }));
        } catch (error) {
            console.log(error);
            setState(prev => ({ ...prev, loading: false }));
        }
    }

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
            ApiUtils.postForm('/api/admin/vouchers', formData)
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
            dataIndex: 'stt',
            width: 100,
            align: 'center',
            fixed: 'left',
            render: (_: any, __: any, index: number) => {
                return (
                    <span>
                        {Number(state.pageIndex) > 1 ? (Number(state.pageIndex) - 1) * state.pageSize + (index + 1) : index + 1}
                    </span>
                );
            },
        },
        {
            title: 'Voucher Name',
            dataIndex: 'name',
            key: 'name',
            render: (_: any, item: any) => {
                return (
                    <div onClick={() => handleEdit(item)} className='text-purple font-semibold cursor-pointer'>
                        {item.name}
                    </div>
                )
            }
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
                <Image
                style={{ objectFit: 'cover', width: '120px', height: '80px', borderRadius: "5px" }}
                src={image ? getImageUrl(image) : fallBackImg}
                preview={{
                    mask: (
                        <Space direction="vertical" align="center">
                            <ZoomInOutlined />
                        </Space>
                    ),
                }}
            />
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            align: 'center',
            width: '15%',
            render: (_: any, { id, status }: any) => (
                <Tooltip title="Thay đổi trạng thái">
                    <Popconfirm
                        placement='topRight'
                        title={`${!status ? 'Hiển thị' : 'Ẩn'} ưu đãi`}
                        description={`Bạn có muốn ${!status ? 'hiển thị' : 'ẩn'} ưu đãi này?`}
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        okText="Có"
                        cancelText="Không"
                        onConfirm={() => handleChangeStatus(id, status)}
                    >
                        <Button danger={!status} className={`${!!status && 'border-green-600 text-green-600'} min-w-[80px]`}>
                            {!!status ? "Hiển thị" : 'Ẩn'}
                        </Button>
                    </Popconfirm>
                </Tooltip>
            )
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_, record: any) => (
                <span>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                        style={{ marginRight: 8 }}
                        type="default"
                    />
                    {/* <Popconfirm
                        title="Are you sure to delete this voucher?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<DeleteOutlined />} danger />
                    </Popconfirm> */}
                </span>
            ),
        },
    ];


    // Chuyển trang và phân trang
    const handlePageChange = (page: any, pageSize: any) => {
        setState(prev => ({ ...prev, pageIndex: page, pageSize, refresh: !state.refresh }));
    };

    //Search
    /** Event KeyEnter */
    useEffect(() => {

        const keyDownListener = (event: KeyboardEvent) => {
            if (event.code === 'Enter' || event.code === 'NumpadEnter') {
                setState((prev) => ({ ...prev, pageIndex: 1, search: false, enterSearch: true, refresh: !prev.refresh }));
            }
        };
        document.addEventListener('keydown', keyDownListener);
        return () => {
            document.removeEventListener('keydown', keyDownListener);
        };
    }, []);

    //Search text
    const handleChangeTextSearch = (value: string) => {
        setOptions([]);
        setState(prev => ({ ...prev, textSearch: value, search: true }));
    }

    //Handle click btn search
    const handleSearchBtn = useCallback(() => {
        setState((prev) => ({ ...prev, pageIndex: 1, search: false, enterSearch: true, refresh: !prev.refresh }));
    }, []);

    // làm mới data
    const refreshPage = useCallback(() => {
        setState((prev) => ({ ...initState, refresh: !prev.refresh }));
    }, []);

    return (
        <>
            <section className="py-2 bg-white sm:py-8 lg:py-6 rounded-lg shadow-md">
                <Row gutter={[16, 16]} className="px-6 py-6" align={"middle"} justify={"space-between"} >
                    <Col xs={24} sm={24} md={24} lg={15} className="flex gap-2 max-sm:flex-col">
                        <AutoComplete
                            size="large"
                            options={options}
                            className="max-sm:w-full md:w-[400px] flex-1"
                            onSearch={handleChangeTextSearch}
                            placeholder={
                                <div className="flex items-center gap-1 cursor-pointer h-max">
                                    <SearchOutlined className="text-lg text-ghost" />
                                    <span className="text-ghost text-[14px]">Tìm ưu đãi</span>
                                </div>
                            }
                            allowClear={{ clearIcon: state.loadingSearch ? <LoadingOutlined /> : <CloseCircleFilled /> }}
                            onSelect={(_, i) => handleEdit(i)}
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
                            Thêm ưu đãi
                        </Button>
                    </Col>
                </Row>

                <div className="mt-6">
                    <Table
                        loading={state.loading}
                        columns={columns}
                        dataSource={state.data}
                        rowKey="id"
                        pagination={{
                            pageSize: state.pageSize,
                            showSizeChanger: true,
                            pageSizeOptions: ['5', '10', '20', '50'], // Các tùy chọn số lượng bản ghi
                            total: state.total,
                            current: state.pageIndex,
                            style: {
                                paddingRight: "24px",
                            },
                            onChange(page, pageSize) {
                                handlePageChange(page, pageSize);
                            },
                        }}
                    />
                </div>

                <Modal
                    open={modalVisible}
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
