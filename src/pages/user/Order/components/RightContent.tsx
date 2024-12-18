import { DeleteOutlined, InfoCircleOutlined, MinusCircleOutlined, PlusCircleOutlined, RightOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Divider, Flex, QRCode, Skeleton, Space, Tag } from "antd";
import { memo, useCallback, useMemo, useState } from "react";
import { convertPriceVNDNotSupfix, getUrlQrCheck } from "../../../../utils/common";
import moment from "moment";
import { fallBackImg, getImageUrl } from "../../../../constants/common";

interface IProps {
    props: {
        onToggleCheckBox: () => void;
        onDelCartPro: (id: number) => void;
        onIncreaseCart: (item: any) => void;
        onDecreaseCart: (item: any) => void;
        onCheckedPro: (ids: number[]) => void;
        onShowPayment: () => void;
        onOrderPro: () => void;
        onFetchBill: () => void;
        cart: any[];
        loading: boolean;
        checked: any[];
        loadingBtn: boolean;
        loadBill: boolean;
        billDetail: any;
        billOnlinePro: any[];
        orderId: string;
        isMobile: boolean;
    }
}

interface ITotal {
    totalSale: number;
    totalPrice: number;
}

const RightContent = ({props}: IProps) => {

    const [tab, setTab] = useState<number>(1);

    const total: ITotal= useMemo(() => {
        const pros = props.cart.filter(i => props.checked.includes(i.id));
        const totalSale = pros.reduce((acc, curr) => acc + (+curr.sale || 0), 0);
        const totalPrice = pros.reduce((acc, curr) => acc + (+curr.sale || +curr.price), 0);
        return {
            totalSale, totalPrice
        };
    }, [props.checked]);

    const handleChangeTab = useCallback((tab: number) => {
        setTab(tab);
        if (tab == 2) {
            props.onFetchBill();
        }
    }, [props.onFetchBill]);

    return <>
        <div style={{
            position: 'fixed',
            zIndex: 10000,
            backgroundColor: '#ffffff',
            width: props.isMobile ? '100%' : '396px',
            paddingTop: props.isMobile ? '20px' : 'unset',
            top: props.isMobile ? 65 : 96
        }}>
            <Flex justify="space-between" align="center" className="px-4">
                {
                    props.loadBill ? (
                        <Skeleton style={{ width: '50%' }} />
                    ) :
                        (
                            <div>
                                <p className="text-lg font-semibold mb-4">Thông tin bàn</p>
                                <Space direction="vertical" align="start">
                                    <Flex gap={8} justify="center" align="center">
                                        <InfoCircleOutlined className="text-[#00813D]" />
                                        <p className="font-bold">Số bàn: {props.billDetail?.tableNumber}</p>
                                    </Flex>
                                    <Flex gap={8} justify="center" align="center">
                                        <InfoCircleOutlined className="text-[#00813D]" />
                                        <p className="font-bold">Tên khách hàng: {props.billDetail?.customerName}</p>
                                    </Flex>
                                    <Flex gap={8} justify="center" align="center">
                                        <InfoCircleOutlined className="text-[#00813D]" />
                                        <p className="font-bold">Tổng tiền: {convertPriceVNDNotSupfix(+props.billDetail?.totalAmount || 0)}vnđ</p>
                                    </Flex>
                                    <Flex gap={8} justify="center" align="center">
                                        <InfoCircleOutlined className="text-[#00813D]" />
                                        <p className="font-bold">Thời gian: {moment(props.billDetail?.orderDate || undefined, "YYYY-MM-DD HH:mm:ss").format("hh:mm:ss A")}</p>
                                    </Flex>
                                </Space>
                            </div>
                        )
                }
                <QRCode value={getUrlQrCheck(props.orderId || '')} />
            </Flex>
            <Divider  className="mb-0"/>
        </div>
        {/* Các món chưa gọi */}
        {
            tab == 1 && (
                <div className={`px-4 ${props.isMobile ? 'pt-[200px]' : 'max-xl:pt-[240px] xl:pt-[300px]'}`}>
                    <div className="text-lg font-semibold">Danh sách Order</div>
                    <Checkbox.Group className="w-full" value={props.checked} onChange={props.onCheckedPro}>
                        <Space direction="vertical" size={'large'} className="w-full">
                            {
                                props.loading && (
                                    <Card loading={true} bordered={false} style={{ boxShadow: 'unset' }} styles={{ body: { padding: 0 } }}>
                                        <Card.Meta title={
                                            <Flex gap={4}>
                                                <Checkbox value={'bb'} />
                                                <Flex flex={1} align="end" justify="space-between">
                                                    <Flex gap={8}>
                                                        <img width={50} src="./images/pasta.png" alt="Ảnh sản phẩm" />
                                                        <div>
                                                            <p>Fish Burger</p>
                                                            <p className="text-ghost text-sm">x4</p>
                                                        </div>
                                                    </Flex>
                                                    <Flex gap={4} vertical={true} justify="space-between" align="end">
                                                        <DeleteOutlined className="cursor-pointer text-[#EB5757]" />
                                                        <div>
                                                            <span className="text-sm font-bold">{convertPriceVNDNotSupfix(100000)}</span>
                                                            <span className="text-[#00813D] text-[12px]  font-bold">vnđ</span>
                                                        </div>
                                                    </Flex>
                                                </Flex>
                                            </Flex>
                                        } />
                                    </Card>
                                )
                            }
                            {
                                props.cart.map(i => {
                                    return (
                                        <Card key={i.id} bordered={false} style={{ boxShadow: 'unset' }} styles={{ body: { padding: 0 } }}>
                                            <Card.Meta title={
                                                <Flex gap={4}>
                                                    <Checkbox value={i.id} />
                                                    <Flex flex={1} align="end" justify="space-between">
                                                        <Flex gap={8}>
                                                            <img className="rounded w-[50px] h-[50px] object-cover object-center" src={i.product_thumbnail ? getImageUrl(i.product_thumbnail) : fallBackImg} alt="Ảnh sản phẩm" />
                                                            <Space direction="vertical" align="start">
                                                                <p>{i.product_name} - {i.size_name}</p>
                                                                <Flex gap={8} justify="center" align="center">
                                                                    <MinusCircleOutlined className="cursor-pointer" onClick={() => props.onDecreaseCart(i)} />
                                                                    <p className="text-ghost text-sm min-w-6 pointer-events-none">x{i.quantity || 0}</p>
                                                                    <PlusCircleOutlined onClick={() => props.onIncreaseCart(i)} className="cursor-pointer" />
                                                                </Flex>
                                                            </Space>
                                                        </Flex>
                                                        <Flex gap={4} vertical={true} justify="space-between" align="end">
                                                            <DeleteOutlined onClick={() => props.onDelCartPro(i.id)} className="cursor-pointer text-[#EB5757]" />
                                                            <div>
                                                                <span className="text-sm font-bold">{convertPriceVNDNotSupfix(i.price)}</span>
                                                                <span className="text-[#00813D] text-[12px]  font-bold">vnđ</span>
                                                            </div>
                                                        </Flex>
                                                    </Flex>
                                                </Flex>
                                            } />
                                        </Card>
                                    )
                                })
                            }
                            {
                                props.cart.length == 0 && !props.loading && (
                                    <div className="text-center">
                                        <SmileOutlined style={{ fontSize: 24 }} />
                                        <p>Không có sản phẩm nào</p>
                                    </div>
                                )
                            }
                        </Space>
                    </Checkbox.Group>
                    {/*Btn choose all */}
                    <Space align="center" className="mt-4">
                        <Button onClick={props.onToggleCheckBox}>{props.cart.length != 0 && props.cart.length == props.checked.length ? 'Bỏ chọn' : 'Chọn tất cả'}</Button>
                        <span>{props.checked.length} sản phẩm đang chọn</span>
                    </Space>
                    <Divider />
                    <Space direction="vertical" size={'large'} className="w-full">
                        <Flex justify="space-between" align="center" >
                            <span>Giảm giá</span>
                            <div>
                                <span className="text-sm font-bold">-{convertPriceVNDNotSupfix(total.totalSale)}</span>
                                <span className="text-[#00813D] text-[12px]  font-bold">vnđ</span>
                            </div>
                        </Flex>
                        <Flex justify="space-between" align="center" >
                            <span className="font-bold">Tổng tiền</span>
                            <div>
                                <span className="text-base font-bold">{convertPriceVNDNotSupfix(total.totalPrice)}</span>
                                <span className="text-[#00813D] text-sm font-bold">vnđ</span>
                            </div>
                        </Flex>
                        <Flex align="center" justify="center" >
                            <Button loading={props.loadingBtn} onClick={props.onOrderPro} type="primary" className="w-4/5 py-4 bg-[#00813D]">Đặt ngay</Button>
                        </Flex>
                        <Flex align="center" justify="center" >
                            <Button onClick={() => handleChangeTab(2)} className="w-4/5 py-4 border-[#00813D]">
                                <Space align="center" size={'large'}>
                                    <img width={24} src="./images/icon-order.png" alt="icon" />
                                    Các món đã gọi
                                    <RightOutlined />
                                </Space>
                            </Button>
                        </Flex>
                    </Space>
                </div>
            )
        }
        {/* Các món đã lên */}
        {
            tab == 2 && (
                <div className={`px-4 ${props.isMobile ? 'pt-[200px]' : 'max-xl:pt-[220px] xl:pt-[330px]'}`}>
                    <Space direction="vertical" size={'large'} className="w-full">
                        <Flex align="center" justify="center" >
                            <Button type="primary" className="w-4/5 py-4 bg-[#00813D]" onClick={() => { handleChangeTab(1) }}>Gọi thêm món</Button>
                        </Flex>
                        <Flex align="center" justify="center" >
                            <Button onClick={props.onShowPayment} className="w-4/5 py-4 border-[#00813D]">
                                <Space align="center" size={'large'}>
                                    <img width={24} src="./images/review.png" alt="icon" />
                                    Thanh toán
                                </Space>
                            </Button>
                        </Flex>
                        <div className="text-lg font-semibold">Các món đã Order</div>
                        {
                            props.billOnlinePro.length > 0 &&
                            props.billOnlinePro.map((i, y) => (
                                <Card key={y} loading={false} bordered={false} style={{ boxShadow: 'unset' }} styles={{ body: { padding: 0 } }}>
                                    <Card.Meta title={
                                        <div className="border rounded-md p-2 oredered-card">
                                            <Flex gap={4}>
                                                <Flex flex={1} align="end" justify="space-between">
                                                    <Flex gap={8}>
                                                        <img width={50} src="./images/pasta.png" alt="Ảnh sản phẩm" />
                                                        <div>
                                                            <p>{i.name} - {i.size_name}</p>
                                                            <p className="text-ghost text-sm">x{i.quantity}</p>
                                                        </div>
                                                    </Flex>
                                                    <Flex gap={4} vertical={true} justify="space-between" align="end">
                                                        <Tag color={i.status ? 'green' : 'orange'}>{i.status ? 'Hoàn thành' : 'Đang chờ'}</Tag>
                                                        <div>
                                                            <span className="text-sm font-bold">{convertPriceVNDNotSupfix((i?.sale || i?.price) || 0)}</span>
                                                            <span className="text-[#00813D] text-[12px]  font-bold">vnđ</span>
                                                        </div>
                                                    </Flex>
                                                </Flex>
                                            </Flex>
                                            <Divider className="my-2" />
                                            <Flex justify="space-between" align="center">
                                                <span className="text-sm text-ghost">{moment(i?.time_order || undefined).format("DD/MM/YYYY, hh:mma")}</span>
                                                <div>
                                                    <span className="text-md font-bold">{convertPriceVNDNotSupfix((i?.sale || i?.price) * i.quantity)}</span>
                                                    <span className="text-[#00813D] text-[12px]  font-bold">vnđ</span>
                                                </div>
                                            </Flex>
                                            {/* <div className="del">Huỷ món</div> */}
                                        </div>
                                    } />
                                </Card>
                            ))
                        }
                        {
                            props.loadBill && (
                                <Card loading={true} bordered={false} style={{ boxShadow: 'unset' }} styles={{ body: { padding: 0 } }}>
                                    <Card.Meta title={
                                        <div className="border rounded-md p-2">
                                            <Flex gap={4}>
                                                <Flex flex={1} align="end" justify="space-between">
                                                    <Flex gap={8}>
                                                        <img width={50} src="./images/pasta.png" alt="Ảnh sản phẩm" />
                                                        <div>
                                                            <p>Fish Burger</p>
                                                            <p className="text-ghost text-sm">x4</p>
                                                        </div>
                                                    </Flex>
                                                    <Flex gap={4} vertical={true} justify="space-between" align="end">
                                                        <Tag color="green">Hoàn thành</Tag>
                                                        <div>
                                                            <span className="text-sm font-bold">{convertPriceVNDNotSupfix(100000)}</span>
                                                            <span className="text-[#00813D] text-[12px]  font-bold">vnđ</span>
                                                        </div>
                                                    </Flex>
                                                </Flex>
                                            </Flex>
                                            <Divider className="my-2" />
                                            <Flex justify="space-between" align="center">
                                                <span className="text-sm text-ghost">01/11/2024, 08:28pm</span>
                                                <div>
                                                    <span className="text-md font-bold">{convertPriceVNDNotSupfix(400000)}</span>
                                                    <span className="text-[#00813D] text-[12px]  font-bold">vnđ</span>
                                                </div>
                                            </Flex>
                                        </div>
                                    } />
                                </Card>
                            )
                        }
                        {
                            props.billOnlinePro.length == 0 && !props.loadBill && (
                                <div className="text-center">
                                    <SmileOutlined style={{ fontSize: 24 }} />
                                    <p>Không có sản phẩm nào</p>
                                </div>
                            )
                        }
                    </Space>
                </div>
            )
        }
    </>
}

export default memo(RightContent);