import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Flex, Row, Space } from "antd";
import { memo } from "react";
import { convertPriceVNDNotSupfix } from "../../../../utils/common";

interface IProps {

}

const ProContent = ({ }: IProps) => {
    return <>
        <Space direction="vertical" size={'large'} className="my-6">
            <span className="text-lg font-semibold">Sản phẩm Hot</span>
            <Row gutter={[16, 16]} justify={'center'} align={'middle'}>
                <Col>
                    <Card
                        loading={true}
                        hoverable
                        className="w-[330px] h-[300px] py-2"
                        cover={
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                {!true && <img alt="Ảnh danh mục" className="w-[80px] object-cover object-center" src={'./images/pasta.png'} />}
                            </div>
                        }
                    >

                    </Card>
                </Col>
                <Col>
                    <Card
                        hoverable
                        className="w-[330px] h-[300px] pb-4"
                        cover={
                            <div className="relative overflow-hidden">
                                <div className="absolute top-5 -left-2 bg-[#EB5757] py-1 px-3 rounded-lg text-white">30% sale</div>
                                <div className="flex justify-center items-center">
                                    <img alt="Ảnh danh mục" className="h-[180px] object-cover object-center" src={'./images/pasta.png'} />
                                </div>
                            </div>
                        }
                    >
                        <Card.Meta
                            title={
                                <Flex align="center" justify="space-between" >
                                    <Space direction="vertical" align="start">
                                        <div>Fish Burger</div>
                                        <div>
                                            <span className="text-xl font-bold">{convertPriceVNDNotSupfix(100000)}</span>
                                            <span className="text-[#00813D] font-bold">vnđ</span>
                                        </div>
                                    </Space>
                                    <Button type="primary" className="bg-[#00813D]" icon={<PlusOutlined />} />
                                </Flex>
                            }
                            className=""
                        />
                    </Card>
                </Col>
                <Col>
                    <Card
                        hoverable
                        className="w-[330px] h-[300px] pb-4"
                        cover={
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <img alt="Ảnh danh mục" className="h-[180px] object-cover object-center" src={'./images/pasta.png'} />
                            </div>
                        }
                    >
                        <Card.Meta
                            title={
                                <Flex align="center" justify="space-between" >
                                    <Space direction="vertical" align="start">
                                        <div>Fish Burger</div>
                                        <div>
                                            <span className="text-xl font-bold">{convertPriceVNDNotSupfix(100000)}</span>
                                            <span className="text-[#00813D] font-bold">vnđ</span>
                                        </div>
                                    </Space>
                                    <Button type="primary" className="bg-[#00813D]" icon={<PlusOutlined />} />
                                </Flex>
                            }
                            className=""
                        />
                    </Card>
                </Col>
            </Row>
        </Space>
    </>
}

export default memo(ProContent);