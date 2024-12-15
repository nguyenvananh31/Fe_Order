import { ArrowUpOutlined, FileTextOutlined, StockOutlined, UserAddOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, DatePicker, Flex, Progress, Radio, Row, Spin, Statistic, Table } from "antd";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { Line } from "react-chartjs-2"; // Thêm Line chart từ react-chartjs-2
import './Dashboard.scss'; // Import SCSS file
import { apiGetDashboard } from "./utils/dashboard.service";

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

interface IState {
  loading: boolean;
  data: any;
  dataOption: any;
  start_date: string;
  end_date: string;
  optionFillter: number;
  refresh: boolean;
}

const initState: IState = {
  loading: true,
  data: [],
  dataOption: {},
  start_date: moment().subtract(1, 'months').startOf('month').format('YYYY/MM/DD'),
  end_date: moment().subtract(1, 'months').endOf('month').format('YYYY/MM/DD'),
  optionFillter: 1,
  refresh: false,
}

const Dashboard = () => {

  const [state, setState] = useState<IState>(initState);
  // const toast = useToast();

  useEffect(() => {
    (async () => {
      try {
        setState(prev => ({ ...prev, loading: true }));
        const conds = {
          start_date: state.start_date,
          end_date: state.end_date,
        }
        const res = await apiGetDashboard(conds);
        let dataOption = state.optionFillter == 1 ? res?.default?.today : res?.filtered;
        setState(prev => ({ ...prev, loading: false, data: res, dataOption }));
      } catch (error: any) {
        console.log(error);
        // toast.showError(error);
        setState(prev => ({ ...prev, loading: false }));
      }
    })();
  }, [state.refresh]);

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

  const options = [
    { label: 'Tháng trước', value: 0 },
    { label: 'Ngày', value: 1 },
    { label: 'Tháng này', value: 2 },
    { label: 'Tuỳ chỉnh', value: 3 },
  ];

  const handleChangeOption = useCallback((e: any) => {
    setState(prev => {
      let dataOption;
      if (prev.data && e.target.value !== 3) {
        if (e.target.value == 0) {
          dataOption = prev.data?.default?.last_month;
        }
        if (e.target.value == 1) {
          dataOption = prev.data?.default?.today;
        }
        if (e.target.value == 2) {
          dataOption = prev.data?.default?.current_month;
        }
      }
      return { ...prev, optionFillter: e.target.value, dataOption }
    });
  }, []);

  //Filter date
  const handleFilterDate = (_: any, dateStrings: [string, string]) => {
    if (!dateStrings[0] || !dateStrings[1]) {
      setState(prev => ({ ...prev, filterDate: undefined, refresh: !prev.refresh, pageIndex: 1 }))
      return;
    }

    const startDate = new Date(dateStrings[0]).toISOString();
    const endDate = new Date(dateStrings[1]).toISOString();

    setState(prev => ({ ...prev, filterDate: [startDate, endDate], refresh: !prev.refresh }))
  }

  return (
    <div className="dashboard px-2">
      <Row gutter={16}>
        <Col span={0}>
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
        <Col span={0}>
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
        <Col span={0}>
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
        <Col span={0}>
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
        <Col span={0}>
          <Card className="hover-card">
            <Statistic title="Audience by Age" />
            <div >
              <div>50+: <Progress percent={20} size="small" /></div>
              <div>40+: <Progress percent={40} size="small" /></div>
              <div>30+: <Progress percent={50} size="small" /></div>
              <div>20+: <Progress percent={30} size="small" /></div>
            </div>

          </Card>
        </Col>
      </Row>

      <Row gutter={[8, 20]} justify={'space-between'} className="bg-primary px-6 py-6 rounded-primary drop-shadow">
        <Col span={24}>
          <Flex justify="space-between">
            <h4>Thống kê tổng</h4>
            <Flex>
              {
                state.optionFillter == 3 && (
                  <DatePicker.RangePicker
                    onChange={handleFilterDate}
                  />
                )
              }
              <Radio.Group className="ml-2" block options={options} value={state.optionFillter} optionType="button" onChange={handleChangeOption} />
            </Flex>
          </Flex>
        </Col>
        {
          state.loading ? <div className='flex justify-center items-center min-h-20'>
            <Spin />
          </div>
            :
            <>
              <Col span={5}>
                <Card type="inner" hoverable>
                  <Card.Meta title={'Tổng sản phẩm'}
                    description={<p className="font-bold text-lg text-primary text-center">{state?.dataOption?.products} <StockOutlined /></p>}
                  />
                </Card>
              </Col>
              <Col span={5}>
                <Card type="inner" hoverable>
                  <Card.Meta title={'Tổng tài khoản'}
                    description={<p className="font-bold text-lg text-primary text-center">{state?.dataOption?.users} <UserAddOutlined /></p>}
                  />
                </Card>
              </Col>
              <Col span={5}>
                <Card type="inner" hoverable>
                  <Card.Meta title={'Tổng đơn hàng'}
                    description={<p className="font-bold text-lg text-primary text-center">{state?.dataOption?.bills} <FileTextOutlined /></p>}
                  />
                </Card>
              </Col>
              <Col span={5}>
                <Card type="inner" hoverable>
                  <Card.Meta title={'Tổng bàn'}
                    description={<p className="font-bold text-lg text-primary text-center">{state?.dataOption?.tables} <StockOutlined /></p>}
                  />
                </Card>
              </Col>
            </>
        }
      </Row>
    </div>
  );
};

export default Dashboard;
