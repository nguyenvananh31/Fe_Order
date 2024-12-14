import { CloseCircleFilled, EyeOutlined, LoadingOutlined, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { AutoComplete, Breadcrumb, Button, Col, DatePicker, Divider, Modal, Radio, Row, Select, Space, Tag, Tooltip } from "antd";
import Table, { ColumnProps } from "antd/es/table";
import { useMemo } from "react";
import { EOrderStatus, EOrderType } from "../../../constants/enum";
import { IBill } from "../../../interFaces/bill";
import { convertPriceVND } from "../../../utils/common";
import BillModel from "./components/BillModal";
import useBill from "./utils/bill.hook";

const statusBill: any = {
    'pending': { color: 'magenta', title: 'Đang chờ' },
    'confirmed': { color: 'cyan', title: 'Đã xác nhận' },
    'preparing': { color: 'gold', title: 'Chuẩn bị' },
    'shipping': { color: 'purple', title: 'Đang giao' },
    'completed': { color: 'green', title: 'Đã hoàn thành' },
    'cancelled': { color: 'red', title: 'Đã huỷ' },
    'failed': { color: 'volcano', title: 'Thất bại' },
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

export default function CatePage() {

    const { state, ...hooks } = useBill();

    const columns = useMemo(() => {
        const tblColumns: ColumnProps<IBill>[] = [
            {
                title: 'Mã',
                dataIndex: 'ma_bill',
                key: 'ma_bill',
                align: 'center',
                sorter: true,
                showSorterTooltip: { title: 'Sắp xếp theo mã' },
                render: (_: any, item: IBill) => {
                    return <span>
                        {item.ma_bill}
                    </span>
                }
            },
            {
                title: 'Tên chi nhánh',
                dataIndex: 'branch_address',
                key: 'branch_address',
                sorter: true,
                showSorterTooltip: { title: 'Sắp xếp theo tên chi nhánh' },
                render: (_: any, item: IBill) => {
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
                render: (_: any, item: IBill) => {
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
                sorter: true,
                showSorterTooltip: { title: 'Sắp xếp theo ngày đặt' },
                render: (_: any, item: IBill) => {
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
                sorter: true,
                showSorterTooltip: { title: 'Sắp xếp theo tổng số tiền' },
                render: (_: any, item: IBill) => {
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
                render: (_: any, item: IBill) => (
                    <Tooltip title="Thay đổi trạng thái">
                        <Tag onClick={() => hooks.handleOpenModalStatus(item.id, item.status)} color={statusBill[item.status]?.color} className={`min-w-[80px] cursor-pointer text-center`} >
                            {statusBill[item.status]?.title}
                        </Tag>
                    </Tooltip>
                )
            },
            {
                title: 'Trạng thái thanh toán',
                dataIndex: 'payment_status',
                align: 'center',
                width: 'max-content',
                render: (_: any, item: IBill) => (
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
                    <Tooltip title="Chi tiết">
                        <Button onClick={() => hooks.handleOpenModal(item)} className='ml-2' icon={<EyeOutlined />}></Button>
                    </Tooltip>
                )
            },
        ];
        return tblColumns;
    }, [state.pageIndex, state.pageSize]);

    return (
        <>
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
                        title: <div className="font-bold">Quản lý đơn</div>,
                    },
                ]}
            />
            <div className='bg-primary drop-shadow-primary rounded-primary'>
                <div className="pl-6 pt-4 text-lg font-semibold">Bộ lọc tìm kiếm</div>
                <Row gutter={[16, 16]} className="px-6 pt-4" align={"middle"} justify={"start"} >
                    <Col xs={24} sm={12} md={6}>
                        <Select
                            size="large"
                            className="w-full"
                            allowClear
                            options={[
                                { value: 'pending', label: 'Đang chờ' },
                                { value: 'confirmed', label: 'Đã xác nhận' },
                                { value: 'preparing', label: 'Chuẩn bị' },
                                { value: 'shipping', label: 'Đang giao' },
                                { value: 'completed', label: 'Đã hoàn thành' },
                                { value: 'cancelled', label: 'Đã huỷ' },
                                { value: 'failed', label: 'Thất bại' },
                            ]}
                            placeholder="Trạng thái"
                            onSelect={(value) => hooks.handleFilterStatus(value)}
                            onClear={hooks.refreshPage}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <DatePicker
                            className="w-full"
                            size="large"
                            onChange={hooks.handleFilterDate}
                        />
                    </Col>
                </Row>
                <Divider />
                <Row gutter={[16, 16]} className="px-6 pb-6" align={"middle"} justify={"start"} >
                    <Col xs={24} sm={24} md={24} lg={15} className="flex gap-2 max-sm:flex-col">
                        <AutoComplete
                            size="large"
                            options={hooks.options}
                            className="max-sm:w-full md:w-[400px] flex-1"
                            onSearch={hooks.handleChangeTextSearch}
                            placeholder={
                                <div className="flex items-center gap-1 cursor-pointer h-max">
                                    <SearchOutlined className="text-lg text-ghost" />
                                    <span className="text-ghost text-[14px]">Tìm đơn mã bill</span>
                                </div>
                            }
                            allowClear={{ clearIcon: state.loadingSearch ? <LoadingOutlined /> : <CloseCircleFilled /> }}
                            // onSelect={(id) => hooks.handleOpenModal(+id)}
                            value={state.textSearch}
                        />
                        <div className="flex gap-2">
                            <Button onClick={hooks.handleSearchBtn} className="w-max" size="large" icon={<SearchOutlined />}>Tìm kiếm</Button>
                            <Button className="w-max" size="large" icon={<UndoOutlined />} onClick={hooks.refreshPage}>Làm mới</Button>
                        </div>
                    </Col>
                </Row>
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
                    onChange={hooks.handleTableChange}
                    scroll={{ x: 'max-content' }}
                />
            </div>
            {
                state.showModal &&
                <BillModel onClose={hooks.handleDismissModal} onRefresh={hooks.refreshPage} itemId={state.selectedItemId} data={state.bill} />
            }
            {/* Update status */}
            <Modal
                title='Thay đổi trạng thái'
                onCancel={hooks.handleDismissModalStatus}
                open={state.showModalStatus}
                okText='Lưu'
                centered
                onOk={hooks.handleChangeStatus}
            >
                <Radio.Group onChange={hooks.onChanegStatus} value={hooks?.status?.type}>
                    <Space direction="vertical">
                        <Radio value={EOrderStatus.Pending}>Đang chờ</Radio>
                        <Radio value={EOrderStatus.Confirmed}>Đã xác nhận</Radio>
                        <Radio value={EOrderStatus.Preparing}>Chuẩn bị</Radio>
                        <Radio value={EOrderStatus.Shipping}>Đang giao</Radio>
                        <Radio value={EOrderStatus.Completed}>Đã hoàn thành</Radio>
                        <Radio value={EOrderStatus.Cancelled}>Đã huỷ</Radio>
                        <Radio value={EOrderStatus.Failed}>Thất bại</Radio>
                        <Radio value={EOrderStatus.cancellation_requested}>Chờ xác nhận hủy</Radio>
                        <Radio value={EOrderStatus.cancellation_approved}>Xác nhận hủy</Radio>
                        <Radio value={EOrderStatus.cancellation_rejected}>Hủy thất bại</Radio>
                    </Space>
                </Radio.Group>
            </Modal>
        </>
    )
}