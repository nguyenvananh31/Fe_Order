import { Breadcrumb, Card, Col, Row } from "antd";
import useTable from "./utils/table.hooks";
import { PlusOutlined } from "@ant-design/icons";
import TableAddModal from "./components/ModalAddTable";
import { EStatusTable } from "../../../constants/enum";

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
                    title: <div className="font-bold">Danh sách bàn</div>,
                },
            ]}
        />
        <div className='bg-primary drop-shadow-primary rounded-primary'>
            <Row gutter={[20, 16]} className="px-6 py-6" justify={'space-around'}>
                {
                    !!state.data.length && state.data.map((item: any) => (
                        <Col key={item.id}>
                            <Card
                                className={`border ${item.reservation_status == EStatusTable.OPEN ? 'border-sky-600 bg-sky-100' : 'border-ghost'} cursor-pointer`}
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
                    
                        className="border group/item border-dashed border-ghost cursor-pointer hover:border-purple"
                        styles={{
                            body: {
                                padding: 0
                            }
                        }}
                    >
                        <div onClick={hooks.handleShowModal} className="px-2 py-2 w-[148px] h-[120px] flex flex-col items-center justify-center transition">
                            <button style={{ border: 0, background: 'none' }} type="button">
                                <PlusOutlined className="group-hover/item:text-purple" />
                                <div className="mt-2 group-hover/item:text-purple">Thêm bàn</div>
                            </button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
        {
            state.showModalAdd && <TableAddModal onRefresh={hooks.handleRefreshPage} onClose={hooks.handleCloseModal} />
        }
    </>
}