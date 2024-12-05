import { PlusOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Card, Col, Flex, Row, Space } from "antd";
import { memo } from "react";
import { convertPriceVNDNotSupfix } from "../../../../utils/common";
import { fallBackImg, getImageUrl } from "../../../../constants/common";

interface IProps {
    data: any[];
    loading: boolean;
    onClickAdd: (item: any) => void;
}

const ProContent = ({ data, loading, onClickAdd }: IProps) => {
    return <div className="w-full">
        <Space direction="vertical" size={'large'} className="my-6 w-full" >
            <span className="text-lg font-semibold">Sản phẩm</span>
            <Row gutter={[16, 16]} justify={'center'} align={'middle'}>
                {
                    loading && (
                        <Col>
                            <Card
                                loading={loading}
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

                    )
                }
                {
                    data.map(i => (
                        <Col key={i.id}>
                            <Card
                                hoverable
                                className="w-[330px] h-[300px] pb-4 cursor-default"
                                cover={
                                    <div className="relative overflow-hidden">
                                        {
                                            i.sale && (
                                                <div className="absolute top-5 -left-2 bg-[#EB5757] py-1 px-4 rounded-lg text-white">sale</div>
                                            )
                                        }
                                        <div className="flex justify-center items-center">
                                            <img alt="Ảnh danh mục" className="h-[180px] object-cover object-center" src={i.image ? getImageUrl(i.image) : fallBackImg} />
                                        </div>
                                    </div>
                                }
                            >
                                <Card.Meta
                                    title={
                                        <Flex align="center" justify="space-between" >
                                            <Space direction="vertical" align="start">
                                                <div className="line-clamp-2 w-max">{i.name} - {i.size.name}</div>
                                                <Flex>
                                                    <Flex vertical>
                                                        {
                                                            !!i.sale && (
                                                                <div>
                                                                    <span className="text-sm font-semibold line-through text-ghost">{convertPriceVNDNotSupfix(i.sale)}</span>
                                                                    <span className="text-[#00813D] font-bold">vnđ</span>
                                                                </div>
                                                            )
                                                        }
                                                        <div>
                                                            <span className="text-xl font-bold">{convertPriceVNDNotSupfix(i.sale ? i.price : i.sale)}</span>
                                                            <span className="text-[#00813D] font-bold">vnđ</span>
                                                        </div>
                                                    </Flex>
                                                    <Button onClick={() => onClickAdd(i)} type="primary" className="bg-[#00813D] mx-2" icon={<PlusOutlined />} />
                                                </Flex>
                                            </Space>
                                        </Flex>
                                    }
                                    className=""
                                />
                            </Card>
                        </Col>
                    ))
                }
                {
                    data.length == 0 && !loading && <Col>
                        <div className="text-center">
                            <SmileOutlined style={{ fontSize: 24 }} />
                            <p>Không có sản phẩm nào</p>
                        </div>
                    </Col>
                }
            </Row>
        </Space>
    </div>
}

export default memo(ProContent);