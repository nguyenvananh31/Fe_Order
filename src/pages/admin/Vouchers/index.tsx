/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloseCircleFilled, EditOutlined, LoadingOutlined, PlusOutlined, SearchOutlined, UndoOutlined, UploadOutlined, ZoomInOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Col, DatePicker, Form, Image, Input, Modal, Row, Select, Space, Table, Upload } from 'antd';
import 'antd/dist/reset.css';
import type { ColumnsType } from 'antd/es/table';
import { AutoCompleteProps, TableProps } from 'antd/lib';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { DateFomat, fallBackImg, getImageUrl } from '../../../constants/common';
import { PAGINATE_DEFAULT } from '../../../constants/enum';
import useDebounce from '../../../hooks/useDeBounce';
import useToast from '../../../hooks/useToast';
import ApiUtils from '../../../utils/api/api.utils';

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
    filterSort?: string;
    filterOrderBy?: string;
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
    end_date: string;
    start_date: string;
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
    const toast = useToast();

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

            if (state.filterOrderBy && state.filterSort) {
                conds.sort_by = state.filterSort;
                conds.orderby = state.filterOrderBy;
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


    const handleUpload = (info: any) => {
        if (info.file.status === 'done') {
            setImageFile(info.file.originFileObj);
            // toast.showSuccess('Image uploaded successfully!');
        }
    };

    // const handleChangeStatus = async (id: number, status: number) => {
    //     try {
    //         setState(prev => ({ ...prev, loading: true }));
    //         await ApiUtils.put('/api/admin/vouchers/' + id, { status });
    //         setState(prev => ({ ...prev, loading: false, refresh: !prev.refresh }));
    //     } catch (error) {
    //         console.log(error);
    //         setState(prev => ({ ...prev, loading: false }));
    //     }
    // }

    const handleSubmit = async (values: { name: string; value: string; expiration_date: any[]; status: number, quantity: number }) => {
        console.log('values: ', values);
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('value', values.value);
        formData.append('start_date', new Date(values.expiration_date[0]).toString());
        formData.append('end_date', new Date(values.expiration_date[1]).toString());
        formData.append('status', values.status.toString());
        formData.append('quantity', values.quantity.toString());
        if (imageFile) {
            formData.append('image', imageFile);
        }

        if (editingRecord) {
            ApiUtils.put(`/api/admin/vouchers/${editingRecord.key}`, formData)
                .then(() => {
                    fetchData();
                    toast.showSuccess('Cập nhật voucher thành công!');
                    setModalVisible(false);
                })
                .catch(error => {
                    toast.showError('Cập nhật voucher thất bại!');
                    console.error('Error updating voucher:', error);
                });
        } else {
            ApiUtils.postForm('/api/admin/vouchers', formData)
                .then(() => {
                    fetchData();
                    toast.showSuccess('Tạo voucher thành công!');
                    setModalVisible(false);
                })
                .catch(error => {
                    toast.showError('Tạo voucher thất bại!');
                    console.error('Error adding voucher:', error);
                });
        }
    };

    const handleTableChange: TableProps<any>['onChange'] = (_: any, __: any, sorter: any) => {
        if (sorter) {
            setState(prev => {
                let rePage = false;
                if (
                    prev.filterOrderBy !== sorter?.order?.slice(0, sorter.order.length - 3) ||
                    prev.filterSort !== sorter.field
                ) {
                    rePage = true;
                }
                return {
                    ...prev, filterOrderBy: sorter.order ? sorter.order.slice(0, sorter.order.length - 3) : undefined,
                    filterSort: sorter.field, refresh: !state.refresh, pageIndex: rePage ? 1 : prev.pageIndex
                }
            })
        }
    }

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
            title: 'Tên ưu đãi',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            showSorterTooltip: { title: 'Sắp xếp theo tên' },
            render: (_: any, item: any) => {
                return (
                    <div onClick={() => handleEdit(item)} className='text-purple font-semibold cursor-pointer'>
                        {item.name}
                    </div>
                )
            }
        },
        {
            title: 'Số điểm',
            dataIndex: 'value',
            key: 'value',
            sorter: true,
            showSorterTooltip: { title: 'Sắp xếp theo số điểm' },
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'start_date',
            key: 'start_date',
            render: (i: string) => <>{moment(i).format(DateFomat)}</>
        },
        {
            title: 'Ngày hết hạn',
            dataIndex: 'end_date',
            key: 'end_date',
            render: (i: string) => <>{moment(i).format(DateFomat)}</>
        },
        {
            title: 'Hình ảnh',
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
        // {
        //     title: 'Trạng thái',
        //     dataIndex: 'status',
        //     align: 'center',
        //     width: '15%',
        //     render: (_: any, { id, status }: any) => (
        //         <Tooltip title="Thay đổi trạng thái">
        //             <Popconfirm
        //                 placement='topRight'
        //                 title={`${!status ? 'Hiển thị' : 'Ẩn'} ưu đãi`}
        //                 description={`Bạn có muốn ${!status ? 'hiển thị' : 'ẩn'} ưu đãi này?`}
        //                 icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
        //                 okText="Có"
        //                 cancelText="Không"
        //                 onConfirm={() => handleChangeStatus(id, status)}
        //             >
        //                 <Button danger={!status} className={`${!!status && 'border-green-600 text-green-600'} min-w-[80px]`}>
        //                     {!!status ? "Hiển thị" : 'Ẩn'}
        //                 </Button>
        //             </Popconfirm>
        //         </Tooltip>
        //     )
        // },
        {
            title: 'Hành động',
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
        setState(prev => ({ ...prev, pageIndex: page, pageSize, refresh: !prev.refresh }));
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
                        onChange={handleTableChange}
                        scroll={{ x: 'max-content' }}
                    />
                </div>

                <Modal
                    open={modalVisible}
                    title={editingRecord ? 'Cập nhật voucher' : 'Tạo voucher'}
                    onCancel={() => setModalVisible(false)}
                    footer={null}
                    destroyOnClose
                >
                    <Form form={form} onFinish={handleSubmit} layout="vertical">
                        <Form.Item
                            name="name"
                            label="Tên voucher"
                            rules={[{ required: true, message: 'Tên voucher là bắt buộc!' }]}
                        >
                            <Input placeholder="Tên voucher" />
                        </Form.Item>
                        <Form.Item
                            name="value"
                            label="Điểm"
                            rules={[{ required: true, message: 'Điểm là bắt buộc!' },
                            {
                                validator: (_, value) => {
                                    if (value < 1) {
                                        return Promise.reject('Số điểm phải lớn hơn 0!');
                                    }
                                    return Promise.resolve();
                                }
                            }
                            ]}
                        >
                            <Input placeholder="Nhập số điểm" type="number" />
                        </Form.Item>
                        <Form.Item
                            name="expiration_date"
                            label="Ngày bắt đầu"
                            rules={[{ required: true, message: 'Ngày bắt đầu và kết thúc là bắt buộc!' }]}
                        >
                            <DatePicker.RangePicker
                                format={DateFomat} style={{ width: '100%' }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="status"
                            label="Status"
                            rules={[{ required: true, message: 'Please select status!' }]}
                        >
                            <Select placeholder="Select status">
                                <Option value={1}>Hoạt động</Option>
                                <Option value={0}>Khoá</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Tài khoản áp dụng voucher"
                            name={'customer_id'}
                        // rules={[{ required: true, message: 'Kích thước sản phẩm không được bỏ trống!' }]}
                        >
                            <Select
                                loading={state.loading}
                                showSearch
                                placeholder="Chọn khách hàng"
                                style={{ width: '100%' }}
                                optionFilterProp="label"
                                options={[]}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Số lượng"
                            name={'quantity'}
                            rules={[
                                { required: true, message: 'Số lượng sản phẩm không được bỏ trống!' },
                                {
                                    validator: (_, value) => {
                                        if (value < 1) {
                                            return Promise.reject('Số lượng phải lớn hơn 0!');
                                        }
                                        return Promise.resolve();
                                    }
                                }
                            ]}
                        >
                            <Input placeholder="Nhập số lượng" type="number" />
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
                            <Button type="primary" htmlType="submit" className="w-full mt-4">
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
