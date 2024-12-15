import { ZoomInOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Image, Modal, Row, Space, Tag, Timeline } from "antd";
import { ColumnProps } from "antd/es/table";
import { Table } from "antd/lib";
import { useEffect, useMemo, useState } from "react";
import { fallBackImg, getImageUrl } from "../../../../constants/common";
import { EOrderType } from "../../../../constants/enum";
import { IBillDetail } from "../../../../interFaces/bill";
import { convertPriceVND, getInfoBank, getQrImagePay } from "../../../../utils/common";
import { apiGetOneBillDetail, apiGetOneBillShipping } from "../utils/bill.service";


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
interface IProps {
    itemId?: number;
    onRefresh: () => void;
    onClose: () => void;
    data?: any;
    isClient?: boolean;
    isAdmin?: boolean;
}

interface IState {
    loading: boolean;
    loadingBtn: boolean;
    loadingShip: boolean;
    isEdit: boolean;
    item?: IBillDetail[];
    shipping: any[];
    shipper?: any;
    data?: any;
}



export default function BillModel({ onClose, itemId = undefined, data, isClient, isAdmin }: IProps) {

    const initState: IState = useMemo(() => ({
        loading: true,
        loadingBtn: false,
        loadingShip: false,
        isEdit: false,
        shipping: isAdmin ? data?.shipping_histories : [],
        shipper: isAdmin ? data?.shipper : undefined,
        data
    }), []);

    const [state, setState] = useState<IState>(initState);
    const bankInfo: any = useMemo(() => getInfoBank(), []);

    useEffect(() => {
        if (!itemId) {
            setState(prev => ({ ...prev, isEdit: true, loading: false }));
            return;
        }
        const fetchApi = async () => {
            try {
                setState(prev => ({ ...prev, loading: true }));
                const res: any = await apiGetOneBillDetail(itemId!, isClient);
                setState(prev => {
                    const stateData = prev?.data ? { ...prev.data, address: res?.bill?.address } : undefined;
                    return ({ ...prev, loading: false, item: isClient ? res?.bill_details : res?.data, data: stateData })
                });
            } catch (error) {
                console.log(error);
                setState(prev => ({ ...prev, isEdit: true, loading: false }));
            }
        }
        fetchApi();
    }, []);

    useEffect(() => {
        if (!itemId || !isClient || isAdmin) {
            setState(prev => ({ ...prev, isEdit: true }));
            return;
        }
        const fetchApi = async () => {
            try {
                setState(prev => ({ ...prev, loadingShip: true }));
                const res: any = await apiGetOneBillShipping(itemId!);
                const shipper = res?.history.length > 0 ? res?.history[0].shipper : {};
                setState(prev => ({ ...prev, loadingShip: false, shipping: res?.history, shipper }));
            } catch (error) {
                console.log(error);
                setState(prev => ({ ...prev, isEdit: true, loading: false, shipping: [] }));
            }
        }
        fetchApi();
    }, []);

    const columns = useMemo(() => {
        const tblColumns: ColumnProps<IBillDetail>[] = [
            {
                title: 'STT',
                dataIndex: 'stt',
                render: (_: any, __: any, index: number) => {
                    return <span>
                        {(index + 1)}
                    </span>
                }
            },
            {
                title: 'Tên sản phẩm',
                dataIndex: 'name',
                key: 'name',
                render: (_: any, item: any) => {
                    return (
                        <div className={`text-purple font-semibold`}>
                            {item.name}
                        </div>
                    )
                }
            },
            {
                title: 'Kích thước',
                dataIndex: 'size',
                align: 'center',
                render: (_: any, item: any) => {
                    return <span>
                        {item.size}
                    </span>
                }
            },
            {
                title: 'Hình ảnh',
                dataIndex: 'image',
                width: 'auto',
                align: 'center',
                render: (_: any, item: any) => {
                    return (
                        <Image
                            style={{ objectFit: 'cover', width: '80px', height: '80px', borderRadius: "5px" }}
                            src={item.thumbnail ? getImageUrl(item.thumbnail) : fallBackImg}
                            preview={{
                                mask: (
                                    <Space direction="vertical" align="center">
                                        <ZoomInOutlined />
                                    </Space>
                                ),
                            }}
                        />
                    );
                },
            },
            {
                title: 'Số lượng',
                dataIndex: 'quantity',
                align: 'center',
                render: (_: any, item: any) => {
                    return <span>
                        {item.quantity}
                    </span>
                }
            },
            {
                title: 'Tổng',
                dataIndex: 'total_amount',
                align: 'center',
                render: (_: any, item: any) => {
                    return <span>
                        {convertPriceVND(item.total)}
                    </span>
                }
            },
        ];
        return tblColumns;
    }, [])

    return (
        <>
            <Modal
                // loading={state.loading}
                open={true}
                onCancel={onClose}
                footer={
                    <Button onClick={onClose}>
                        Thoát
                    </Button>
                }
                centered
                title={
                    <div className="text-primary text-lg">
                        Chi tiết đơn
                    </div>
                }
                width={800}
            >
                <Row gutter={[20, 20]}>
                    <Col span={24}>
                        <Row gutter={20}>
                            <Col xs={24} sm={12}>
                                <div className="flex">
                                    <span className="text-primary font-bold mr-2">Mã đơn:</span>
                                    <span>#{state?.data?.ma_bill}</span>
                                </div>
                                <div className="flex">
                                    <span className="text-primary font-bold mr-2">Tên khách hàng:</span>
                                    <span>{state?.data?.khachhang?.name || state?.data?.khachhang?.email}</span>
                                </div>
                                <div className="flex">
                                    <span className="text-primary font-bold mr-2">Địa chỉ:</span>
                                    <span>{state?.data?.address || 'Chưa có'}</span>
                                </div>
                                <div className="flex">
                                    <span className="text-primary font-bold mr-2">Ngày đặt:</span>
                                    <span>{state?.data?.order_date}</span>
                                </div>
                            </Col>
                            <Col xs={24} sm={12}>
                                <div className="flex">
                                    <span className="text-primary font-bold mr-2">Cách thức:</span>
                                    <span>{state?.data?.order_type == EOrderType.In_restaurant ? 'Tại nhà hàng' : 'Online'}</span>
                                </div>
                                <div className="flex">
                                    <span className="text-primary font-bold mr-2">Trạng thái:</span>
                                    <span>
                                        <Tag color={statusBill[state?.data?.status || ''].color} className={`min-w-[80px]`} >
                                            {statusBill[state?.data?.status || ''].title}
                                        </Tag>
                                    </span>
                                </div>
                                <div className="flex">
                                    <span className="text-primary font-bold mr-2">Thanh toán:</span>
                                    <span>{state?.data?.payment || 'Chưa có'}</span>
                                </div>
                                <div className="flex">
                                    <span className="text-primary font-bold mr-2">Trạng thái thanh toán:</span>
                                    <Tag color={statusPayment[state?.data?.payment_status || ''].color} className={`min-w-[80px]`} >
                                        {statusPayment[state?.data?.payment_status || ''].title}
                                    </Tag>
                                </div>
                                <div className="flex">
                                    <span className="text-primary font-bold mr-2">Tổng tiền:</span>
                                    <span>{convertPriceVND(+state?.data?.total_amount! || 0)}</span>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    {
                        isClient && state?.data?.payment_status == 'pending' && (
                            <>
                                <Col span={12} className="text-center">
                                    <Flex vertical justify="space-between" align="center" gap={4}>
                                        <div>Mở Ứng Dụng Ngân Hàng để quét QRCode</div>
                                        <Image width={150} className="p-1 rounded border" src={getQrImagePay(+state?.data?.totalAmount || +state?.data?.total_amount, state?.data?.id)} />
                                    </Flex>
                                </Col>
                                <Col span={12} className="flex flex-col justify-center">
                                    <Flex justify="space-between" align="end" gap={12}>
                                        <div className="basis-2/5">Ngân hàng:</div>
                                        <div className="flex-1 font-bold line-clamp-1">
                                            {bankInfo?.bankType || 'MB'}
                                        </div>
                                    </Flex>
                                    <Flex justify="space-between" align="end" gap={12}>
                                        <div className="basis-2/5">Số tài khoản:</div>
                                        <div className="flex-1 font-bold line-clamp-1">
                                            {bankInfo?.numberBank || '0374339124'}
                                        </div>
                                    </Flex>
                                    <Flex justify="space-between" align="end" gap={12}>
                                        <div className="basis-2/5">Tên tài khoản:</div>
                                        <div className="flex-1 font-bold line-clamp-1">
                                            {'DO VAN KHOA'}
                                        </div>
                                    </Flex>
                                </Col>
                            </>
                        )
                    }
                    {
                        (isClient || isAdmin) && (
                            <>
                                <Col span={12}>
                                    <span className="text-[15px] font-bold">Tiến độ đơn hàng</span>
                                    <div className="max-h-[200px]" style={{
                                        overflowY: 'auto',
                                        overflowX: 'hidden',
                                        msOverflowStyle: 'none', /* Ẩn thanh cuộn cho IE và Edge */
                                        scrollbarWidth: 'none'   /* Ẩn thanh cuộn cho Firefox */
                                    }}>
                                        <Timeline
                                            className="mt-2"
                                            items={state.shipping.map(i => ({ children: `${i?.description} - ${i?.created_at}` }))}
                                        />
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <span className="text-[15px] font-bold">Thông tin người giao hàng</span>
                                    <div className="flex">
                                        <span className="text-primary font-bold mr-2">Tên shipper:</span>
                                        <span>{state?.shipper?.name || state?.shipper?.email || 'Chưa có thông tin'}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-primary font-bold mr-2">Số điện thoại:</span>
                                        <span>{state?.shipper?.phone || 'Chưa có thông tin'}</span>
                                    </div>
                                </Col>
                            </>
                        )
                    }
                    {!isAdmin && (
                        <Col span={24}>
                            <div className='flex items-center justify-between mb-2'>
                                <h1 className='text-primary text-lg'>Danh sách sản phẩm</h1>
                            </div>
                            <Table
                                loading={state.loading}
                                dataSource={state.item}
                                columns={columns}
                                rowKey="id"
                                pagination={false}
                            />
                        </Col>
                    )}
                </Row>
            </Modal>
        </>
    )
}