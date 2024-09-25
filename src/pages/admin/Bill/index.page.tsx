import { EyeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Modal, Radio, Space, Tag, Tooltip } from "antd";
import Table, { ColumnProps } from "antd/es/table";
import { useMemo } from "react";
import { EOrderStatus, EOrderType } from "../../../constants/enum";
import { IBill } from "../../../interFaces/bill";
import BillModel from "./components/BillModal";
import useBill from "./utils/bill.hook";

const statusBill = {
    pending: { color: 'magenta', title: 'Đang chờ' },
    confirmed: { color: 'cyan', title: 'Đã xác nhận' },
    preparing: { color: 'gold', title: 'Chuẩn bị' },
    shipping: { color: 'purple', title: 'Đang giao' },
    completed: { color: 'green', title: 'Đã hoàn thành' },
    cancelled: { color: 'red', title: 'Đã huỷ' },
    failed: { color: 'volcano', title: 'Thất bại' }
};

export default function CatePage() {

    const { state, ...hooks } = useBill();

    const columns = useMemo(() => {
        const tblColumns: ColumnProps<IBill>[] = [
            {
                title: 'Mã',
                dataIndex: 'stt',
                align: 'center',
                render: (_: any, item: IBill) => {
                    return <span>
                        {item.ma_bill}
                    </span>
                }
            },
            {
                title: 'Tên chi nhánh',
                dataIndex: 'name',
                key: 'name',
                render: (_: any, item: IBill) => {
                    return (
                        <div className={`text-purple font-semibold`}>
                            {item.branch_address}
                        </div>
                    )
                }
            },
            {
                title: 'Đặt tại',
                dataIndex: 'order_type',
                align: 'center',
                render: (_: any, item: IBill) => {
                    return <span>
                        {item.order_type == EOrderType.In_restaurant ? 'Tại nhà hàng' : 'Online'}
                    </span>
                }
            },
            {
                title: 'Ngày đặt',
                dataIndex: 'order_date',
                align: 'center',
                render: (_: any, item: IBill) => {
                    return <span>
                        {item.order_date}
                    </span>
                }
            },
            {
                title: 'Tổng',
                dataIndex: 'total_amount',
                align: 'center',
                render: (_: any, item: IBill) => {
                    return <span>
                        {item.total_amount}
                    </span>
                }
            },
            {
                title: 'Trạng thái',
                dataIndex: 'status',
                align: 'center',
                width: '15%',
                render: (_: any, item: IBill) => (
                    <Tooltip title="Thay đổi trạng thái">
                        <Tag onClick={() => hooks.handleOpenModalStatus(item.status)} color={statusBill[item.status].color} className={`min-w-[80px] cursor-pointer`} >
                            {statusBill[item.status].title}
                        </Tag>
                    </Tooltip>
                )
            },
            {
                title: 'Hành động',
                dataIndex: 'action',
                align: 'center',
                fixed: 'right',
                render: (_: any, item: any) => (
                    <Tooltip title="Chi tiết">
                        <Button onClick={() => hooks.handleOpenModal(item)} className='ml-2' icon={<EyeOutlined />}></Button>
                    </Tooltip>
                )
            },
        ];
        return tblColumns;
    }, [state.pageIndex, state.pageSize])

    return (
        <>
            {hooks.contextHolder}
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
                        title: <h1 className="font-bold">Quản lý đơn</h1>,
                    },
                ]}
            />
            <div className='bg-primary drop-shadow-primary rounded-primary'>
                <div className='flex items-center justify-between'>
                    <h1 className='p-6 text-xl font-semibold'>Quản lý đơn</h1>
                </div>
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
                            hooks.handlePageChange(page, pageSize);
                        },
                    }}
                />
            </div>
            {
                state.showModal &&
                <BillModel showToast={hooks.showToast} onClose={hooks.handleDismissModal} onRefresh={hooks.refreshPage} itemId={state.selectedItemId} data={state.bill} />
            }
            {/* Update status */}
            <Modal
                title='Thay đổi trạng thái'
                onCancel={hooks.handleDismissModalStatus}
                open={state.showModalStatus}
                okText='Lưu'
                centered
            >
                <Radio.Group onChange={hooks.onChanegStatus} value={hooks.status}>
                    <Space direction="vertical">
                        <Radio value={EOrderStatus.Pending}>Đang chờ</Radio>
                        <Radio value={EOrderStatus.Confirmed}>Đã xác nhận</Radio>
                        <Radio value={EOrderStatus.Preparing}>Chuẩn bị</Radio>
                        <Radio value={EOrderStatus.Shipping}>Đang giao</Radio>
                        <Radio value={EOrderStatus.Completed}>Đã hoàn thành</Radio>
                        <Radio value={EOrderStatus.Cancelled}>Đã huỷ</Radio>
                        <Radio value={EOrderStatus.Failed}>Thất bại</Radio>
                    </Space>
                </Radio.Group>
            </Modal>
        </>
    )
}