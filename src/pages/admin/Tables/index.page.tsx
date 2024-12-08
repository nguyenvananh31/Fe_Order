import { PlusOutlined, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { AutoComplete, Avatar, Breadcrumb, Button, Card, Col, List, Pagination, Row, Splitter, Tag, TreeSelect } from "antd";
import VirtualList from 'rc-virtual-list';
import { EStatusTable } from "../../../constants/enum";
import { convertPriceVND } from "../../../utils/common";
import TableAddModal from "./components/ModalAddTable";
import useTable from "./utils/table.hooks";
import { fallBackImg, getImageUrl } from "../../../constants/common";
import ModalOpenTable from "../../user/Table/components/ModalOpenTable";

export default function TablePage() {

    const { state, ...hooks } = useTable();

    return <>
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
            <Splitter onResize={hooks.handleResize}>
                <Splitter.Panel style={{
                    overflowY: 'auto',
                    overflowX: 'hidden'
                }}>
                    <Row gutter={[20, 16]} className="px-6 py-6" justify={'space-around'}>
                        <Col span={15}
                        // className="flex gap-2 max-sm:flex-col"
                        >
                            <AutoComplete
                                size="large"
                                options={[]}
                                className="max-sm:w-full md:w-[300px] w-full"
                                // onSearch={hooks.handleChangeTextSearch}
                                placeholder={
                                    <div className="flex items-center gap-1 cursor-pointer h-max">
                                        <SearchOutlined className="text-lg text-ghost" />
                                        <span className="text-ghost text-[14px]">Tìm kích thước</span>
                                    </div>
                                }
                            // allowClear={{ clearIcon: state.loadingSearch ? <LoadingOutlined /> : <CloseCircleFilled /> }}
                            // onSelect={(id) => hooks.handleOpenModal(+id)}
                            // value={state.textSearch}
                            />
                            {/* <div className="flex gap-2">
                                <Button onClick={hooks.handleSearchBtn} className="w-max" size="large" icon={<SearchOutlined />}>Tìm kiếm</Button>
                                <Button className="w-max" size="large" icon={<UndoOutlined />}
                                onClick={hooks.refreshPage}
                                >Làm mới</Button>
                            </div> */}
                        </Col>
                        <Col span={9}>
                            <Button
                                size="large"
                                type='primary'
                                icon={<PlusOutlined />}
                                onClick={hooks.handleShowModalOpenTable}
                            >
                                Gộp bàn
                            </Button>
                        </Col>
                        {
                            !!state.data.length && state.data.map((item: any) => (
                                <Col key={item.id}>
                                    <Card
                                        className={`border ${item.reservation_status == EStatusTable.OPEN ? 'border-sky-600 bg-sky-100' : 'border-ghost'} cursor-pointer`}
                                        onClick={() => hooks.openModalTable(item.id, item.reservation_status)}
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
                                            {/* {
                                                item.reservation_status == EStatusTable.OPEN && (
                                                    <div className="flex gap-4 justify-between">
                                                        <span>2h20</span>
                                                        <span>1.000.000d</span>
                                                    </div>
                                                )
                                            } */}
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
                        <Col span={24}>
                            <Pagination defaultCurrent={state.pageIndex} total={state.total} align="end" onChange={hooks.handlePageChange} />
                        </Col>
                    </Row>
                </Splitter.Panel>
                {
                    state.showManageOrder && (
                        <Splitter.Panel collapsible resizable={false} size={hooks.size} style={{
                            overflowY: 'auto',
                            overflowX: 'hidden'
                        }}>
                            <Row gutter={[16, 16]} className="px-6 pb-6 pt-4" align={"middle"} justify={"space-between"} >
                                <Col span={24} className="flex gap-2 max-sm:flex-col">
                                    <AutoComplete
                                        size="large"
                                        options={[]}
                                        className="max-sm:w-full md:w-[400px] flex-1"
                                        // onSearch={hooks.handleChangeTextSearch}
                                        placeholder={
                                            <div className="flex items-center gap-1 cursor-pointer h-max">
                                                <SearchOutlined className="text-lg text-ghost" />
                                                <span className="text-ghost text-[14px]">Tìm sản phẩm</span>
                                            </div>
                                        }
                                    // allowClear={{ clearIcon: state.loadingSearch ? <LoadingOutlined /> : <CloseCircleFilled /> }}
                                    // onSelect={(id) => hooks.handleToEdit(+id)}
                                    // value={state.textSearch}
                                    />
                                    <div className="flex gap-2">
                                        {/* <Button onClick={hooks.handleSearchBtn} className="w-max" size="large" icon={<SearchOutlined />}>Tìm kiếm</Button> */}
                                        <Button className="w-max" size="large" icon={<UndoOutlined />}
                                        //  onClick={hooks.refreshPage}
                                        >Làm mới</Button>
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <TreeSelect
                                        allowClear
                                        multiple
                                        loading={true}
                                        style={{ width: '100%' }}
                                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                        placeholder="Chọn danh mục cần lọc"
                                        treeData={[]}
                                    />
                                </Col>
                            </Row>
                            <List
                                className="px-4"
                            >
                                <VirtualList
                                    data={state.pros}
                                    height={420}
                                    itemHeight={80}
                                    itemKey="id"
                                    onScroll={hooks.handleScroll}
                                >
                                    {(item: any) => (
                                        <List.Item key={item.id}>
                                            <List.Item.Meta
                                                avatar={<Avatar className="w-[60px] h-[60px]" src={item.image ? getImageUrl(item.image) : fallBackImg} />}
                                                title={<span className="line-clamp-1">{item?.name} <Tag className="ml-2">{item.size.name}</Tag></span>}
                                                description={<span className="line-clamp-2 mr-4 text-xs">{convertPriceVND(+item.sale || +item.price)}</span>}
                                            />
                                            <Button onClick={hooks.handleAddPro(item)} type="text" className="text-sky-400" icon={<PlusOutlined />} />
                                        </List.Item>
                                    )}
                                </VirtualList>
                            </List>
                        </Splitter.Panel>
                    )
                }
            </Splitter>
        </div>
        {
            state.showModalAdd && <TableAddModal onRefresh={hooks.handleRefreshPage} onClose={hooks.handleCloseModal} />
        }
        {
            state.showModalOpenTable && <ModalOpenTable
                onCancel={hooks.handleCloseModal}
                onConfirm={hooks.handleOpenManyTable}
            />
        }
    </>
}