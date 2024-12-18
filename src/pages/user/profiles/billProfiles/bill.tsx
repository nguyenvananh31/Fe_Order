import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Flex, Tag, Tooltip } from "antd";
import { ColumnProps } from "antd/es/table";
import { Table } from "antd/lib";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { EOrderType, PAGINATE_DEFAULT } from "../../../../constants/enum";
import { IBill } from "../../../../interFaces/bill";
import ApiUtils from "../../../../utils/api/api.utils";
import { convertPriceVND } from "../../../../utils/common";
import useToast from "../../../../hooks/useToast";
import BillModel from "../../../admin/Bill/components/BillModal";


const statusBill: any = {
  'pending': { color: 'magenta', title: 'Đang chờ' },
  'confirmed': { color: 'cyan', title: 'Đã xác nhận' },
  'preparing': { color: 'gold', title: 'Chuẩn bị' },
  'shipping': { color: 'purple', title: 'Đang giao' },
  'completed': { color: 'green', title: 'Đã hoàn thành' },
  'cancelled': { color: 'red', title: 'Đã huỷ' },
  'failed': { color: 'volcano', title: 'Thất bại' },
  'cancellation_requested': { color: 'yellow', title: 'Chờ xác nhận hủy' },
  'cancellation_approved': { color: 'volcano', title: 'Xác nhận hủy' },
  'cancellation_rejected': { color: 'volcano', title: 'Hủy thất bại' },
};

const statusPayment: any = {
  pending: { color: "magenta", title: "Đang chờ" },
  paid: { color: "cyan", title: "Thanh toán khi nhận hàng" },
  successful: { color: "green", title: "Đã thanh toán" },
  failed: { color: "red", title: "Thanh toán thất bại" },
  refunded: { color: "volcano", title: "Hoàn trả tiền" },
}

interface IState {
  loadingSubmit: boolean;
  loading: boolean;
  loadingPro: boolean;
  data: IBill[];
  pageSize: number;
  pageIndex: number;
  total: number;
  showModal: boolean;
  selectedItemId?: number;
  selectedStatus?: string;
  refresh: boolean;
  bill?: IBill;
}

const initState: IState = {
  loadingSubmit: false,
  loading: true,
  loadingPro: false,
  data: [],
  pageSize: PAGINATE_DEFAULT.LIMIT,
  pageIndex: 1,
  total: 0,
  showModal: false,
  refresh: false,
}

