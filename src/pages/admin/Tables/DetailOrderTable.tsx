// src/components/DetailOrderTable.tsx
import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Button, Modal } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

interface Order {
  id: number;
  orderCode: string;
  tableNumber: number;
  tableId: number;
  customerName: string;
  orderTime: string;
  orderDate: string;
  description: string;
  status: 'Completed' | 'Pending' | 'Returned' | 'In Use';
}

// Dữ liệu giả cho các đơn đặt hàng
const mockOrders: Order[] = [
  {
    id: 1,
    orderCode: 'ORD123456',
    tableNumber: 1,
    tableId: 1,
    customerName: 'Nguyễn Văn A',
    orderTime: '14:30',
    orderDate: '2024-09-01',
    description: 'Món ăn đặc biệt với các món khai vị và chính.',
    status: 'Completed',
  },
  {
    id: 2,
    orderCode: 'ORD123457',
    tableNumber: 2,
    tableId: 2,
    customerName: 'Trần Thị B',
    orderTime: '16:00',
    orderDate: '2024-09-02',
    description: 'Đặt món tráng miệng và đồ uống.',
    status: 'Pending',
  },
  {
    id: 3,
    orderCode: 'ORD123458',
    tableNumber: 3,
    tableId: 3,
    customerName: 'Lê Văn C',
    orderTime: '18:30',
    orderDate: '2024-09-03',
    description: 'Đặt tiệc sinh nhật với nhiều món ăn đặc biệt.',
    status: 'In Use',
  },
  {
    id: 4,
    orderCode: 'ORD123459',
    tableNumber: 4,
    tableId: 4,
    customerName: 'Nguyễn Thị D',
    orderTime: '19:00',
    orderDate: '2024-09-04',
    description: 'Đặt món chay cho buổi họp mặt gia đình.',
    status: 'Returned',
  },
];

const DetailOrderTable: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Tìm đơn hàng từ dữ liệu giả
    const fetchOrder = () => {
      if (orderId) {
        const foundOrder = mockOrders.find(order => order.id === Number(orderId));
        setOrder(foundOrder || null);
      }
    };
    fetchOrder();
  }, [orderId]);

  const handleBack = () => {
    navigate(-1); // Quay lại trang trước đó
  };

  const handleEdit = () => {
    // Điều hướng đến trang chỉnh sửa đơn hàng
    navigate(`/edit-order/${orderId}`);
  };

  return (
    <div className="p-4">
      {order ? (
        <Card title={`Chi Tiết Đơn Đặt Hàng - ${order.orderCode}`} extra={<Button onClick={handleBack}>Quay lại</Button>}>
          <Descriptions bordered>
            <Descriptions.Item label="ID Đơn Đặt" span={3}>{order.id}</Descriptions.Item>
            <Descriptions.Item label="Mã Đơn Đặt" span={3}>{order.orderCode}</Descriptions.Item>
            <Descriptions.Item label="Số Bàn" span={3}>{order.tableNumber}</Descriptions.Item>
            <Descriptions.Item label="ID Bàn" span={3}>{order.tableId}</Descriptions.Item>
            <Descriptions.Item label="Người Đặt" span={3}>{order.customerName}</Descriptions.Item>
            <Descriptions.Item label="Giờ Đặt" span={3}>{order.orderTime}</Descriptions.Item>
            <Descriptions.Item label="Ngày Đặt" span={3}>{order.orderDate}</Descriptions.Item>
            <Descriptions.Item label="Mô Tả" span={3}>{order.description}</Descriptions.Item>
            <Descriptions.Item label="Trạng Thái" span={3}>
              <span className={`px-2 py-1 text-white rounded-full ${order.status === 'Completed' ? 'bg-green-500' : 
                order.status === 'Pending' ? 'bg-yellow-500' :
                order.status === 'Returned' ? 'bg-gray-500' : 
                'bg-blue-500'}`}>
                {order.status}
              </span>
            </Descriptions.Item>
          </Descriptions>
          <div className="mt-4">
            <Button type="primary" onClick={handleEdit}>
              Chỉnh Sửa
            </Button>
          </div>
        </Card>
      ) : (
        <Modal
          title="Thông Báo"
          visible={true}
          footer={[
            <Button key="ok" onClick={handleBack}>
              OK
            </Button>,
          ]}
        >
          <p>Không tìm thấy đơn đặt hàng.</p>
        </Modal>
      )}
    </div>
  );
};

export default DetailOrderTable;
