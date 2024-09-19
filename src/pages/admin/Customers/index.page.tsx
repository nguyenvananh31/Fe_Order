import { PlusOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
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
                key: 'name',
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
                key: 'name',
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
                key: 'name',
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
                        title: <h1 className="font-bold">Khách hàng</h1>,
                    },
                ]}
            />
            <div className='bg-primary drop-shadow-primary rounded-primary'>
                <div className='flex items-center justify-between'>
                    <h1 className='p-6 text-xl font-semibold'>Khách hàng</h1>
                    <Button
                        type='primary'
                        icon={<PlusOutlined />}
                        className='mx-6'
                        onClick={() => hooks.handleOpenModal()}
                    >
                        Thêm khách hàng
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
                <CustomerModel showToast={hooks.showToast} onClose={hooks.handleDismissModal} onRefresh={hooks.refreshPage} itemId={state.selectedItemId} />
            }
        </>
    )
}