const Bill: React.FC = () => {

  const [state, setState] = useState<IState>(initState);
  const toast = useToast();

  //Lấy bill
  useEffect(() => {
    //Lấy tất cả tài khoản
    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true }));
        const conds: any = { page: state.pageIndex, per_page: state.pageSize };
        const res = await apiGetBillDetail(conds);
        setState(prev => ({ ...prev, data: res.data, loading: false, total: res?.total_bills }));
      } catch (error: any) {
        console.log(error);
        setState((prev) => ({ ...prev, data: [], loading: false, total: 0 }));
      }
    }
    fetchData();
  }, [state.refresh]);

  const apiGetBillDetail = useCallback(async (params?: any) => {
    return await ApiUtils.fetch<any, any>(`/api/client/bill_user`, params);
  }, []);

  const handleCancelOrder = useCallback(async (orderId: number) => {
    try {
      const res: any = await ApiUtils.put(`/api/client/bills/${orderId}/cancel`);
      toast.showSuccess(res?.message || 'Huỷ đã thành công!');
      setState(prev => ({ ...prev, refresh: !prev.refresh }));
    } catch (error) {
      console.error("Error sending cancellation request", error);
      toast.showError(error as any);
    }
  }, []);

  // Chuyển trang và phân trang
  const handlePageChange = (page: any, pageSize: any) => {
    setState(prev => ({ ...prev, pageIndex: page, pageSize, refresh: !prev.refresh }));
  };

  // Dismis Modal
  const handleDismissModal = useCallback(() => {
    setState((prev) => ({
      ...prev,
      showModal: false,
      selectedItemId: undefined,
    }));
  }, []);

  // làm mới data
  const refreshPage = useCallback(() => {
    setState((prev) => ({ ...initState, refresh: !prev.refresh }));
  }, []);

  // Hiển thị model
  const handleOpenModal = useCallback((item?: IBill) => {
    setState(prev => ({
      ...prev,
      showModal: true,
      selectedItemId: item?.id || 0,
      bill: item
    }))
  }, []);

  const columns = useMemo(() => {
    const tblColumns: ColumnProps<IBill>[] = [
      {
        title: 'STT',
        dataIndex: 'stt',
        width: 100,
        align: 'center',
        fixed: 'left',
        render: (_: any, __: any, index: number) => {
          return (
            <span>
              {Number(state.pageIndex) > 1 ? (Number(state.pageIndex) - 1) * state.pageSize + (index + 1) : index + 1}
            </span>
          );
        },
      },
      {
        title: 'Mã đơn hàng',
        dataIndex: 'ma_bill',
        key: 'ma_bill',
        align: 'center',
        render: (_: any, item: IBill) => {
          return <span>
            {item.ma_bill}
          </span>
        }
      },
      // {
      //   title: 'Tên chi nhánh',
      //   dataIndex: 'branch_address',
      //   key: 'branch_address',
      //   sorter: true,
      //   showSorterTooltip: { title: 'Sắp xếp theo tên chi nhánh' },
      //   render: (_: any, item: IBill) => {
      //     return (
      //       <div className={`text-purple font-semibold`}>
      //         {item.branch_address || 'Chưa có'}
      //       </div>
      //     )
      //   }
      // },
      // {
      //   title: 'Tên khách hàng',
      //   dataIndex: 'customer_name',
      //   key: 'customer_name',
      //   render: (_: any, item: IBill) => {
      //     return (
      //       <div className={`text-purple font-semibold`}>
      //         {(item.khachhang.name || item.khachhang.email) || 'Không có'}
      //       </div>
      //     )
      //   }
      // },
      {
        title: 'Đặt tại',
        dataIndex: 'order_type',
        align: 'center',
        render: (_: any, item: IBill) => {
          return <span>
            {item.order_type == EOrderType.In_restaurant ? 'Tại nhà hàng' : 'Online'}
          </span>
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
        key: 'total_amount',
        align: 'center',
        render: (_: any, item: IBill) => {
          return <span>
            {convertPriceVND(+item.total_amount)}
          </span>
        }
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        align: 'center',
        width: '15%',
        render: (_: any, item: IBill) => (
          <Tag
            color={statusBill[item.status]?.color} className={`min-w-[80px] text-center`} >
            {statusBill[item.status]?.title}
          </Tag>
        )
      },
      {
        title: 'Trạng thái thanh toán',
        dataIndex: 'payment_status',
        align: 'center',
        width: 'max-content',
        render: (_: any, item: IBill) => (
          <Tag color={statusPayment[item.payment_status]?.color} className={`min-w-[80px] text-center`} >
            {statusPayment[item.payment_status]?.title}
          </Tag>
        )
      },
      {
        title: 'Hành động',
        dataIndex: 'action',
        align: 'center',
        fixed: 'right',
        render: (_: any, item: any) => (
          <Flex>
            <Tooltip title="Xem chi tiết">
              <Button
                onClick={() => handleOpenModal(item)}
                className='ml-2' icon={<EyeOutlined />}></Button>
            </Tooltip>
            <Tooltip title="Huỷ đơn hàng">
              <Button
                onClick={() => handleCancelOrder(item.id)}
                danger className='ml-2' icon={<DeleteOutlined />}></Button>
            </Tooltip>
          </Flex>
        )
      },
    ];
    return tblColumns;
  }, [state.pageIndex, state.pageSize]);

  return (
    <>
      <div className='bg-primary drop-shadow-primary rounded-primary'>
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
              handlePageChange(page, pageSize);
            },
          }}
          scroll={{ x: 'max-content' }}
        />
      </div>
      {
        state.showModal &&
        <BillModel isClient onClose={handleDismissModal} onRefresh={refreshPage} itemId={state.selectedItemId} data={state.bill} />
      }
    </>
  );
};

export default Bill;
