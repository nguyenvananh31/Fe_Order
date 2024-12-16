import { FileTextOutlined, StockOutlined, UserAddOutlined } from "@ant-design/icons";
import { Card, Col, DatePicker, Flex, Radio, Row, Spin } from "antd";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import './Dashboard.scss'; // Import SCSS file
import { apiGetDashboard } from "./utils/dashboard.service";
import LineChart from "./components/LineChart";
import dayjs from "dayjs";

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
      <Row gutter={[8, 20]} justify={'space-between'} className="bg-primary px-6 py-6 rounded-primary drop-shadow">
        <Col span={24}>
          <Flex justify="space-between">
            <h4>Thống kê tổng</h4>
            <Flex>
              {
                state.optionFillter == 3 && (
                  <DatePicker.RangePicker
                    onChange={handleFilterDate}
                    maxDate={dayjs()}
                  />
                )
              }
              <Radio.Group className="ml-2 cutomize-radio" block options={options} value={state.optionFillter} optionType="button" onChange={handleChangeOption} />
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
                  <Card.Meta title={'Ước tính lượng khách'}
                    description={<p className="font-bold text-lg text-primary text-center">{Math.ceil((+state?.dataOption?.guests?.min_guest + +state?.dataOption?.guests?.max_guest) / 2 || 0)} <StockOutlined /></p>}
                  />
                </Card>
              </Col>
            </>
        }
      </Row>
      <Row gutter={[8, 20]} justify={'space-between'} className="my-4">
        <Col span={12}>
          <LineChart />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
