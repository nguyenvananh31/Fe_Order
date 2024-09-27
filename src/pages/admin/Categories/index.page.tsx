import { EditOutlined, PlusOutlined, QuestionCircleOutlined, ZoomInOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Image, Popconfirm, Space, Tooltip } from "antd";
import Table, { ColumnProps } from "antd/es/table";
import { useMemo } from "react";
import { getImageUrl } from "../../../constants/common";
import { ICate } from "../../../interFaces/categories";
import CateModel from "./components/CateModal";
import useCate from "./utils/cate.hooks";


export default function CatePage() {

    const { state, ...hooks } = useCate();

    const columns = useMemo(() => {
        const tblColumns: ColumnProps<ICate>[] = [
            {
                title: 'STT',
                dataIndex: 'stt',
                render: (_: any, __: any, index: number) => {
                    return <span>
                        {Number(state.pageIndex) > 1 ? (Number(state.pageIndex) - 1) * state.pageSize + (index + 1) : index + 1}
                    </span>
                }
            },
            {
                title: 'Tên danh mục',
                dataIndex: 'name',
                key: 'name',
                render: (_: any, cate: ICate) => {
                    return (
                        <div onClick={() => { hooks.handleOpenModal(cate.id) }} className={`text-purple font-semibold cursor-pointer`}>
                            {cate.name}
                        </div>
                    )
                }
            },
            {
                title: 'Ảnh',
                dataIndex: 'image',
                width: 'auto',
                align: 'center',
                render: (_: any, item: ICate) => {
                    return (
                        <Image
                            style={{ objectFit: 'cover', width: '120px', height: '80px', borderRadius: "5px" }}
                            src={item.image ? getImageUrl(item.image) : ''}
                            preview={{
                                mask: (
                                    <Space direction="vertical" align="center">
                                        <ZoomInOutlined />
                                    </Space>
                                ),
                            }}
                        />
                    );
                },
            },
            {
                title: 'Trạng thái',
                dataIndex: 'status',
                align: 'center',
                width: '15%',
                render: (_: any, cate: ICate) => (
                    <Tooltip title="Thay đổi trạng thái">
                        <Popconfirm
                            placement='topRight'
                            title={`${!cate.status ? 'Hiển thị' : 'Ẩn'} danh mục`}
                            description={`Bạn có muốn ${!cate.status ? 'hiển thị' : 'ẩn'} danh mục này?`}
                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            okText="Có"
                            cancelText="Không"
                            onConfirm={() => hooks.handleChangeStatus(cate.id, cate.status)}
                        >
                            <Button loading={state.loadingSubmit} danger={!cate.status} className={`${!!cate.status && 'border-green-600 text-green-600'} min-w-[80px]`}>
                                {!!cate.status ? "Hiển thị" : 'Ẩn'}
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
                    <Tooltip title="Chi tiết và cập nhập">
                        <Button onClick={() => hooks.handleOpenModal(id)} className='ml-2 text-yellow-500 border-yellow-500' icon={<EditOutlined />}></Button>
                    </Tooltip>
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
                        title: <h1 className="font-bold">Danh mục</h1>,
                    },
                ]}
            />
            <div className='bg-primary drop-shadow-primary rounded-primary'>
                <div className='flex items-center justify-between'>
                    <h1 className='p-6 text-xl font-semibold'>Danh mục</h1>
                    <Button
                        type='primary'
                        icon={<PlusOutlined />}
                        className='mx-6'
                        onClick={() => hooks.handleOpenModal()}
                    >
                        Tạo danh mục
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
                <CateModel showToast={hooks.showToast} onClose={hooks.handleDismissModal} onRefresh={hooks.refreshPage} itemId={state.selectedItemId}/>
            }
        </>
    )
}