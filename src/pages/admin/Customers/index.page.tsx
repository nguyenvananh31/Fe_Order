import { CloseCircleFilled, LoadingOutlined, PlusOutlined, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { AutoComplete, Breadcrumb, Button, Col, Row } from "antd";
import Table, { ColumnProps } from "antd/es/table";
import { useMemo } from "react";
import { Icustomer } from "../../../interFaces/custommers";
import CustomerModel from "./components/CustomerModal";
import useCustomer from "./util/customer.hook";


export default function CatePage() {

    const { state, ...hooks } = useCustomer();

    const columns = useMemo(() => {
        const tblColumns: ColumnProps<Icustomer>[] = [
            {
                title: 'STT',
                dataIndex: 'stt',
                width: 100,
                align: 'center',
                fixed: 'left',
                render: (_: any, __: Icustomer, index: number) => {
                    return (
                        <span>
                            {Number(state.pageIndex) > 1 ? (Number(state.pageIndex) - 1) * state.pageSize + (index + 1) : index + 1}
                        </span>
                    );
                },
            },
            {
                title: 'Họ và tên',
                dataIndex: 'name',
                key: 'name',
                sorter: true,
                showSorterTooltip: {title: 'Sắp xếp theo tên'},
                render: (_: any, custoner: Icustomer) => {
                    return (
                        <div
                            // onClick={() => { hooks.handleOpenModal(custoner.id) }}
                            className={`text-purple font-semibold cursor-pointer`}>
                            {custoner.name}
                        </div>
                    )
                }
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                sorter: true,
                showSorterTooltip: {title: 'Sắp xếp theo email'},
                render: (_: any, customer: Icustomer) => {
                    return (
                        <div className={`font-semibold cursor-pointer`}>
                            {customer.email}
                        </div>
                    )
                }
            },
            {
                title: 'Số điện thoại',
                dataIndex: 'phone',
                key: 'phone',
                render: (_: any, customer: Icustomer) => {
                    return (
                        <div className={`font-semibold cursor-pointer`}>
                            {customer.phone_number}
                        </div>
                    )
                }
            },
            {
                title: 'Điểm thưởng',
                dataIndex: 'point',
                key: 'point',
                sorter: true,
                showSorterTooltip: {title: 'Sắp xếp theo điểm thưởng'},
                render: (_: any, customer: Icustomer) => {
                    return (
                        <div className={`font-semibold cursor-pointer`}>
                            {customer.diemthuong}
                        </div>
                    )
                }
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
                        title: <div className="font-bold">Khách hàng</div>,
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
                                    <span className="text-ghost text-[14px]">Tìm tên hoặc email</span>
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
                            Thêm khách hàng
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
                    onChange={hooks.handleTableChange}
                    scroll={{x: 'max-content'}}
                />
            </div>

            {
                state.showModal &&
                <CustomerModel showToast={hooks.showToast} onClose={hooks.handleDismissModal} onRefresh={hooks.refreshPage} itemId={state.selectedItemId} />
            }
        </>
    )
}