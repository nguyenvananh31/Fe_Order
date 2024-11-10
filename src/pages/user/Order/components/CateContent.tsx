import { Card, Col, Row, Space } from "antd";
import { memo } from "react"
import { fallBackImg, getImageUrl } from "../../../../constants/common";

interface IProps {
    data: any[];
    loading: boolean;
    onClickCate: (id: number) => void;
}

const CateContent = ({ loading, data, onClickCate }: IProps) => {

    return <Space direction="vertical" size={'large'}>
        <span className="text-lg font-semibold">Danh mục</span>
        <Row gutter={[16, 16]} justify={'space-between'} align={'middle'}>
            {
                loading && (
                    <>
                        <Col>
                            <Card
                                loading={loading}
                                hoverable
                                className="w-[159px] h-[160px] py-2"
                                cover={
                                    <div className="flex justify-center items-center overflow-hidden">
                                        {!true && <img alt="Ảnh danh mục" className="w-[80px] object-cover object-center" src={'./images/pasta.png'} />}
                                    </div>
                                }
                            >
                                <Card.Meta title="Mì Xào" className="text-center" />
                            </Card>
                        </Col>
                        <Col>
                            <Card
                                loading={loading}
                                hoverable
                                className="w-[159px] h-[160px] py-2"
                                cover={
                                    <div className="flex justify-center items-center overflow-hidden">
                                        {!true && <img alt="Ảnh danh mục" className="w-[80px] object-cover object-center" src={'./images/pasta.png'} />}
                                    </div>
                                }
                            >
                                <Card.Meta title="Mì Xào" className="text-center" />
                            </Card>
                        </Col>
                    </>
                )
            }
            {
                data.map(i => (
                    <Col key={i.id}>
                        <Card
                            hoverable
                            className="w-[159px] h-[160px]"
                            cover={
                                <div className="flex justify-center items-center overflow-hidden">
                                    <img alt="Ảnh danh mục" className="h-[80px] w-full object-cover object-center" src={i.image ? getImageUrl(i.image) : fallBackImg} />
                                </div>
                            }
                            onClick={() => onClickCate(i.id)}
                        >
                            <Card.Meta title={i.name} className="text-center" />
                        </Card>
                    </Col>
                ))
            }
        </Row>
    </Space>
}

export default memo(CateContent);