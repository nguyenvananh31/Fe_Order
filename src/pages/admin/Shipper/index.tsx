import { CheckCircleOutlined, EyeOutlined, IssuesCloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Flex, Form, GetProp, Image, Modal, Popconfirm, Select, Tag, Tooltip, Upload, UploadFile, UploadProps } from "antd";
import { ColumnProps } from "antd/es/table";
import { Table } from "antd/lib";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FileRule } from "../../../constants/common";
import { PAGINATE_DEFAULT } from "../../../constants/enum";
import useToast from "../../../hooks/useToast";
import { convertPriceVND } from "../../../utils/common";
import BillModel from "../Bill/components/BillModal";
import { apigetShipper, apiGetUpdateShippingStatus } from "./utils/shipper.service";

const statusBill: any = {
    'pending': { color: 'magenta', title: 'Đang chờ' },
    'confirmed': { color: 'cyan', title: 'Đã xác nhận' },
    'preparing': { color: 'gold', title: 'Chuẩn bị' },
    'shipping': { color: 'purple', title: 'Đang giao' },
    'completed': { color: 'green', title: 'Đã hoàn thành' },
    'cancelled': { color: 'red', title: 'Đã huỷ' },
    'failed': { color: 'red', title: 'Thất bại' },
    'cancellation_requested': { color: 'yellow', title: 'Chờ xác nhận hủy' },
    'cancellation_approved': { color: 'volcano', title: 'Xác nhận hủy' },
    'cancellation_rejected': { color: 'volcano', title: 'Hủy thất bại' },
};

const statusPayment: any = {
    pending: { color: "magenta", title: "Đang chờ" },
    paid: { color: "cyan", title: "Thanh toán khi nhận hàng" },
    successful: { color: "green", title: "Đã thanh toán" },
    failed: { color: "red", title: "Thanh toán thất bại" },
    refunded: { color: "volcano", title: "Hoàn trả tiền" },
}

interface IState {
    loadingSubmit: boolean;
    loading: boolean;
    data: any[];
    pageSize: number;
    pageIndex: number;
    total: number;
    showModal: boolean;
    selectedItemId?: number;
    selectedStatus?: string;
    refresh: boolean;
    shipper?: any;
    showModalConfirm: boolean;
}

