import { Breadcrumb, Card, Col, Row } from "antd";
import useTable from "./utils/table.hooks";

export default function TablePage() {

    const { state, ...hooks } = useTable();

    return <>
        {hooks.contextHolder}
        <Breadcrumb
            style={{
                fontSize: "24px",
                margin: "16px 0 28px 0"
            }}
            items={[
                {
                    title: 'Dashboard',
                },
                {
                    title: <h1 className="font-bold">Danh sách bàn</h1>,
                },
            ]}
        />
        <div className='bg-primary drop-shadow-primary rounded-primary'>
            <Row gutter={[20, 16]} className="px-6 py-6" justify={'space-around'}>
                {
                    !!state.data.length && state.data.map((item: any) => (
                        <Col key={item.id}>
                            <Card
                                className={`border ${!!item.status ? 'border-purple bg-purple' : 'border-ghost'} cursor-pointer`}
                                onClick={() => hooks.openModalTable(item.id)}
                                styles={{
                                    body: {
                                        padding: 0
                                    }
                                }}
                            >
                                <div className="px-2 py-2 w-[148px] h-[120px] flex flex-col justify-between">
                                    <div>
                                        Bàn {item.table}
                                    </div>
                                    <div className="flex gap-4 justify-between">
                                        <span>2h20</span>
                                        <span>1.000.000d</span>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    ))
                }
                <Col>
                    <Card
                        className="border border-purple bg-purple cursor-pointer"
                        onClick={() => hooks.openModalTable(12)}
                        styles={{
                            body: {
                                padding: 0
                            }
                        }}
                    >
                        <div className="px-2 py-2 w-[148px] h-[120px] flex flex-col justify-between">
                            <div>
                                Bàn 1
                            </div>
                            <div className="flex gap-4 justify-between">
                                <span>2h20</span>
                                <span>1.000.000d</span>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col>
                    <Card
                        className="border border-ghost cursor-pointer"
                        onClick={() => hooks.openModalTable(12)}
                        styles={{
                            body: {
                                padding: 0
                            }
                        }}
                    >
                        <div className="px-2 py-2 w-[148px] h-[120px] flex flex-col justify-between">
                            <div>
                                Bàn 2
                            </div>
                            <div className="flex gap-4 justify-between">
                                {/* <span>2h20</span>
                                <span>1.000.000d</span> */}
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    </>
}