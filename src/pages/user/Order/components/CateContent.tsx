import { Card, Col, Row, Space } from "antd";
import { memo } from "react"

interface IProps {

}

const CateContent = ({ }: IProps) => {

    return <Space direction="vertical" size={'large'}>
        <span className="text-lg font-semibold">Danh mục</span>
        <Row gutter={[16, 16]} justify={'space-between'} align={'middle'}>
            <Col>
                <Card
                    loading={true}
                    hoverable
                    className="w-[159px] h-[160px] py-2"
                    cover={
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            {!true && <img alt="Ảnh danh mục" className="w-[80px] object-cover object-center" src={'./images/pasta.png'} /> }
                        </div>
                    }
                >
                    <Card.Meta title="Mì Xào" className="text-center" />
                </Card>
            </Col>
            <Col>
                <Card
                    hoverable
                    className="w-[159px] h-[160px] py-2"
                    cover={
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <img alt="Ảnh danh mục" className="w-[80px] object-cover object-center" src={'./images/pasta.png'} />
                        </div>
                    }
                >
                    <Card.Meta title="Mì Xào" className="text-center" />
                </Card>
            </Col>
            <Col>
                <Card
                    hoverable
                    className="w-[159px] h-[160px] py-2"
                    cover={
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <img alt="Ảnh danh mục" className="w-[80px] object-cover object-center" src={'./images/pasta.png'} />
                        </div>
                    }
                >
                    <Card.Meta title="Mì Xào" className="text-center" />
                </Card>
            </Col>
            <Col>
                <Card
                    hoverable
                    className="w-[159px] h-[160px] py-2"
                    cover={
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <img alt="Ảnh danh mục" className="w-[80px] object-cover object-center" src={'./images/pasta.png'} />
                        </div>
                    }
                >
                    <Card.Meta title="Mì Xào" className="text-center" />
                </Card>
            </Col>
            <Col>
                <Card
                    hoverable
                    className="w-[159px] h-[160px] py-2"
                    cover={
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <img alt="Ảnh danh mục" className="w-[80px] object-cover object-center" src={'./images/pasta.png'} />
                        </div>
                    }
                >
                    <Card.Meta title="Mì Xào" className="text-center" />
                </Card>
            </Col>
            <Col>
                <Card
                    hoverable
                    className="w-[159px] h-[160px] py-2"
                    cover={
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <img alt="Ảnh danh mục" className="w-[80px] object-cover object-center" src={'./images/pasta.png'} />
                        </div>
                    }
                >
                    <Card.Meta title="Mì Xào" className="text-center" />
                </Card>
            </Col>
        </Row>
    </Space>
}

export default memo(CateContent);