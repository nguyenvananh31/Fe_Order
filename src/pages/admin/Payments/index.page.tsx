/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloseCircleFilled, DeleteOutlined, EditOutlined, LoadingOutlined, PlusOutlined, QuestionCircleOutlined, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Col, Form, Input, Modal, notification, Popconfirm, Row, Select, Table, Tooltip } from 'antd';
import 'antd/dist/reset.css';
import type { ColumnsType } from 'antd/es/table';
import { AutoCompleteProps, TableProps } from 'antd/lib';
import React, { useCallback, useEffect, useState } from 'react';
import { PAGINATE_DEFAULT } from '../../../constants/enum';
import useDebounce from '../../../hooks/useDeBounce';
import ApiUtils from '../../../utils/api/api.utils';

const { Option } = Select;


interface ISate {
    loadingSubmit: boolean;
    loading: boolean;
    data: PaymentMethod[];
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

interface PaymentMethod {
    key: string;
    name: string;
    status: number;
}

const ListPayment: React.FC = () => {

    const [state, setState] = useState<ISate>(initState);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState<null | any>(null);
    const [form] = Form.useForm();
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
  
            if (state.filterOrderBy && state.filterSort) {
                conds.sort_by = state.filterSort;
                conds.orderby = state.filterOrderBy;
            }

            const res: any = await ApiUtils.fetch('/api/admin/payments', conds);

            if (state.search && !state.enterSearch) {
                setOptions(res.data.map((i: any) => ({ value: `${i.id}`, label: i.name, data: i })))
                setState(prev => ({ ...prev, loading: false, search: false, loadingSearch: false }));
            } else {
                setState(prev => ({ ...prev, data: res.data || [], loading: false, total: res.meta.total, search: false, loadingSearch: false, enterSearch: false }));
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setState((prev) => ({ ...prev, data: [], loading: false, total: 0 }));
        }
    };

    const handleChangeStatus = async (id: number, status: number) => {
        try {
            setState(prev => ({ ...prev, loading: true }));
            await ApiUtils.put('/api/admin/payments/' + id, { status });
            setState(prev => ({ ...prev, loading: false, refresh: !prev.refresh }));
        } catch (error) {
            console.log(error);
            setState(prev => ({ ...prev, loading: false }));
        }
    }

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
            ApiUtils.put(`/api/admin/payments/${editingRecord.id}`, values)
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

    const handleTableChange: TableProps<any>['onChange'] = (_: any, __: any, sorter: any) => {
        if (sorter) {
            setState(prev => ({ ...prev, filterOrderBy: sorter.order ? sorter.order.slice(0, sorter.order.length-3) : undefined, filterSort: sorter.field, refresh: !prev.refresh, pageIndex: 1 }))
        }
    }

    const columns: ColumnsType<PaymentMethod> = [
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
            title: 'Tên phương thức thanh toán',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            showSorterTooltip: {title: 'Sắp xếp theo tên'},
            render: (_: any, item: any) => {
                return (
                    <div onClick={() => handleEdit(item)} className='text-purple font-semibold cursor-pointer'>
                        {item.name}
                    </div>
                )
            }
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
                        title={`${!status ? 'Hiển thị' : 'Ẩn'} phương thức`}
                        description={`Bạn có muốn ${!status ? 'hiển thị' : 'ẩn'} phương thức này?`}
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
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa phương thức thanh toán này?"
                        onConfirm={() => handleDelete(record.id)}
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
                                    <span className="text-ghost text-[14px]">Tìm phương thức</span>
                                </div>
                            }
                            allowClear={{ clearIcon: state.loadingSearch ? <LoadingOutlined /> : <CloseCircleFilled /> }}
                            onSelect={(_, a) => handleEdit(a.data)}
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
                </Row>

                <div className="mx-auto mt-6">
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
                    />

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
