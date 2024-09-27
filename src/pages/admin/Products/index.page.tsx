import { EditOutlined, PlusOutlined, QuestionCircleOutlined, ZoomInOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Image, Popconfirm, Space, Tooltip } from "antd";
import { ColumnProps } from "antd/es/table";
import { Table } from "antd/lib";
import { useMemo } from "react";
import { fallBackImg, getImageUrl } from "../../../constants/common";
import { IProduct } from "../../../interFaces/product";
import useProduct from "./utils/product.hooks";

export default function ProductPage() {

    const { state, ...hooks } = useProduct();

    const columns = useMemo(() => {
        const tblColumns: ColumnProps<IProduct>[] = [
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
                title: 'Tên sản phẩm',
                dataIndex: 'name',
                key: 'name',
                render: (_: any, item: any) => {
                    return (
                        <div className={`text-purple font-semibold cursor-pointer`}>
                            {item.name}
                        </div>
                    )
                }
            },
            {
                title: 'Số lượng',
                dataIndex: 'sl',
                align: 'center',
                render: (_: any, { product_details }: any) => {
                    return (
                        <Tooltip title="Số lượng biến thể">
                            <span>{product_details ? product_details.length : 0}</span>
                        </Tooltip>
                    )
                }
            },
            {
                title: 'Hình ảnh',
                dataIndex: 'image',
                width: 'auto',
                align: 'center',
                render: (_: any, item: any) => {
                    return (
                        <Image
                            style={{ objectFit: 'cover', width: '120px', height: '80px', borderRadius: "5px" }}
                            src={item.thumbnail ? getImageUrl(item.thumbnail) : fallBackImg}
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
                title: 'Danh mục',
                dataIndex: 'cate',
                align: 'center',
                render: (_: any, { category: { name } }: any) => {
                    return (
                        <span>{name}</span>
                    )
                }
            },
            {
                title: 'Trạng thái',
                dataIndex: 'status',
                align: 'center',
                width: '15%',
                render: (_: any, item: any) => (
                    <Tooltip title="Thay đổi trạng thái">
                        <Popconfirm
                            placement='topRight'
                            title={`${!item.status ? 'Hiển thị' : 'Ẩn'} sản phẩm`}
                            description={`Bạn có muốn ${!item.status ? 'hiển thị' : 'ẩn'} sản phẩm này?`}
                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            okText="Có"
                            cancelText="Không"
                            onConfirm={() => hooks.handleChangeStatus(item.id)}
                        >
                            <Button loading={state.loadingSubmit} danger={!item.status} className={`${!!item.status && 'border-green-600 text-green-600'} min-w-[80px]`}>
                                {!!item.status ? "Hiển thị" : 'Ẩn'}
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
                            <Button onClick={() => hooks.handleToEdit(id)} className='ml-2 text-yellow-500 border-yellow-500' icon={<EditOutlined />}></Button>
                        </Tooltip>
                        {/* <Tooltip title="Xoá">
                            <Popconfirm
                                placement='topRight'
                                title={`Xoá sản phẩm`}
                                description={`Bạn có muốn xoá sản phẩm này?`}
                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                okText="Có"
                                cancelText="Không"
                                onConfirm={() => hooks.handleDelePro(id)}
                            >
                                <Button className='ml-2' danger icon={<DeleteOutlined />}></Button>
                            </Popconfirm>
                        </Tooltip> */}
                    </>
                )
            },
        ];
        return tblColumns;
    }, [state.pageIndex, state.pageSize])

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
                    title: <h1 className="font-bold">Sản phẩm</h1>,
                },
            ]}
        />
        <div className='bg-primary drop-shadow-primary rounded-primary'>
            <div className='flex items-center justify-between'>
                <h1 className='p-6 text-xl font-semibold'>Sản phẩm</h1>
                <Button
                    type='primary'
                    icon={<PlusOutlined />}
                    className='mx-6'
                    onClick={() => hooks.handleToAdd()}
                >
                    Thêm sản phẩm
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
                    pageSizeOptions: ['5', '10', '20', '50'],
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
    </>
}