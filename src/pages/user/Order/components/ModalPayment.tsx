import { Card, Col, Divider, Flex, QRCode, Row, Space, Tag } from "antd";
import BaseModalSetting from "../../../../components/base/BaseModalSetting";
import { convertPriceVNDNotSupfix } from "../../../../utils/common";

interface IProps {
    onCancel: () => void;
}

const ModalPayment = (props: IProps) => {

    return <BaseModalSetting
        onConfirm={() => {}}
        onCancel={props.onCancel}
        title={
            <div className="text-lg font-bold text-[#00813D]">
                YaGi Thanh toán
            </div>
        }
        footer={false}
        width={'max-content'}
    >
        <Flex wrap={'wrap-reverse'} className="md:w-max" gap={16}>
            <div className="bg-[#F5F5F5] md:p-4 max-md:p-2  md:rounded-md md:w-[400px]">
                <div className="text-lg font-semibold text-center mb-4">Đơn hàng</div>
                <Row gutter={[16, 16]} justify={'center'}>
                    <Col span={24}>
                        <Card loading={false} bordered={false} style={{ boxShadow: 'unset' }} styles={{ body: { padding: 0 } }}>
                            <Card.Meta title={
                                <div className="border rounded-md p-2 bg-white">
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
                                                <Tag color="red">Huỷ</Tag>
                                                {/* <div>
                                                    <span className="text-sm font-bold">{convertPriceVNDNotSupfix(100000)}</span>
                                                    <span className="text-[#00813D] text-[12px]  font-bold">vnđ</span>
                                                </div> */}
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                    {/* <Divider className="my-2" />
                                    <Flex justify="space-between" align="center">
                                        <span>01/11/2024, 08:28pm</span>
                                        <div>
                                            <span className="text-md font-bold">{convertPriceVNDNotSupfix(400000)}</span>
                                            <span className="text-[#00813D] text-[12px]  font-bold">vnđ</span>
                                        </div>
                                    </Flex> */}
                                </div>
                            } />
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card loading={false} bordered={false} style={{ boxShadow: 'unset' }} styles={{ body: { padding: 0 } }}>
                            <Card.Meta title={
                                <div className="border rounded-md p-2 bg-white">
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
                    </Col>
                    <Col span={24}>
                        <Card loading={false} bordered={false} style={{ boxShadow: 'unset' }} styles={{ body: { padding: 0 } }}>
                            <Card.Meta title={
                                <div className="border rounded-md p-2 bg-white">
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
                    </Col>
                </Row>
            </div>
            <div className="bg-[#F5F5F5] md:p-4  md:rounded-md md:w-[350px]">
                <div className="text-lg font-semibold text-center mb-4">Thanh toán</div>
                <div>
                    <div className="text-[#00813D] text-sm font-semibold my-2">Thông tin đơn</div>
                    <Space direction="vertical" className="bg-white rounded-md p-4 w-full">
                        <Flex justify="space-between" align="end" gap={12}>
                            <div>Số lượng</div>
                            <div>5</div>
                        </Flex>
                        <Flex justify="space-between" align="end" gap={12}>
                            <div>Thành tiền</div>
                            <div>
                                <span className="text-xs">{convertPriceVNDNotSupfix(100000)}</span>
                                <span className="text-[10px]">vnđ</span>
                            </div>
                        </Flex>
                        <Flex justify="space-between" align="end" gap={12}>
                            <div>Giảm giá</div>
                            <div>
                                <span className="text-xs">-{convertPriceVNDNotSupfix(100000)}</span>
                                <span className="text-[10px]">vnđ</span>
                            </div>
                        </Flex>
                        <Flex justify="space-between" align="end" gap={12}>
                            <div>Thanh toán</div>
                            <div>
                                <span className="text-sm font-semibold text-[#00813D]">{convertPriceVNDNotSupfix(100000)}</span>
                                <span className="text-[#00813D] text-[12px]  font-semibold">vnđ</span>
                            </div>
                        </Flex>
                    </Space>
                </div>
                <div>
                    <div className="text-[#00813D] text-sm font-semibold my-2">QR Thanh toán</div>
                    <Space direction="vertical" className="bg-white rounded-md p-4 w-full">
                        <Flex vertical justify="space-between" align="center" gap={4}>
                            <div>Mở Ứng Dụng Ngân Hàng để quét QRCode</div>
                            <QRCode value={'-'} size={140}/>
                        </Flex>
                        <Flex justify="space-between" align="end" gap={12}>
                            <div>Ngân hàng:</div>
                            <div>
                                
                            </div>
                        </Flex>
                        <Flex justify="space-between" align="end" gap={12}>
                            <div>Ngân hàng:</div>
                            <div>
                                
                            </div>
                        </Flex>
                        <Flex justify="space-between" align="end" gap={12}>
                            <div>Ngân hàng:</div>
                            <div>
                                
                            </div>
                        </Flex>
                    </Space>
                </div>
            </div>
            
        </Flex>
    </BaseModalSetting>
}

export default ModalPayment;