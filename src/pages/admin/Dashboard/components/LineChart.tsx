import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Card } from "antd";

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart: React.FC = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Online",
        data: [120, 200, 150, 220, 300, 250, 400, 350, 300, 400, 450, 500],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: "Tại nhà hàng",
        data: [80, 100, 90, 120, 150, 130, 170, 160, 200, 210, 240, 300],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Tháng",
        },
      },
      y: {
        title: {
          display: true,
          text: "Số lượng đơn hàng",
        },
      },
    },
  };

  return (
    <Card title="Thống kê doanh thu" className="drop-shadow">
      <Line data={data} options={options} />
    </Card>
  );
};

export default LineChart;
