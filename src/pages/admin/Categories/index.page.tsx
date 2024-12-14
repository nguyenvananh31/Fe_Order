import { CloseCircleFilled, EditOutlined, LoadingOutlined, PlusOutlined, QuestionCircleOutlined, SearchOutlined, UndoOutlined, ZoomInOutlined } from "@ant-design/icons";
import { AutoComplete, Breadcrumb, Button, Col, Divider, Image, Popconfirm, Row, Select, Space, Tooltip } from "antd";
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
    }, [state.pageIndex, state.pageSize, hooks.handleOpenModal]);

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
                        title: <div className="font-bold">Danh mục</div>,
                    },
                ]}
            />
            <div className='bg-primary drop-shadow-primary rounded-primary'>
                <div className="pl-6 pt-4 text-lg font-semibold">Bộ lọc tìm kiếm</div>
                <Row gutter={[16, 16]} className="px-6 pt-4" align={"middle"} >
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
                            options={[{ value: true, label: 'Từ trên xuống' }, { value: false, label: 'Từ dưới lên' }]}
                            placeholder="Kiểu sắp xếp"
                            onClear={hooks.refreshPage}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Select
                            size="large"
                            className="w-full"
                            allowClear
                            options={[{ value: true, label: 'Danh mục' }, { value: false, label: 'Tên sản phẩm' }, { value: false, label: 'Số lượng' }]}
                            placeholder="Lọc theo cột"
                            onClear={hooks.refreshPage}
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
                            Thêm danh mục
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
                    scroll={{x: 'max-content'}}
                />
            </div>
            {
                state.showModal &&
                <CateModel showToast={hooks.showToast} onClose={hooks.handleDismissModal} onRefresh={hooks.refreshPage} itemId={state.selectedItemId} />
            }
        </>
    )
}