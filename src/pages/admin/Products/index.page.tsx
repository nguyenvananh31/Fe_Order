import { CloseCircleFilled, EditOutlined, LoadingOutlined, PlusOutlined, QuestionCircleOutlined, SearchOutlined, UndoOutlined, ZoomInOutlined } from "@ant-design/icons";
import { AutoComplete, Breadcrumb, Button, Col, DatePicker, Divider, Image, Popconfirm, Row, Select, Space, Tooltip } from "antd";
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
            <div className="pl-6 pt-4 text-lg font-semibold">Bộ lọc tìm kiếm</div>
            <Row gutter={[16, 16]} className="px-6 pt-4" align={"middle"} justify={"space-between"} >
                <Col xs={24} sm={12} md={6}>
                    <Select
                        size="large"
                        className="w-full"
                        allowClear
                        options={[{ value: 1, label: 'Hiển thị' }, { value: 0, label: 'Ẩn' }]}
                        placeholder="Trạng thái"
                        onSelect={(value) => hooks.handleFilterStatus(value)}
                        onClear={hooks.refreshPage}
                    />
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Select
                        size="large"
                        className="w-full"
                        allowClear
                        options={[{ value: 'asc', label: 'Từ trên xuống' }, { value: 'desc', label: 'Từ dưới lên' }]}
                        placeholder="Kiểu sắp xếp"
                        onClear={hooks.refreshPage}
                        onSelect={(value) => hooks.handSortOrderBy(value)}
                    />
                </Col>
                <Col xs={24} sm={12} md={6}>
                <Select
                        size="large"
                        className="w-full"
                        allowClear
                        options={[{ value: 'name', label: 'Tên sản phẩm' },{ value: 'category_id', label: 'Danh mục' }, { value: false, label: 'Tên sản phẩm' }]}
                        placeholder="Lọc theo cột"
                        onClear={hooks.refreshPage}
                        onSelect={(value) => hooks.handSortOrderBy(undefined,value)}
                    />
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <DatePicker.RangePicker
                        size="large"
                        onChange={hooks.handleFilterDate}
                    />
                </Col>
            </Row>
            <Divider />
            <Row gutter={[16, 16]} className="px-6 pb-6" align={"middle"} justify={"space-between"} >
                <Col xs={24} sm={24} md={24} lg={15} className="flex gap-2 max-sm:flex-col">
                    <AutoComplete
                        size="large"
                        options={hooks.options}
                        className="max-sm:w-full md:w-[400px] flex-1"
                        onSearch={hooks.handleChangeTextSearch}
                        placeholder={
                            <div className="flex items-center gap-1 cursor-pointer h-max">
                                <SearchOutlined className="text-lg text-ghost" />
                                <span className="text-ghost text-[14px]">Tìm sản phẩm</span>
                            </div>
                        }
                        allowClear={{ clearIcon: state.loadingSearch ? <LoadingOutlined /> : <CloseCircleFilled /> }}
                        onSelect={(id) => hooks.handleToEdit(+id)}
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
                        onClick={() => hooks.handleToAdd()}
                    >
                        Thêm sản phẩm
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