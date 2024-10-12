import React, { useState } from "react";
import { Table, Button, Typography, Card, Modal } from "antd";
import { useQuery } from "@tanstack/react-query";
import instance from "../../../../configs/Axios/AxiosConfig";

const { Title, Text } = Typography;

const statusBill: any = {
  pending: { color: "magenta", title: "Đang chờ" },
  confirmed: { color: "cyan", title: "Đã xác nhận" },
  preparing: { color: "gold", title: "Chuẩn bị" },
  shipping: { color: "purple", title: "Đang giao" },
  completed: { color: "green", title: "Đã hoàn thành" },
  cancelled: { color: "red", title: "Đã huỷ" },
  failed: { color: "volcano", title: "Thất bại" },
};

const Bill: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["bill"],
    queryFn: async () => {
      try {
        const res = await instance.get(`/admin/bills`);
        return res.data.data; // Điều chỉnh cho đúng với cấu trúc API trả về
      } catch (error) {
        console.error("Error", error);
        return null;
      }
    },
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Kiểm tra xem có lỗi hay đang load dữ liệu
  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <p>Có lỗi xảy ra khi lấy dữ liệu</p>;

  // Mapping dữ liệu từ API vào cấu trúc bảng
  const orders = data.map((order: any) => ({
    id: order.id,
    name: order.khachhang || "Chưa có",
    date: order.order_date || "Chưa có",
    total: order.total_amount || "0",
    status: statusBill[order.status]?.title || "Chưa có",
    payment: order.payment || "Chưa có",
    orderItems: order.orderItems || [], // Sản phẩm trong đơn hàng
  }));

  // Xử lý khi nhấn "Xem chi tiết"
  const handleViewDetail = (order: any) => {
    setSelectedOrder(order); // Lưu lại đơn hàng được chọn
    setIsModalVisible(true); // Hiển thị modal
  };

  // Đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Các cột trong bảng đơn hàng
  const columnss = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
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
        <Button type="primary" onClick={() => handleViewDetail(record)}>
          Xem chi tiết
        </Button>
      ),
    },
  ];

  // Các cột chi tiết sản phẩm trong modal
  const productColumns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `${price}₫`,
    },
    {
      title: "Tổng",
      dataIndex: "total",
      key: "total",
      render: (total: number) => `${total}₫`,
    },
  ];

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
          columns={columnss}
          dataSource={orders} // Sử dụng dữ liệu từ API
          rowKey="id"
          pagination={false}
          locale={{ emptyText: "Không có đơn hàng" }}
        />
      </div>

      {/* Modal chi tiết đơn hàng */}
      <Modal
        title="Chi tiết đơn hàng"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Đóng
          </Button>,
        ]}
      >
        {selectedOrder ? (
          <>
            <div style={{ marginBottom: "20px" }}>
              <Text strong>Mã đơn hàng:</Text> {selectedOrder.id}
            </div>
            <div style={{ marginBottom: "20px" }}>
              <Text strong>Tên khách hàng:</Text> {selectedOrder.name}
            </div>
            <div style={{ marginBottom: "20px" }}>
              <Text strong>Ngày đặt:</Text> {selectedOrder.date}
            </div>
            <div style={{ marginBottom: "20px" }}>
              <Text strong>Tổng tiền:</Text> {selectedOrder.total}₫
            </div>
            <div style={{ marginBottom: "20px" }}>
              <Text strong>Trạng thái:</Text> {selectedOrder.status}
            </div>
            <div style={{ marginBottom: "20px" }}>
              <Text strong>Thanh toán:</Text> {selectedOrder.payment}
            </div>

            {/* Bảng hiển thị chi tiết sản phẩm */}
            <Title level={5}>Chi tiết sản phẩm</Title>
            <Table
              columns={productColumns}
              dataSource={selectedOrder.orderItems} // Hiển thị sản phẩm từ orderItems
              pagination={false}
              rowKey="productName"
            />
          </>
        ) : (
          <p>Không có chi tiết đơn hàng</p>
        )}
      </Modal>
    </Card>
  );
};

export default Bill;
