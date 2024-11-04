import { DeleteOutlined, InfoCircleOutlined, MinusCircleOutlined, PlusCircleOutlined, RightOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Divider, Flex, QRCode } from "antd";
import Sider from "antd/es/layout/Sider";
import { Space } from "antd/lib";
import { memo } from "react";
import { convertPriceVNDNotSupfix } from "../../../../utils/common";
import { fallBackImg, getImageUrl } from "../../../../constants/common";

interface IProps {
    onToggle: (e: boolean) => void;
    onToggleCheckBox: () => void;
    onDelCartPro: (id: number) => void;
    onIncreaseCart: (item: any) => void;
    onDecreaseCart: (item: any) => void;
    onCheckedPro: (ids: number[]) => void;
    cart: any[];
    loading: boolean;
    checked: any[]
}

const SiderOrder = (props: IProps) => {

    return <Sider
        onCollapse={props.onToggle}
        breakpoint="xl"
        collapsedWidth={0}
        width={396}
        style={{
            position: "sticky",
            top: 0,
            left: 0,
            bottom: 0,
            height: '100vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            msOverflowStyle: 'none', /* Ẩn thanh cuộn cho IE và Edge */
            scrollbarWidth: 'none'   /* Ẩn thanh cuộn cho Firefox */
        }}
        className="bg-white"
    >
        <Flex justify="space-between" align="center" className="mx-6 my-4">
            <span className="text-[#00813D] text-2xl font-bold">YaGI ORDER</span>
            <img width={60} src='./images/logo/logo.png' alt="Logo" />
        </Flex>
        <Flex justify="space-between" align="center" className="px-4">
            <div>
                <p className="text-lg font-semibold mb-4">Thông tin bàn</p>
                <Space direction="vertical" align="start">
                    <Flex gap={8} justify="center" align="center">
                        <InfoCircleOutlined className="text-[#00813D]" />
                        <p className="font-bold">Số bàn: 11</p>
                    </Flex>
                    <Flex gap={8} justify="center" align="center">
                        <InfoCircleOutlined className="text-[#00813D]" />
                        <p className="font-bold">Tên khách hàng: Lê Độ</p>
                    </Flex>
                    <Flex gap={8} justify="center" align="center">
                        <InfoCircleOutlined className="text-[#00813D]" />
                        <p className="font-bold">Tổng tiền: {convertPriceVNDNotSupfix(100000)}vnđ</p>
                    </Flex>
                    <Flex gap={8} justify="center" align="center">
                        <InfoCircleOutlined className="text-[#00813D]" />
                        <p className="font-bold">Thời gian: 17:30:20 PM</p>
                    </Flex>
                </Space>
            </div>
            <QRCode value={'-'} />
        </Flex>
        <Divider />
        {/* Các món chưa gọi */}
        <div className="px-4">
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
                        props.cart.map(i => (
                            <Card key={i.id} bordered={false} style={{ boxShadow: 'unset' }} styles={{ body: { padding: 0 } }}>
                                <Card.Meta title={
                                    <Flex gap={4}>
                                        <Checkbox value={i.id} />
                                        <Flex flex={1} align="end" justify="space-between">
                                            <Flex gap={8}>
                                                <img className="rounded" width={50} src={i.image ? getImageUrl(i.image) : fallBackImg} alt="Ảnh sản phẩm" />
                                                <Space direction="vertical" align="start">
                                                    <p>{i.name}</p>
                                                    <Flex gap={8} justify="center" align="center">
                                                        <MinusCircleOutlined className="cursor-pointer" onClick={() => props.onDecreaseCart(i)} />
                                                        <p className="text-ghost text-sm min-w-6 pointer-events-none">x{i.amount || 0}</p>
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
                        ))
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
                        <span className="text-sm font-bold">-{convertPriceVNDNotSupfix(100000)}</span>
                        <span className="text-[#00813D] text-[12px]  font-bold">vnđ</span>
                    </div>
                </Flex>
                <Flex justify="space-between" align="center" >
                    <span className="font-bold">Tổng tiền</span>
                    <div>
                        <span className="text-base font-bold">{convertPriceVNDNotSupfix(500000)}</span>
                        <span className="text-[#00813D] text-sm font-bold">vnđ</span>
                    </div>
                </Flex>
                <Flex align="center" justify="center" >
                    <Button type="primary" className="w-4/5 py-4 bg-[#00813D]">Đặt ngay</Button>
                </Flex>
                <Flex align="center" justify="center" >
                    <Button className="w-4/5 py-4 border-[#00813D]">
                        <Space align="center" size={'large'}>
                            <img width={24} src="./images/icon-order.png" alt="icon" />
                            Các món đã gọi
                            <RightOutlined />
                        </Space>
                    </Button>
                </Flex>
            </Space>
        </div>
        {/* Các món đã lên */}
    </Sider>
}

export default memo(SiderOrder);