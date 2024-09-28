import { CloseCircleFilled, DeleteOutlined, EditOutlined, LoadingOutlined, PlusOutlined, QuestionCircleOutlined, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { AutoComplete, Breadcrumb, Button, Col, Popconfirm, Row, Tooltip } from "antd";
import Table, { ColumnProps } from "antd/es/table";
import { useMemo } from "react";
import { Isize } from "../../../interFaces/size";
import SizeModel from "./components/SizeModal";
import useSize from "./utils/size.hook";


export default function SizePage() {

    const { state, ...hooks } = useSize();

    const columns = useMemo(() => {
        const tblColumns: ColumnProps<Isize>[] = [
            {
                title: 'STT',
                dataIndex: 'stt',
                width: 100,
                align: 'center',
                fixed: 'left',
                render: (_: any, __: Isize, index: number) => {
                    return (
                        <span>
                            {Number(state.pageIndex) > 1 ? (Number(state.pageIndex) - 1) * state.pageSize + (index + 1) : index + 1}
                        </span>
                    );
                },
            },
            {
                title: 'Tên kích thước',
                dataIndex: 'name',
                key: 'name',
                render: (_: any, item: Isize) => {
                    return (
                        <div onClick={() => { hooks.handleOpenModal(item.id) }} className='text-purple font-semibold cursor-pointer'>
                            {item.name}
                        </div>
                    )
                }
            },
            {
                title: 'Trạng thái',
                dataIndex: 'status',
                align: 'center',
                width: '15%',
                render: (_: any, size: Isize) => (
                    <Tooltip title="Thay đổi trạng thái">
                        <Popconfirm
                            placement='topRight'
                            title={`${!size.status ? 'Hiển thị' : 'Ẩn'} kích thước`}
                            description={`Bạn có muốn ${!size.status ? 'hiển thị' : 'ẩn'} kích thước này?`}
                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            okText="Có"
                            cancelText="Không"
                            onConfirm={() => hooks.handleChangeStatus(size.id)}
                        >
                            <Button loading={state.loadingSubmit} danger={!size.status} className={`${!!size.status && 'border-green-600 text-green-600'} min-w-[80px]`}>
                                {!!size.status ? "Hiển thị" : 'Ẩn'}
                            </Button>
                        </Popconfirm>
                    </Tooltip>
                )
            },
            {
                title: 'Hành động',
                dataIndex: 'action',
                align: 'center',
                width: '15%',
                fixed: 'right',
                render: (_: any, { id }: any) => (
                    <>
                        <Tooltip title="Chi tiết và cập nhập">
                            <Button onClick={() => hooks.handleOpenModal(id)} className='ml-2 text-yellow-500 border-yellow-500' icon={<EditOutlined />}></Button>
                        </Tooltip>
                        <Tooltip title="Xoá kích thước">
                            <Popconfirm
                                placement='topRight'
                                title="Xoá kích thước"
                                description="Bạn có muốn xoá kích thước này?"
                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                okText="Có"
                                cancelText="Không"
                                onConfirm={() => hooks.handleDeleteCate(id)}
                            >
                                <Button className='ml-2' danger icon={<DeleteOutlined />}></Button>
                            </Popconfirm>
                        </Tooltip>
                    </>
                )
            },
        ];

        return tblColumns;
    }, [state.pageIndex, state.pageSize, hooks.handleOpenModal])

    return (
        <>
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
                        title: <h1 className="font-bold">Kích thước</h1>,
                    },
                ]}
            />
            <div className='bg-primary drop-shadow-primary rounded-primary'>
                <Row gutter={[16, 16]} className="px-6 py-6" align={"middle"} justify={"space-between"} >
                    <Col xs={24} sm={24} md={24} lg={15} className="flex gap-2 max-sm:flex-col">
                        <AutoComplete
                            size="large"
                            options={hooks.options}
                            className="max-sm:w-full md:w-[400px] flex-1"
                            onSearch={hooks.handleChangeTextSearch}
                            placeholder={
                                <div className="flex items-center gap-1 cursor-pointer h-max">
                                    <SearchOutlined className="text-lg text-ghost" />
                                    <span className="text-ghost text-[14px]">Tìm kích thước</span>
                                </div>
                            }
                            allowClear={{ clearIcon: state.loadingSearch ? <LoadingOutlined /> : <CloseCircleFilled /> }}
                            onSelect={(id) => hooks.handleOpenModal(+id)}
                            value={state.textSearch}
                        />
                        <div className="flex gap-2">
                            <Button onClick={hooks.handleSearchBtn} className="w-max" size="large" icon={<SearchOutlined />}>Tìm kiếm</Button>
                            <Button className="w-max" size="large" icon={<UndoOutlined />} onClick={hooks.refreshPage}>Làm mới</Button>
                        </div>
                    </Col>
                    <Col>
                        <Button
                            size="large"
                            type='primary'
                            icon={<PlusOutlined />}
                            onClick={() => hooks.handleOpenModal()}
                        >
                            Thêm kích thước
                        </Button>
                    </Col>
                </Row>
                <Table
                    loading={state.loading}
                    dataSource={state.data}
                    columns={columns}
                    rowKey="id"
                    pagination={{
                        pageSize: state.pageSize,
                        showSizeChanger: true,
                        pageSizeOptions: ['5', '10', '20', '50'], // Các tùy chọn số lượng bản ghi
                        total: state.total,
                        current: state.pageIndex,
                        style: {
                            paddingRight: "24px",
                        },
                        onChange(page, pageSize) {
                            hooks.handlePageChange(page, pageSize);
                        },
                    }}
                />
            </div>

            {
                state.showModal &&
                <SizeModel showToast={hooks.showToast} onClose={hooks.handleDismissModal} onRefresh={hooks.refreshPage} itemId={state.selectedItemId} />
            }
        </>
    )
}