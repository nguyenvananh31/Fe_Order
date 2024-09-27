import { DeleteOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Popconfirm, Tooltip } from "antd";
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
                <div className='flex items-center justify-between'>
                    <h1 className='p-6 text-xl font-semibold'>Kích thước</h1>
                    <Button
                        type='primary'
                        icon={<PlusOutlined />}
                        className='mx-6'
                        onClick={() => hooks.handleOpenModal()}
                    >
                        Thêm kích thước
                    </Button>
                </div>
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