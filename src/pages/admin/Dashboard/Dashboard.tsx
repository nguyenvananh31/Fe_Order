import React from "react";
import { Card, Col, Row, Statistic, Progress, Table, Avatar } from "antd";
import { Line } from "react-chartjs-2";  // Thêm Line chart từ react-chartjs-2
import { ArrowUpOutlined } from "@ant-design/icons";
import './Dashboard.scss';  // Import SCSS file
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Đăng ký các thành phần cho Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Dữ liệu cho biểu đồ Line
  const lineChartData = {
    labels: ["01 Feb", "02 Feb", "03 Feb", "04 Feb", "05 Feb", "06 Feb", "07 Feb"],
    datasets: [
      {
        label: "Revenue",
        data: [6200, 6100, 6156, 6200, 6100, 6050, 6000],
        borderColor: "#4A90E2",
        fill: false,
        tension: 0.1, 
      },
      {
        label: "Revenue (previous period)",
        data: [6400, 6350, 6424, 6300, 6250, 6150, 6100],
        borderColor: "#FF6D6D",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const columns = [
    {
      title: "Top Products",
      dataIndex: "product",
      key: "product",
      render: (text: string, record: any) => (
        <div className="product-row">
          <Avatar src={record.image} className="product-avatar" />
          {text}
        </div>
      ),
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
    },
    {
      title: "Change",
      dataIndex: "change",
      key: "change",
    },
  ];

  const productData = [
    {
      key: 1,
      product: "iPhone 14 Pro",
      revenue: "$445,467",
      change: "+2.5%",
      image: "https://news.khangz.com/wp-content/uploads/2022/09/ip14-va%CC%80ng.jpg",
    },
    {
      key: 2,
      product: 'Apple iMac 27"',
      revenue: "$256,682",
      change: "+12.5%",
      image: "https://news.khangz.com/wp-content/uploads/2022/09/ip14-va%CC%80ng.jpg",
    },
    {
      key: 3,
      product: "Apple Watch SE",
      revenue: "$201,869",
      change: "+1.35%",
      image: "https://news.khangz.com/wp-content/uploads/2022/09/ip14-va%CC%80ng.jpg",
    },
    {
      key: 4,
      product: "Apple iPad Air",
      revenue: "$103,967",
      change: "+12.5%",
      image: "https://news.khangz.com/wp-content/uploads/2022/09/ip14-va%CC%80ng.jpg",
    },
    {
      key: 5,
      product: 'Apple iMac 24"',
      revenue: "$98,543",
      change: "+2%",
      image: "https://news.khangz.com/wp-content/uploads/2022/09/ip14-va%CC%80ng.jpg",
    },
  ];

  return (
    <div className="dashboard">
      <Row gutter={16}>
        <Col span={16}>
          <Card className="hover-card">
            <Statistic
              title="Sales this week"
              value={45385}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="12.5%"
            />
            {/* Biểu đồ Line cho doanh thu */}
            <Line data={lineChartData} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Statistics this month" className="hover-card">
            <Table
              dataSource={productData}
              columns={columns}
              pagination={false}
              rowClassName="hover-row"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={8}>
          <Card className="hover-card">
            <Statistic title="New Products" value={2340} />
            <Progress percent={12.5} status="active" />
            <div >
                <div>50+: <Progress percent={20} size="small" /></div>
                <div>40+: <Progress percent={40} size="small" /></div>
                <div>30+: <Progress percent={50} size="small" /></div>
                <div>20+: <Progress percent={30} size="small" /></div>
              </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="hover-card">
            <Statistic title="Users" value={2340} />
            <Progress percent={3.4} status="active" />
            <div >
                <div>50+: <Progress percent={20} size="small" /></div>
                <div>40+: <Progress percent={40} size="small" /></div>
                <div>30+: <Progress percent={50} size="small" /></div>
                <div>20+: <Progress percent={30} size="small" /></div>
              </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="hover-card">
            <Statistic title="Audience by Age"/>
              <div >
                <div>50+: <Progress percent={20} size="small" /></div>
                <div>40+: <Progress percent={40} size="small" /></div>
                <div>30+: <Progress percent={50} size="small" /></div>
                <div>20+: <Progress percent={30} size="small" /></div>
              </div>
            
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
