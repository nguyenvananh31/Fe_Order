import { ZoomInOutlined } from "@ant-design/icons";
import { Button, Col, Image, Modal, Row, Space, Tag, Timeline } from "antd";
import { ColumnProps } from "antd/es/table";
import { Table } from "antd/lib";
import { useEffect, useMemo, useState } from "react";
import { fallBackImg, getImageUrl } from "../../../../constants/common";
import { EOrderType } from "../../../../constants/enum";
import { IBill, IBillDetail } from "../../../../interFaces/bill";
import { convertPriceVND } from "../../../../utils/common";
import { apiGetOneBillDetail, apiGetOneBillShipping } from "../utils/bill.service";

const statusBill: any = {
    pending: { color: 'magenta', title: 'Đang chờ' },
    confirmed: { color: 'cyan', title: 'Đã xác nhận' },
    preparing: { color: 'gold', title: 'Chuẩn bị' },
    shipping: { color: 'purple', title: 'Đang giao' },
    completed: { color: 'green', title: 'Đã hoàn thành' },
    cancelled: { color: 'red', title: 'Đã huỷ' },
    failed: { color: 'volcano', title: 'Thất bại' }
};
interface IProps {
    itemId?: number;
    onRefresh: () => void;
    onClose: () => void;
    data?: IBill;
    isClient?: boolean;
}

interface IState {
    loading: boolean;
    loadingBtn: boolean;
    loadingShip: boolean;
    isEdit: boolean;
    item?: IBillDetail[];
    shipping: any[];
    shipper?: any;
}

const initState: IState = {
    loading: true,
    loadingBtn: false,
    loadingShip: false,
    isEdit: false,
    shipping: [],
}

export default function BillModel({ onClose, itemId = undefined, data, isClient }: IProps) {

    const [state, setState] = useState<IState>(initState);

    useEffect(() => {
        if (!itemId) {
            setState(prev => ({ ...prev, isEdit: true, loading: false }));
            return;
        }
        const fetchApi = async () => {
            try {
                setState(prev => ({ ...prev, loading: true }));
                const res: any = await apiGetOneBillDetail(itemId!, isClient);
                setState(prev => ({ ...prev, loading: false, item: isClient ? res?.bill_details : res?.data }));
            } catch (error) {
                console.log(error);
                setState(prev => ({ ...prev, isEdit: true, loading: false }));
            }
        }
        fetchApi();
    }, []);

    useEffect(() => {
        if (!itemId || !isClient) {
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
                width={650}
            >
                <Row gutter={[20, 20]}>
                    <Col span={24}>
                        <Row gutter={20}>
                            <Col xs={24} sm={12}>
                                <div className="flex">
                                    <span className="text-primary font-bold mr-2">Mã đơn:</span>
                                    <span>#{data?.ma_bill}</span>
                                </div>
                                <div className="flex">
                                    <span className="text-primary font-bold mr-2">Tên khách hàng:</span>
                                    <span>{data?.khachhang?.name || data?.khachhang?.email}</span>
                                </div>
                                <div className="flex">
                                    <span className="text-primary font-bold mr-2">Địa chỉ:</span>
                                    <span>{data?.addresses || 'Chưa có'}</span>
                                </div>
                                <div className="flex">
                                    <span className="text-primary font-bold mr-2">Ngày đặt:</span>
                                    <span>{data?.order_date}</span>
                                </div>
                            </Col>
                            <Col xs={24} sm={12}>
                                <div className="flex">
                                    <span className="text-primary font-bold mr-2">Cách thức:</span>
                                    <span>{data?.order_type == EOrderType.In_restaurant ? 'Tại nhà hàng' : 'Online'}</span>
                                </div>
                                <div className="flex">
                                    <span className="text-primary font-bold mr-2">Trạng thái:</span>
                                    <span>
                                        <Tag color={statusBill[data?.status || ''].color} className={`min-w-[80px]`} >
                                            {statusBill[data?.status || ''].title}
                                        </Tag>
                                    </span>
                                </div>
                                <div className="flex">
                                    <span className="text-primary font-bold mr-2">Thanh toán:</span>
                                    <span>{data?.payment || 'Chưa có'}</span>
                                </div>
                                <div className="flex">
                                    <span className="text-primary font-bold mr-2">Tổng tiền:</span>
                                    <span>{convertPriceVND(+data?.total_amount! || 0)}</span>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    {
                        isClient && (
                            <>
                                <Col span={12}>
                                    <span className="text-[15px] font-bold">Tiến độ đơn hàng</span>
                                    <Timeline
                                        className="mt-2"
                                        items={state.shipping.map(i => ({ children: `${i?.description} - ${i?.created_at}` }))}
                                    />
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
                </Row>
            </Modal>
        </>
    )
}