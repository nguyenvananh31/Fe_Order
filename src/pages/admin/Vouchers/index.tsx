/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloseCircleFilled, EditOutlined, LoadingOutlined, PlusOutlined, SearchOutlined, UndoOutlined, ZoomInOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Col, DatePicker, Form, Image, Input, InputNumber, Modal, Row, Select, Space, Table, Upload, UploadFile } from 'antd';
import 'antd/dist/reset.css';
import type { ColumnsType } from 'antd/es/table';
import { RcFile } from 'antd/es/upload';
import { AutoCompleteProps, TableProps } from 'antd/lib';
import dayjs from 'dayjs';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { DateFomat, fallBackImg, FileRule, getImageUrl } from '../../../constants/common';
import { PAGINATE_DEFAULT } from '../../../constants/enum';
import useDebounce from '../../../hooks/useDeBounce';
import useToast from '../../../hooks/useToast';
import ApiUtils from '../../../utils/api/api.utils';
import { convertPriceVND } from '../../../utils/common';

const { Option } = Select;

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

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
    customers: any[];
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
    enterSearch: false,
    customers: [],
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
    const [thumbnail, setThumbnail] = useState<UploadFile[]>([]);
    const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
    const debouncedSearch = useDebounce(state.textSearch?.trim() || '');
    const [previewImage, setPreviewImage] = useState('');
    const toast = useToast();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [type, setType] = useState<number | undefined>();

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

            const res: any = await ApiUtils.fetch('/api/admin/vouchers', conds);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await ApiUtils.fetch<any, any>('/api/admin/customers', { per_page: 100 });
                const customers = res.data.map((i: any) => ({ label: i.email, value: i.id }));
                setState(prev => ({ ...prev, customers }));
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleAdd = () => {
        setEditingRecord(null);
        form.resetFields();
        setThumbnail([]);
        setModalVisible(true);
        setType(undefined);
    };

    const handleEdit = (record: any) => {
        setEditingRecord(record);
        if (!+record.value) {
            setType(1);
        } else {
            setType(2);
        }
        form.resetFields();
        form.setFieldsValue({
            name: record.name,
            value: +record?.value,
            discount_percentage: +record?.discount_percentage,
            max_discount_value: +record?.max_discount_value,
            quantity: record.quantity,
            customer_id: record?.customer_id,
            expiration_date: [dayjs(record.start_date), dayjs(record.end_date)],
            status: record.status,
            image: [{
                uid: '-1',
                name: 'Ảnh 1',
                status: 'done',
                url: record?.image ? getImageUrl(record.image) : fallBackImg,
            }]
        });
        setModalVisible(true);
    };

    //Handle upload

    const handleBeforeUpload = async (file: any) => {
        if (!FileRule.accepts.includes(file.type)) {
            toast.showError('Chỉ được tải ảnh dạng JPG/PNG/JPEG!');
            return Upload.LIST_IGNORE;
        }
        setThumbnail([file]);

        return false;
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

    const handleSubmit = async (values: any) => {
        const formData = new FormData();
        formData.append('name', values.name);
        if (values?.customer_id) {
            formData.append('customer_id', values.customer_id);
        }
        formData.append('discount_percentage', values?.discount_percentage || 0);
        formData.append('max_discount_value', values?.max_discount_value || 0);
        formData.append('value', values?.value || 0);
        formData.append('start_date', moment(new Date(values.expiration_date[0])).format('YYYY/MM/DD'));
        formData.append('end_date', moment(new Date(values.expiration_date[1])).format('YYYY/MM/DD'));
        formData.append('status', values.status.toString());
        formData.append('quantity', values.quantity.toString());
        if (values.image[0].originFileObj) {
            formData.append('image', values.image[0].originFileObj as any);
        }
        if (editingRecord) {
            ApiUtils.postForm(`/api/admin/vouchers/${editingRecord?.id}?_method=PUT`, formData)
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
                    toast.showError(error);
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
            // showSorterTooltip: { title: 'Sắp xếp theo số điểm' },
            render: (_: any, item: any) => (
                <>{!!+item.value ? item.value : `${+item.discount_percentage || 0}% (Tối đa ${convertPriceVND(+item.max_discount_value || 0)})`}</>
            )
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
            align: 'center',
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

    const handlePreview = async (file: any) => {

        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as any);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange = useCallback((type: number) => (e: any) => {
        if (!e?.toString()) {
            setType(undefined);
        } else {
            setType(type);
        }
        form.setFields(
            form
                .getFieldsError()
                .map(({ name }) => ({
                    name,
                    errors: [], // Xóa lỗi để ẩn validate
                }))
        );
    }, []);

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

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
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="name"
                                    label="Tên voucher"
                                    rules={[{ required: true, message: 'Tên voucher là bắt buộc!' }]}
                                >
                                    <Input placeholder="Tên voucher" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Tài khoản áp dụng voucher"
                                    name={'customer_id'}
                                // rules={[{ required: true, message: 'Kích thước sản phẩm không được bỏ trống!' }]}
                                >
                                    <Select
                                        allowClear
                                        loading={state.loading}
                                        showSearch
                                        placeholder="Chọn khách hàng"
                                        style={{ width: '100%' }}
                                        optionFilterProp="label"
                                        options={state.customers}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name={'discount_percentage'}
                                    label={'Phần trăm giảm'}
                                    rules={type !== 2 ? [{ required: true, message: 'Phần trăm giảm là bắt buộc!' },
                                    {
                                        validator: (_, value) => {
                                            if (value < 1) {
                                                return Promise.reject('Phần trăm giảm phải lớn hơn 0!');
                                            }
                                            return Promise.resolve();
                                        }
                                    }
                                    ] : undefined}
                                >
                                    <InputNumber
                                        onChange={handleChange(1)}
                                        disabled={type === 2}
                                        className='w-full'
                                        addonAfter={'%'}
                                        type='number'
                                        placeholder="Phần trăm giảm"
                                        min={0}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name={'max_discount_value'}
                                    label={'Giảm tối đa'}
                                    rules={type !== 2 ? [{ required: true, message: 'Giảm tối đa là bắt buộc!' },
                                    {
                                        validator: (_, value) => {
                                            if (value < 1) {
                                                return Promise.reject('Giảm tối đa phải lớn hơn 0!');
                                            }
                                            return Promise.resolve();
                                        }
                                    }
                                    ] : undefined}
                                >
                                    <InputNumber
                                        onChange={handleChange(1)}
                                        disabled={type === 2}
                                        className='w-full'
                                        addonAfter={'đ'}
                                        type='number'
                                        placeholder="Giảm tối đa"
                                        min={0}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="value"
                                    label="Điểm"
                                    rules={type !== 1 ? [{ required: true, message: 'Điểm là bắt buộc!' },
                                    {
                                        validator: (_, value) => {
                                            if (value < 1) {
                                                return Promise.reject('Số điểm phải lớn hơn 0!');
                                            }
                                            return Promise.resolve();
                                        }
                                    }
                                    ] : undefined}
                                >
                                    <InputNumber
                                        disabled={type === 1}
                                        onChange={handleChange(2)}
                                        placeholder="Nhập số điểm"
                                        type="number"
                                        className='w-full'
                                        min={0}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="expiration_date"
                                    label="Ngày bắt đầu"
                                    rules={[{ required: true, message: 'Ngày bắt đầu và kết thúc là bắt buộc!' }]}
                                >
                                    <DatePicker.RangePicker
                                        format={DateFomat} style={{ width: '100%' }}
                                        minDate={dayjs()}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="status"
                                    label="Trạng thái"
                                    rules={[{ required: true, message: 'Trạng thái là bắt buộc!' }]}
                                >
                                    <Select placeholder="Chọn trạng thái">
                                        <Option value={1}>Hoạt động</Option>
                                        <Option value={0}>Khoá</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Số lượng"
                                    name={'quantity'}
                                    rules={[
                                        { required: true, message: 'Số lượng là bắt buộc!' },
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
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name={'image'}
                                    label="Ảnh voucher"
                                    valuePropName="fileList"
                                    getValueFromEvent={normFile}
                                >
                                    <Upload
                                        listType="picture-card"
                                        fileList={thumbnail}
                                        onPreview={handlePreview}
                                        beforeUpload={(file) => handleBeforeUpload(file)}
                                        onChange={({ fileList }) => { if (fileList.length == 0) setThumbnail([]) }}
                                        maxCount={1}
                                    >
                                        {thumbnail.length > 0 ? null : uploadButton}
                                    </Upload>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="w-full mt-4">
                                Lưu
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </section>
            {/* Show ảnh */}
            {!!previewImage && (
                <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
        </>
    );
};

export default ListVoucher;
