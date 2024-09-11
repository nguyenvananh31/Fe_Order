// src/components/ListTable.tsx
import React, { useState } from 'react';
import { Table, Button, Input, Select, Modal, Form, Input as AntInput, QRCode } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface TableData {
  id: number;
  name: string;
  description: string;
  status: string;
  idForQRCode: number; // ID để tạo URL QR code
}

const initialData: TableData[] = [
  { id: 1, name: 'Bàn 1', description: 'Bàn gần cửa sổ', status: 'Available', idForQRCode: 1 },
  { id: 2, name: 'Bàn 2', description: 'Bàn ở giữa phòng', status: 'Occupied', idForQRCode: 2 },
  { id: 3, name: 'Bàn 3', description: 'Bàn gần quầy bar', status: 'Available', idForQRCode: 3 },
];

const { Option } = Select;

const ListTable: React.FC = () => {
  const [data, setData] = useState<TableData[]>(initialData);
  const [filteredData, setFilteredData] = useState<TableData[]>(initialData);
  const [searchText, setSearchText] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<TableData | null>(null);
  const [form] = Form.useForm(); // Khởi tạo form

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    filterData(value, statusFilter);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    filterData(searchText, value);
  };

  const filterData = (searchText: string, status?: string) => {
    let filtered = initialData.filter(item => item.name.toLowerCase().includes(searchText));
    if (status) {
      filtered = filtered.filter(item => item.status === status);
    }
    setFilteredData(filtered);
  };

  const handleEdit = (item: TableData) => {
    setEditItem(item);
    form.setFieldsValue(item); // Đặt giá trị vào form khi chỉnh sửa
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Xóa Bàn',
      content: 'Bạn có chắc chắn muốn xóa bàn này?',
      onOk: () => {
        const newData = data.filter(item => item.id !== id);
        setData(newData);
        setFilteredData(newData);
      },
    });
  };

  const handleAdd = () => {
    // Tạo dữ liệu mặc định cho bàn mới
    const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
    const newTableData: TableData = {
      id: newId,
      name: `Bàn ${newId}`,
      description: '',
      status: 'Available',
      idForQRCode: newId
    };
    setEditItem(newTableData);
    form.resetFields(); // Reset form fields
    form.setFieldsValue(newTableData); // Đặt giá trị vào form khi thêm mới
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (editItem) {
        if (editItem.id) {
          // Cập nhật thông tin bàn
          const updatedData = data.map(item => 
            item.id === editItem.id ? { ...item, ...values } : item
          );
          setData(updatedData);
          setFilteredData(updatedData);
        } else {
          // Thêm bàn mới
          const newTableData: TableData = {
            ...values,
            id: data.length > 0 ? data[data.length - 1].id + 1 : 1,
            idForQRCode: data.length > 0 ? data[data.length - 1].id + 1 : 1
          };
          const updatedData = [...data, newTableData];
          setData(updatedData);
          setFilteredData(updatedData);
        }
      }
      setIsModalVisible(false);
      setEditItem(null);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditItem(null);
  };

  const columns: ColumnsType<TableData> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên Bàn',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô Tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span className={`px-2 py-1 text-white rounded-full ${status === 'Available' ? 'bg-green-500' : 'bg-red-500'}`}>
          {status}
        </span>
      ),
    },
    {
      title: 'QR Code',
      dataIndex: 'idForQRCode',
      key: 'idForQRCode',
      render: (idForQRCode) => (
        <QRCode value={`https://yourdomain.com/tables/${idForQRCode}`} size={100} />
      ),
    },
    {
      title: 'Hành Động',
      key: 'actions',
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)} 
            type="primary" 
          />
          <Button 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.id)} 
            danger 
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between space-x-4">
        <div className="flex space-x-4">
          <Input 
            placeholder="Tìm kiếm theo tên bàn" 
            value={searchText} 
            onChange={handleSearch} 
            className="w-48" // Điều chỉnh chiều rộng
          />
          <Select
            placeholder="Lọc theo trạng thái"
            onChange={handleStatusChange}
            className="w-48" // Điều chỉnh chiều rộng
          >
            <Option value="">Tất cả</Option>
            <Option value="Available">Có sẵn</Option>
            <Option value="Occupied">Đã đặt</Option>
          </Select>
        </div>
        <Button 
          icon={<PlusOutlined />} 
          type="primary" 
          shape="circle" 
          size="large" 
          onClick={handleAdd}
        />
      </div>
      <Table dataSource={filteredData} columns={columns} rowKey="id" />
      
      <Modal
        title={editItem?.id ? 'Chỉnh Sửa Bàn' : 'Thêm Bàn'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            onClick={handleOk}
          >
            Hoàn Thành
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={editItem}
        >
          <Form.Item name="name" label="Tên Bàn" rules={[{ required: true, message: 'Tên bàn là bắt buộc' }]}>
            <AntInput />
          </Form.Item>
          <Form.Item name="description" label="Mô Tả">
            <AntInput />
          </Form.Item>
          <Form.Item name="status" label="Trạng Thái" rules={[{ required: true, message: 'Trạng thái là bắt buộc' }]}>
            <Select>
              <Option value="Available">Có sẵn</Option>
              <Option value="Occupied">Đã đặt</Option>
            </Select>
          </Form.Item>
          {/* Không cần trường QR Code trong form */}
        </Form>
      </Modal>
    </div>
  );
};

export default ListTable;
