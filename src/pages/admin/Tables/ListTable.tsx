// src/components/ListTable.tsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Select, Modal, Form, Input as AntInput, notification, QRCode } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import ApiUtils from '../../../utils/api/api.utils';

const { Option } = Select;

interface TableData {
  id: number;
  table: string;
  description: string;
  status: number; // Thay đổi thành số
  idForQRCode: number; // ID để tạo URL QR code
}

const ListTable: React.FC = () => {
  const [data, setData] = useState<TableData[]>([]);
  const [filteredData, setFilteredData] = useState<TableData[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<number | undefined>(undefined);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<TableData | null>(null);
  const [form] = Form.useForm(); // Khởi tạo form

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await ApiUtils.fetch('/api/admin/tables');
      setData(res.data);
      setFilteredData(res.data);
    } catch (error) {
      console.error('Error fetching tables:', error);
      notification.error({ message: 'Error fetching tables' });
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    filterData(value, statusFilter);
  };

  const handleStatusChange = (value: string) => {
    const status = value === '' ? undefined : Number(value); // Chuyển đổi giá trị thành số
    setStatusFilter(status);
    filterData(searchText, status); // Chuyển đổi giá trị thành số
  };

  const filterData = (searchText: string, status?: number) => {
    let filtered = data.filter(item => item.table.toLowerCase().includes(searchText));
    if (status !== undefined) {
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
        ApiUtils.remove(`/api/admin/tables/${id}`)
          .then(() => {
            fetchData();
            notification.success({ message: 'Deleted table successfully!' });
          })
          .catch((error) => {
            notification.error({ message: 'Error deleting table!' });
            console.error('Error deleting table:', error);
          });
      },
    });
  };

  const handleAdd = () => {
    // Tạo dữ liệu mặc định cho bàn mới
    const newTableData: TableData = {
      id: 0, // Đặt ID tạm thời để xử lý trong form submit
      table: '',
      description: '',
      status: 0, // Mặc định là còn trống
      idForQRCode: 0
    };
    setEditItem(newTableData);
    form.resetFields(); // Reset form fields
    form.setFieldsValue(newTableData); // Đặt giá trị vào form khi thêm mới
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (editItem) {
        console.log(values);
        
        if (editItem.id > 0) {
          // Cập nhật thông tin bàn
          ApiUtils.put(`/api/admin/tables/${editItem.id}`, values)
            .then(() => {
              fetchData();
              notification.success({ message: 'Table updated successfully!' });
              setIsModalVisible(false);
              setEditItem(null);
            })
            .catch((error) => {
              notification.error({ message: 'Error updating table!' });
              console.error('Error updating table:', error);
            });
        } else {
          // Thêm bàn mới
          ApiUtils.post('/api/admin/tables', { ...values, idForQRCode: data.length + 1 })
            .then(() => {
              fetchData();
              notification.success({ message: 'Table added successfully!' });
              setIsModalVisible(false);
              setEditItem(null);
            })
            .catch((error) => {
              notification.error({ message: 'Error adding table!' });
              console.error('Error adding table:', error);
            });
        }
      }
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditItem(null);
  };

  const columns: ColumnsType<TableData> = [
    {
      title: 'Index',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên Bàn',
      dataIndex: 'table',
      key: 'table', // Đảm bảo đúng tên thuộc tính
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
      render: (status: number) => {
        let statusText = '';
        let statusClass = '';
        switch (status) {
          case 1:
            statusText = 'Đã đặt';
            statusClass = 'bg-red-500'; // Hoặc màu bạn muốn
            break;
          case 0:
            statusText = 'Còn trống';
            statusClass = 'bg-green-500'; // Hoặc màu bạn muốn
            break;
          case 2:
            statusText = 'Bàn đang bảo trì';
            statusClass = 'bg-yellow-500'; // Hoặc màu bạn muốn
            break;
          default:
            statusText = 'Không xác định';
            statusClass = 'bg-gray-500'; // Hoặc màu bạn muốn
        }
        return (
          <span className={`px-2 py-1 text-white rounded-full ${statusClass}`}>
            {statusText}
          </span>
        );
      },
    },
    {
      title: 'QR Code',
      dataIndex: 'id',
      key: 'id',
      render: (id: number) => (
        <QRCode value={`http://localhost:5173/tables/${id}`} size={100} />
      ),
    },
    {
      title: 'Hành Động',
      key: 'actions',
      render: (_, record: TableData) => (
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
            <Option value="0">Còn trống</Option>
            <Option value="1">Đã đặt</Option>
            <Option value="2">Bàn đang bảo trì</Option>
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
        open={isModalVisible}
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
        >
          <Form.Item 
            label="Tên Bàn"
            name="table"
            rules={[{ required: true, message: 'Vui lòng nhập tên bàn!' }]}
          >
            <AntInput />
          </Form.Item>
          <Form.Item 
            label="Mô Tả"
            name="description"
          >
            <AntInput />
          </Form.Item>
          <Form.Item 
            label="Trạng Thái"
            name="status"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
          >
            <Select>
              <Option value={0}>Còn trống</Option>
              <Option value={1}>Đã đặt</Option>
              <Option value={2}>Bàn đang bảo trì</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ListTable;
