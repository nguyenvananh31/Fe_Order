import { Breadcrumb, Col, DatePicker, Row, Select } from "antd";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { AreaChartCn } from "./components/AreaChart";
import { BarChartCn } from "./components/BarChart";
import { LineChartCn } from "./components/LineChart";
import { RadialChartCn } from "./components/RadialChart";
import { RadialChartStackedCn } from "./components/RadialChartStacked";
import './Dashboard.scss'; // Import SCSS file
import { apiGetDashboard, apiGetDashboardChart } from "./utils/dashboard.service";
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

  
  useEffect(() => {
    (async () => {
      try {
        setState(prev => ({ ...prev, loading: true }));
        const conds = {
          start_date: state.start_date,
          end_date: state.end_date,
        }
        const res = await apiGetDashboardChart(conds);
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

  const handleChangeOption = useCallback((value: any) => {
    setState(prev => {
      let dataOption;
      if (prev.data && value !== 3) {
        if (value == 0) {
          dataOption = prev.data?.default?.last_month;
        }
        if (value == 1) {
          dataOption = prev.data?.default?.today;
        }
        if (value == 2) {
          dataOption = prev.data?.default?.current_month;
        }
        if (value == 3) {
          dataOption = prev.data?.res?.filtered;
        }
      }
      return { ...prev, optionFillter: value, dataOption }
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

    setState(prev => ({ ...prev, start_date: startDate, end_date: endDate, refresh: !prev.refresh }))
  }

  return (
    <div className="dashboard">
      <Row gutter={[20, 20]} justify={'space-between'} className="my-4">
        <Col span={24} className="flex justify-end items-center gap-4">
          <Breadcrumb
            style={{
              fontSize: "24px",
              margin: "16px auto 28px 0",
            }}
            items={[
              {
                title: <div className="font-bold">Dashboard</div>,
              },
            ]}
          />
          <DatePicker.RangePicker
            onChange={handleFilterDate}
            maxDate={dayjs()}
            disabled={state?.optionFillter != 3}
            allowEmpty
          />
          <Select
            value={state.optionFillter}
            style={{ width: 120 }}
            onChange={handleChangeOption}
            options={options}
          />
        </Col>
        <Col span={12}>
          <Row gutter={[20, 20]}>
            <Col span={12}>
              <RadialChartCn
                completed_bills={state.dataOption?.bills?.completed_bills?.revenue}
                failed_bills={state.dataOption?.bills?.failed_bills?.revenue}
              />
            </Col>
            <Col span={12}>
              <RadialChartStackedCn
                completed_bills={state.dataOption?.bills?.completed_bills?.count}
                failed_bills={state.dataOption?.bills?.failed_bills?.count}
              />
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <BarChartCn
            guests={Math.ceil((+state.dataOption?.guests?.max_guest + +state.dataOption?.guests?.min_guest) / 2)}
            orders={+state.dataOption?.orders}
            products={+state.dataOption?.products}
            tables={+state.dataOption?.tables}
            users={+state.dataOption?.users}
          />
        </Col>
        <Col span={12}>
          <LineChartCn />
        </Col>
        <Col span={12}>
          <AreaChartCn />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
