import React from "react";
import { Table, Tag, Space, Button, Input, DatePicker } from "antd";
import { SearchOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

const transactions = [
  {
    key: '1',
    transaction: 'Payment from Bonnie Green',
    date: 'Apr 23, 2021',
    amount: 2300,
    reference: '0047568936',
    method: 'MasterCard •••• 475',
    status: 'Completed',
  },
  {
    key: '2',
    transaction: 'Payment refund to #00910',
    date: 'Apr 23, 2021',
    amount: -670,
    reference: '0078568936',
    method: 'Visa •••• 924',
    status: 'Completed',
  },
  {
    key: '3',
    transaction: 'Payment failed from #087651',
    date: 'Apr 18, 2021',
    amount: 234,
    reference: '0088568934',
    method: 'Visa •••• 826',
    status: 'Cancelled',
  },
  {
    key: '4',
    transaction: 'Payment from Lana Byrd',
    date: 'Apr 15, 2021',
    amount: 5000,
    reference: '0018568911',
    method: 'Visa •••• 634',
    status: 'In progress',
  },
  // Add more transactions here...
];

const columns = [
  {
    title: 'Transaction',
    dataIndex: 'transaction',
    key: 'transaction',
  },
  {
    title: 'Date & Time',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (text) => `$${text}`,
  },
  {
    title: 'Reference Number',
    dataIndex: 'reference',
    key: 'reference',
  },
  {
    title: 'Payment Method',
    dataIndex: 'method',
    key: 'method',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (status) => {
      let color = status === 'Completed' ? 'green' : status === 'In progress' ? 'blue' : 'volcano';
      return (
        <Tag color={color}>
          {status.toUpperCase()}
        </Tag>
      );
    },
  },
];

const Category = () => {
  return (
    <div style={{ padding: 24 }}>
      <h2>Transactions</h2>
      <Space style={{ marginBottom: 16 }}>
        <Button>Filter by status</Button>
        <RangePicker />
        <Input placeholder="Search" prefix={<SearchOutlined />} />
      </Space>
      <Table columns={columns} dataSource={transactions} pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default Category ;
