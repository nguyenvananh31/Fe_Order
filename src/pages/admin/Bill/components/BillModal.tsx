import { Button, Col, Modal, Row } from "antd";
import { ColumnProps } from "antd/es/table";
import { useEffect, useMemo, useState } from "react";
import { IBill } from "../../../../interFaces/bill";
import { apiGetOneBillDetail } from "../utils/bill.service";


interface IProps {
    itemId?: number;
    onRefresh: () => void;
    onClose: () => void;
    showToast: (type: string, message: string) => void;
    data?: IBill;
}

interface IState {
    loading: boolean;
    loadingBtn: boolean;
    isEdit: boolean;
    item?: IBill;
}

const initState: IState = {
    loading: true,
    loadingBtn: false,
    isEdit: false,
}

export default function BillModel({ onClose, showToast, itemId = undefined, data }: IProps) {

    const [state, setState] = useState<IState>(initState);

    useEffect(() => {
        console.log(data);
        
        if (!itemId) {
            setState(prev => ({ ...prev, isEdit: true, loading: false }));
            return;
        }
        const fetchApi = async () => {
            try {
                const res = await apiGetOneBillDetail(itemId!);
                if (res.data) {
                    setState(prev => ({ ...prev, loading: false, item: res.data }));
                }
            } catch (error) {
                console.log(error);
                showToast('error', 'Có lỗi xảy ra!');
            }
        }
        fetchApi();
        setState(prev => ({ ...prev, isEdit: true, loading: false }));
    }, []);

    const columns = useMemo(() => {
        const tblColumns: ColumnProps<IBill>[] = [
            {
                title: 'Mã',
                dataIndex: 'stt',
                align: 'center',
                render: (_: any, item: IBill) => {
                    return <span>
                        {item.ma_bill}
                    </span>
                }
            },
            {
                title: 'Tên chi nhánh',
                dataIndex: 'name',
                key: 'name',
                render: (_: any, item: IBill) => {
                    return (
                        <div className={`text-purple font-semibold`}>
                            {item.branch_address}
                        </div>
                    )
                }
            },
            {
                title: 'Ngày đặt',
                dataIndex: 'order_date',
                align: 'center',
                render: (_: any, item: IBill) => {
                    return <span>
                        {item.order_date}
                    </span>
                }
            },
            {
                title: 'Tổng',
                dataIndex: 'total_amount',
                align: 'center',
                render: (_: any, item: IBill) => {
                    return <span>
                        {item.total_amount}
                    </span>
                }
            },
        ];
        return tblColumns;
    }, [])


    return (
        <>
            <Modal
                loading={state.loading}
                open={true}
                onCancel={onClose}
                footer={
                    <Button onClick={onClose}>
                        Thoát
                    </Button>
                }
                centered
                title={
                    <div className="text-primary">
                        Chi tiết đơn
                    </div>
                }
            >
                <Row gutter={20}>
                    <Col span={24}>
                        Thông tin
                    </Col>
                    <Col span={24}>
                        <div className='flex items-center justify-between'>
                            <h1 className='p-6 text-xl font-semibold'>Quản lý đơn</h1>
                        </div>
                        {/* <Table
                            loading={state.loading}
                            dataSource={state.data}
                            columns={columns}
                            rowKey="id"
                            pagination={{
                                pageSize: state.pageSize,
                                showSizeChanger: true,
                                total: state.total,
                                current: state.pageIndex,
                                style: {
                                    paddingRight: "24px",
                                },
                                onChange(page, pageSize) {
                                    hooks.handlePageChange(page, pageSize);
                                },
                            }}
                        /> */}
                    </Col>
                </Row>
            </Modal>
        </>
    )
}