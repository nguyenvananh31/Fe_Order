import { DeleteOutlined, InfoCircleOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Divider, Flex } from "antd";
import Sider from "antd/es/layout/Sider";
import { Space } from "antd/lib";
import { memo } from "react";
import { convertPriceVNDNotSupfix } from "../../../../utils/common";

interface IProps {
    onToggle: (e: boolean) => void;
}

const SiderOrder = ({ onToggle }: IProps) => {

    return <Sider
        onCollapse={onToggle}
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
            overflowX: 'hidden'
        }}
        className="bg-white"
    >
        <Flex justify="space-between" align="center" className="mx-6 my-4">
            <span className="text-[#00813D] text-2xl font-bold">YaGI ORDER</span>
            <img width={60} src='./images/logo/logo.png' alt="Logo" />
        </Flex>
        <div className="px-4">
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
        <Divider />
        {/* Các món chưa gọi */}
        <div className="px-4">
            <div className="text-lg font-semibold">Danh sách Order</div>
            <Space direction="vertical" size={'large'} className="w-full">
                <Card bordered={false} style={{ boxShadow: 'unset' }} styles={{ body: { padding: 0 } }}>
                    <Card.Meta title={
                        <Flex gap={4}>
                            <Checkbox />
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
                <Card bordered={false} style={{ boxShadow: 'unset' }} styles={{ body: { padding: 0 } }}>
                    <Card.Meta title={
                        <Flex gap={4}>
                            <Checkbox />
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