const initState: IState = {
    loadingSubmit: false,
    loading: true,
    data: [],
    pageSize: PAGINATE_DEFAULT.LIMIT,
    pageIndex: 1,
    total: 0,
    showModal: false,
    refresh: false,
    showModalConfirm: false,
}

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const ShipperPage = () => {

    const [state, setState] = useState<IState>(initState);
    const toast = useToast();
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewImage, setPreviewImage] = useState<string | undefined>('');
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const conds = {
                    per_page: state.pageSize,
                    page: state.pageIndex,
                }
                const res = await apigetShipper(conds);
                setState(prev => ({ ...prev, loading: false, data: res.data, total: res?.meta?.total }));
            } catch (error) {
                setState(prev => ({ ...prev, loading: false, total: 0, data: [] }));
                console.log(error);
            }
        }
        fetchData();
    }, [state.refresh]);

    // Chuyển trang và phân trang
    const handlePageChange = (page: any, pageSize: any) => {
        setState(prev => ({ ...prev, pageIndex: page, pageSize, refresh: !prev.refresh }));
    };

    // Dismis Modal
    const handleDismissModal = useCallback(() => {
        setState((prev) => ({
            ...prev,
            showModal: false,
            showModalConfirm: false,
            selectedItemId: undefined,
        }));
    }, []);

    // làm mới data
    const refreshPage = useCallback(() => {
        setState((prev) => ({ ...initState, refresh: !prev.refresh }));
    }, []);

    // Hiển thị model
    const handleOpenModal = useCallback((item?: any) => {
        setState(prev => ({
            ...prev,
            showModal: true,
            selectedItemId: item?.id || 0,
            shipper: item
        }))
    }, []);

    const handleOpenModalConfirm = useCallback((id: number) => () => {
        setState(prev => ({
            ...prev,
            showModalConfirm: true,
            selectedItemId: id,
        }))
    }, []);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const handleBeforeUpload = async (file: any) => {
        if (!FileRule.accepts.includes(file.type)) {
            toast.showError('Định dạng hình ảnh không hợp lệ, vui lòng chọn hình ảnh khác');
            return Upload.LIST_IGNORE;
        }

        return false;
    };

    //hanđle approve bill shipper
    const handleChangeStatus = useCallback((id: number, status: string, hasImage: boolean = false) => async () => {
        try {
            const formData = new FormData();
            if (hasImage) {
                formData.append('status', status);
                if (fileList[0]?.originFileObj) {
                    fileList.forEach((item) => formData.append('image_url', item.originFileObj as any));
                }
            }

            await apiGetUpdateShippingStatus(id, !hasImage ? { status } : formData, hasImage);
            setState(prev => ({ ...prev, refresh: !prev.refresh }));
        } catch (error: any) {
            console.log(error);
            toast.showError(error);
        }
    }, [fileList]);

    // handle submit form và cập nhật
    const handleSubmit = () => {
        form.submit();
    }

    const columns = useMemo(() => {
        const tblColumns: ColumnProps<any>[] = [
            {
                title: 'Mã',
                dataIndex: 'ma_bill',
                key: 'ma_bill',
                align: 'center',
                render: (_: any, item: any) => {
                    return <Tooltip title={item.ma_bill}>
                        <span className="line-clamp-1">
                            {item.ma_bill}
                        </span>
                    </Tooltip>
                }
            },
            {
                title: 'Tên chi nhánh',
                dataIndex: 'branch_address',
                key: 'branch_address',
                render: (_: any, item: any) => {
                    return (
                        <div className={`text-purple font-semibold`}>
                            {item.branch_address || 'Chưa có'}
                        </div>
                    )
                }
            },
            {
                title: 'Tên khách hàng',
                dataIndex: 'customer_name',
                key: 'customer_name',
                render: (_: any, item: any) => {
                    return (
                        <div className={`text-purple font-semibold`}>
                            {(item.khachhang.name || item.khachhang.email) || 'Không có'}
                        </div>
                    )
                }
            },
            {
                title: 'Đặt tại',
                dataIndex: 'order_type',
                align: 'center',
                render: (_: any, item: any) => {
                    const address = item?.address?.split(' - ').reduce((acc: any, curr: any, index: any, arr: any) => {
                        let lengthArr = arr.length - 1;
                        if (index == lengthArr || index == 0 || index == 1) {
                            return acc;
                        }
                        return acc + (acc ? '-' : '') + curr;
                    }, '')
                    return <Tooltip title={address}>
                        <span className="line-clamp-1">
                            {address}
                        </span>
                    </Tooltip >
                }
            },
            {
                title: 'Ngày đặt',
                dataIndex: 'order_date',
                align: 'center',
                render: (_: any, item: any) => {
                    return <span>
                        {item.order_date}
                    </span>
                }
            },
            {
                title: 'Tổng',
                dataIndex: 'total_amount',
                key: 'total_amount',
                align: 'center',
                render: (_: any, item: any) => {
                    return <span>
                        {convertPriceVND(+item.total_amount)}
                    </span>
                }
            },
            {
                title: 'Trạng thái',
                dataIndex: 'status',
                align: 'center',
                width: '15%',
                render: (_: any, item: any) => (
                    // <Tooltip title="Trạng thái">
                    <Tag
                        color={statusBill[item.status]?.color} className={`min-w-[80px] text-center`} >
                        {statusBill[item.status]?.title}
                    </Tag>
                    // </Tooltip>
                )
            },
            {
                title: 'Trạng thái thanh toán',
                dataIndex: 'payment_status',
                align: 'center',
                width: 'max-content',
                render: (_: any, item: any) => (
                    <Tag color={statusPayment[item.payment_status]?.color} className={`min-w-[80px] text-center`} >
                        {statusPayment[item.payment_status]?.title}
                    </Tag>
                )
            },
            {
                title: 'Hành động',
                dataIndex: 'action',
                align: 'center',
                fixed: 'right',
                render: (_: any, item: any) => (
                    <Flex>
                        <Tooltip title="Chi tiết">
                            <Button
                                onClick={() => handleOpenModal(item)}
                                className='ml-2 text-yellow-400' icon={<EyeOutlined />}></Button>
                        </Tooltip>
                        {
                            item.status == 'preparing' && (
                                <Tooltip title="Xác nhận giao hàng">
                                    <Popconfirm
                                        title="Xác nhận giao hàng"
                                        description="Bạn có xác nhận giao hàng không?"
                                        okText="Đồng ý"
                                        cancelText="Không"
                                    >
                                        <Button
                                            className='ml-2' type="primary" icon={<IssuesCloseOutlined />}></Button>
                                    </Popconfirm>
                                </Tooltip>
                            )
                        }
                        {
                            item.status == 'shipping' && (
                                <Tooltip title="Xác nhận giao hàng thành công">
                                    <Button
                                        onClick={handleOpenModalConfirm(item.id)}
                                        className='ml-2' type="primary" icon={<CheckCircleOutlined />}>
                                    </Button>
                                </Tooltip>
                            )
                        }
                    </Flex>
                )
            },
        ];
        return tblColumns;
    }, [state.pageIndex, state.pageSize]);

    return <>
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
                    title: <div className="font-bold">Quản lý giao hàng</div>,
                },
            ]}
        />
        <div className='bg-primary drop-shadow-primary rounded-primary'>
            <Table
                loading={state.loading}
                dataSource={state.data}
                columns={columns}
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
                scroll={{ x: 'max-content' }}
            />
        </div>
        {
            state.showModal &&
            <BillModel onClose={handleDismissModal} onRefresh={refreshPage} data={state.shipper} isAdmin />
        }
        {
            state.showModalConfirm &&
            <Modal
                // loading={state.loading}
                open={true}
                onCancel={handleDismissModal}
                onOk={handleSubmit}
                okText={'Xác nhận'}
                cancelText='Huỷ'
                centered
                title={'Xác nhận giao hàng'}
            >
                <Form
                    form={form}
                    onFinish={(values: any) => handleChangeStatus(state?.selectedItemId!, values.status ? 'delivered' : 'delivery_failed', values.status)}
                    // disabled={!state.isEdit}
                    layout="vertical"
                >
                    <Form.Item
                        label={(
                            <div className='font-bold'>
                                Trạng thái giao hàng
                            </div>
                        )}
                        name="status"
                        rules={[{ required: true, message: 'Trạng thái giao hàng là bắt buộc!' }]}
                    >
                        <Select defaultValue={true}>
                            <Select.Option value={true}>Giao hàng thành công</Select.Option>
                            <Select.Option value={false}>Giao hàng thất bại</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label={(
                        <div className='font-bold'>
                            Hình ảnh xác nhận
                        </div>
                    )}
                        valuePropName="fileList" getValueFromEvent={normFile}
                    >
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            accept={FileRule.accepts}
                            beforeUpload={handleBeforeUpload}
                        >
                            {fileList?.length >= 1 ? null :
                                (
                                    <button style={{ border: 0, background: 'none' }} type="button">
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </button>
                                )
                            }
                        </Upload>
                        {previewImage && (
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
                    </Form.Item>
                </Form>
            </Modal>
        }
    </>
}

export default ShipperPage;