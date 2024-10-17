import React, { useState } from "react";
import { Table, Button, Typography, Card, Modal, message } from "antd";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../../../../configs/Axios/AxiosConfig";

const { Title, Text } = Typography;

const statusBill: any = {
  pending: { color: "magenta", title: "Đang chờ" },
  awaitingApproval: { color: "orange", title: "Chờ duyệt" },
  confirmed: { color: "cyan", title: "Đã xác nhận" },
  preparing: { color: "gold", title: "Chuẩn bị" },
  shipping: { color: "purple", title: "Đang giao" },
  completed: { color: "green", title: "Đã hoàn thành" },
  cancelled: { color: "red", title: "Đã huỷ" },
  failed: { color: "volcano", title: "Thất bại" },
};

const Bill: React.FC = () => {
  const queryClient = useQueryClient();
  const [isLoadingCancel, setIsLoadingCancel] = useState(false); // Trạng thái tải cho việc hủy đơn hàng

  const { data, isLoading, error } = useQuery({
    queryKey: ["bill"],
    queryFn: async () => {
      try {
        const res = await instance.get(`/client/bill_user`);
        return res.data.data;
      } catch (error) {
        console.error("Error", error);
        return null;
      }
    },
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [productDetails, setProductDetails] = useState<any[]>([]);

  // Hàm để gọi API lấy chi tiết sản phẩm
  const fetchProductDetails = async (orderId: number) => {
    try {
      const res = await instance.get(`admin/billsDetail/${orderId}`);
      setProductDetails(res.data.data);
    } catch (error) {
      console.error("Error fetching product details", error);
    }
  };

  // Hàm xử lý yêu cầu hủy đơn hàng (chuyển trạng thái sang "Chờ duyệt")
  const handleCancelOrder = async (orderId: number) => {
    try {
      setIsLoadingCancel(true); // Bắt đầu trạng thái tải
      await instance.put(`/client/bills/${orderId}/cancel`, {
        status: 'awaitingApproval', // Chuyển trạng thái sang "Chờ duyệt"
      });
      message.success("Yêu cầu hủy đơn hàng đang chờ duyệt!");

      // Làm mới lại danh sách đơn hàng sau khi yêu cầu hủy thành công
      queryClient.invalidateQueries(["bill"]);
    } catch (error) {
      console.error("Error sending cancellation request", error);
      message.error("Có lỗi xảy ra khi gửi yêu cầu hủy đơn hàng!");
    } finally {
      setIsLoadingCancel(false); // Kết thúc trạng thái tải
    }
  };

  // Khi nhấn "Xem chi tiết"
  const handleViewDetail = async (order: any) => {
    setSelectedOrder(order);
    await fetchProductDetails(order.id);
    setIsModalVisible(true);
  };

  // Đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Các cột trong bảng đơn hàng
  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Mã bill",
      dataIndex: "ma_bill",
      key: "ma_bill",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ngày đặt",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (total: number) => `${total}₫`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span style={{ color: statusBill[status]?.color }}>
          {statusBill[status]?.title}
        </span>
      ),
    },
    {
      title: "Thanh toán",
      dataIndex: "payment",
      key: "payment",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (text: any, record: any) => (
        <>
          <Button
            type="primary"
            onClick={() => handleViewDetail(record)}
            style={{ marginRight: "8px" }}
          >
            Xem chi tiết
          </Button>
          <Button
          className="bg-red-400 text-white hover:bg-red-600"
            onClick={() => handleCancelOrder(record.id)}
            disabled={
              record.status === "awaitingApproval" || // Vô hiệu hóa nếu đang chờ duyệt
              record.status === "cancelled" ||
              record.status === "completed" ||
              isLoadingCancel // Vô hiệu hóa nút khi đang xử lý
            }
          >
            {isLoadingCancel ? "Đang xử lý..." : "Hủy"}
          </Button>
        </>
      ),
    },
  ];

  const productColumns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text: any, record: any, index: number) => index + 1,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Kích thước",
      dataIndex: "size",
      key: "size",
      width: 100,
    },
    {
      title: "Hình ảnh",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (thumbnail: string) => (
        <img
          src={thumbnail}
          alt="product"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ),
      width: 100,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: 100,
    },
    {
      title: "Tổng",
      dataIndex: "total",
      key: "total",
      render: (total: number) => `${total}₫`,
      width: 100,
    },
  ];

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <p>Có lỗi xảy ra khi lấy dữ liệu</p>;

  const orders = data.map((order: any) => ({
    id: order.id,
    ma_bill: order.ma_bill || "Chưa có",
    name: order.khachhang || "Chưa có",
    date: order.order_date || "Chưa có",
    total: order.total_amount || "0",
    status: order.status,
    payment: order.payment || "Chưa có",
  }));

  return (
    <Card
      title="Chi tiết đơn hàng"
      style={{
        width: "1200px",
        margin: "20px auto",
        padding: "20px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="border-t rounded-[6px] text-gray-800 text-sm leading-[21px] p-5 bg-white">
        <h3 className="text-lg font-bold mb-4">Danh sách đơn hàng</h3>
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="id"
          pagination={false}
          locale={{ emptyText: "Không có đơn hàng" }}
        />
      </div>

      <Modal
        title="Chi tiết đơn hàng"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Thoát
          </Button>,
        ]}
        width={800}
      >
        {selectedOrder && (
          <>
            <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", width: "100%" }}>
                <div style={{ flex: 1 }}>
                  <Text strong>Mã đơn hàng:</Text> #{selectedOrder.ma_bill}
                </div>
                <div style={{ flex: 1 }}>
                  <Text strong>Cách thức:</Text> {selectedOrder.order_type}
                </div>
              </div>
              <div style={{ display: "flex", width: "100%" }}>
                <div style={{ flex: 1 }}>
                  <Text strong>Tên khách hàng:</Text> {selectedOrder.name}
                </div>
                <div style={{ flex: 1 }}>
                  <Text strong>Trạng thái:</Text>
                  <span style={{ color: statusBill[selectedOrder.status]?.color }}>
                    {statusBill[selectedOrder.status]?.title}
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", width: "100%" }}>
                <div style={{ flex: 1 }}>
                  <Text strong>Địa chỉ:</Text> {selectedOrder.address || "Chưa có"}
                </div>
                <div style={{ flex: 1 }}>
                  <Text strong>Thanh toán:</Text> {selectedOrder.payment}
                </div>
              </div>
              <div style={{ display: "flex", width: "100%" }}>
                <div style={{ flex: 1 }}>
                  <Text strong>Ngày đặt:</Text> {selectedOrder.date}
                </div>
                <div style={{ flex: 1 }}>
                  <Text strong>Tổng tiền:</Text> {selectedOrder.total}₫
                </div>
              </div>
            </div>

            <Title level={5}>Danh sách sản phẩm</Title>
            <Table
              columns={productColumns}
              dataSource={productDetails}
              pagination={false}
              rowKey="id"
              scroll={{ x: true }}
            />
          </>
        )}
      </Modal>
    </Card>
  );
};

export default Bill;
