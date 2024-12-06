import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Col, message, Modal, Row, Table, Typography } from "antd";
import React, { useState } from "react";
import ApiUtils from "../../../../utils/api/api.utils";
import { fallBackImg, getImageUrl } from "../../../../constants/common";
import { convertPriceVND } from "../../../../utils/common";

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
  cancellation_requested: { color: 'red', title: 'Chờ xác nhận hủy' },
  cancellation_approved: { color: 'volcano', title: 'Xác nhận hủy' },
  cancellation_rejected: { color: 'volcano', title: 'Hủy thất bại' },
};

const statusPayment: any = {
  pending: { color: "magenta", title: "Đang chờ" },
  paid: { color: "cyan", title: "Trả hàng" },
  successful: { color: "green", title: "Đã thanh toán" },
  failed: { color: "red", title: "Thanh toán thất bại" },
  refunded: { color: "volcano", title: "Hoàn trả tiền" },
}

const Bill: React.FC = () => {
  const queryClient = useQueryClient();
  const [isLoadingCancel, setIsLoadingCancel] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["bill"],
    queryFn: async () => {
      try {
        const res = await ApiUtils.fetch(`/api/client/bill_user`);
        return res.data;
      } catch (error) {
        console.error("Error", error);
        return null;
      }
    },
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [productDetails, setProductDetails] = useState<any[]>([]);

  const fetchProductDetails = async (orderId: number) => {
    try {
      const res = await ApiUtils.fetch(`/api/client/billdetail/${orderId}`);
      setProductDetails(res?.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
      message.error("Có lỗi xảy ra khi lấy chi tiết đơn hàng. Vui lòng thử lại sau.");
    }
  };

  const handleCancelOrder = async (orderId: number) => {
    try {
      setIsLoadingCancel(true);
      await ApiUtils.put(`/api/client/bills/${orderId}/cancel`, {
        status: 'awaitingApproval',
      });
      message.success("Yêu cầu hủy đơn hàng đang chờ duyệt!");

      queryClient.invalidateQueries(["bill"]);
    } catch (error) {
      console.error("Error sending cancellation request", error);
      message.error("Có lỗi xảy ra khi gửi yêu cầu hủy đơn hàng!");
    } finally {
      setIsLoadingCancel(false);
    }
  };

  const handleViewDetail = async (order: any) => {
    setSelectedOrder(order);
    await fetchProductDetails(order.id);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
      width: 100,
      responsive: ['md'],
    },
    {
      title: "Mã bill",
      dataIndex: "ma_bill",
      key: "ma_bill",
      width: 100,
      responsive: ['md'],
    },
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      key: "name",
      width: 150,
      responsive: ['sm'],
    },
    {
      title: "Ngày đặt",
      dataIndex: "date",
      key: "date",
      width: 120,
      responsive: ['md'],
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (total: number) => `${convertPriceVND(total)}`,
      width: 100,
      responsive: ['sm'],
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
      width: 120,
      responsive: ['sm'],
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "payment_status",
      key: "payment_status",
      render: (_: string, { payment_status }: any) => {
        return (
          <span style={{ color: statusPayment[payment_status]?.color }}>
            {statusPayment[payment_status]?.title}
          </span>
        )
      },
      width: 120,
      responsive: ['sm'],
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
              record.status === "awaitingApproval" ||
              record.status === "cancelled" ||
              record.status === "completed" ||
              isLoadingCancel
            }
          >
            {isLoadingCancel ? "Đang xử lý..." : "Hủy"}
          </Button>
        </>
      ),
      width: 120,
      responsive: ['sm'],
    },
  ];

  const productColumns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text: any, record: any, index: number) => index + 1,
      width: 60,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      width: 150,
      responsive: ['sm'],
    },
    {
      title: "Kích thước",
      dataIndex: "size",
      key: "size",
      width: 80,
      responsive: ['md'],
    },
    {
      title: "Hình ảnh",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (thumbnail: string) => (
        <img
          src={thumbnail ? getImageUrl(thumbnail) : fallBackImg}
          alt="product"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ),
      width: 80,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: 80,
      responsive: ['sm'],
    },
    {
      title: "Tổng",
      dataIndex: "total",
      key: "total",
      render: (total: number) => `${total}₫`,
      width: 100,
      responsive: ['md'],
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
    payment_status: order.payment_status
  }));

  return (
    <Card
      title="Chi tiết đơn hàng"
      style={{
        maxWidth: "100%",
        margin: "20px auto",
        padding: "16px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        marginTop: "6px",
      }}
      styles={{
        body: {
          maxHeight: "450px", // Set max height for the card content area
          padding: "12px",
          overflowY: "auto", // Enable vertical scrolling if content exceeds max height
        }
      }}
    >
      <Row justify="center">
        <Col xs={24}>
          <div className="border-t rounded-[6px] text-gray-800 text-sm leading-[21px] p-5 bg-white">
            <h3 className="text-lg font-bold mb-4">Danh sách đơn hàng</h3>
            <div style={{ overflowX: "auto" }}> {/* Add this wrapper for horizontal scrolling */}
              <Table
                columns={columns}
                dataSource={orders}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                scroll={{ x: 'max-content' }} // Ensure horizontal scroll is enabled
                locale={{ emptyText: "Không có đơn hàng" }}
              />
            </div>
          </div>
        </Col>
      </Row>

      <Modal
        title="Chi tiết đơn hàng"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Thoát
          </Button>,
        ]}
        width="90%"
        styles={{ body: { maxHeight: "70vh", overflowY: "auto", padding: "16px" } }}
        centered
      >
        {selectedOrder && (
          <>
            <div style={{ marginBottom: "20px" }}>
              <Row gutter={[16, 8]}>
                <Col xs={24} sm={12}>
                  <Text strong>Mã đơn hàng:</Text> #{selectedOrder.ma_bill}
                </Col>
                <Col xs={24} sm={12}>
                  <Text strong>Cách thức:</Text> {selectedOrder.order_type}
                </Col>
              </Row>
              <Row gutter={[16, 8]}>
                <Col xs={24} sm={12}>
                  <Text strong>Tên khách hàng:</Text> {selectedOrder.name}
                </Col>
                <Col xs={24} sm={12}>
                  <Text strong>Trạng thái:</Text>
                  <span style={{ color: statusBill[selectedOrder.status]?.color }}>
                    {statusBill[selectedOrder.status]?.title}
                  </span>
                </Col>
              </Row>
              <Row gutter={[16, 8]}>
                <Col xs={24} sm={12}>
                  <Text strong>Địa chỉ:</Text> {selectedOrder.address || "Chưa có"}
                </Col>
                <Col xs={24} sm={12}>
                  <Text strong>Thanh toán:</Text> {selectedOrder.payment}
                </Col>
              </Row>
              <Row gutter={[16, 8]}>
                <Col xs={24} sm={12}>
                  <Text strong>Ngày đặt:</Text> {selectedOrder.date}
                </Col>
                <Col xs={24} sm={12}>
                  <Text strong>Tổng tiền:</Text> {selectedOrder.total}₫
                </Col>
              </Row>
            </div>

            <Title level={5}>Danh sách sản phẩm</Title>
            <div> {/* Wrapper for horizontal scroll in the product table */}
              <Table
                columns={productColumns} // Use productColumns for the product details table
                dataSource={productDetails}
                rowKey="id"
                pagination={false}
                scroll={{ x: 'max-content' }}
              />
            </div>
          </>
        )}
      </Modal>
    </Card>

  );
};

export default Bill;
