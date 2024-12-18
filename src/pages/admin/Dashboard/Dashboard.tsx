import { Breadcrumb, Cascader, Col, DatePicker, Row, Select } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { BarChartCn } from "./components/BarChart";
import { BarChartStacked } from "./components/BarChartStacked";
import { LineChartCn } from "./components/LineChart";
import { RadialChartCn } from "./components/RadialChart";
import { RadialChartStackedCn } from "./components/RadialChartStacked";
import './Dashboard.scss'; // Import SCSS file
import { apiGetDashboard, apiGetDashboardChart } from "./utils/dashboard.service";

interface IState {
  loading: boolean;
  loadingChart: boolean;
  data: any;
  dataOption: any;
  start_date: string;
  end_date: string;
  optionFillter: number;
  refresh: boolean;
  optionChart: any;
  dataChartRevenue: any[];
  dataChartBill: any[];
}

const initState: IState = {
  loading: true,
  loadingChart: true,
  data: [],
  dataOption: {},
  start_date: moment().subtract(1, 'months').startOf('month').format('YYYY/MM/DD'),
  end_date: moment().subtract(1, 'months').endOf('month').format('YYYY/MM/DD'),
  optionFillter: 1,
  refresh: false,
  optionChart: { year: 2024, quarter: null, month: moment().month() + 1 },
  dataChartRevenue: [],
  dataChartBill: [],
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
        console.log('dataOption: ', dataOption);
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
        setState(prev => ({ ...prev, loadingChart: true }));
        const res = await apiGetDashboardChart(state.optionChart);
        let dataChartRevenue: any[] = [];
        let dataChartBill: any[] = [];
        if (res?.type == 'daily') {
          for (let index = 0; index < res?.revenue?.length; index++) {
            const day = index + 1;
            dataChartRevenue.push({
              type: day,
              desktop: +res?.revenue[index]?.revenue_in_restaurant || 0,
              mobile: +res?.revenue[index]?.revenue_online || 0
            });
            dataChartBill.push({
              type: day,
              desktop: +res?.revenue[index]?.completed_bills || 0,
              mobile: +res?.revenue[index]?.failed_bills || 0,
            });
          }
        }
        if (res?.type == 'monthly') {
          for (let index = 0; index < res?.revenue?.length; index++) {
            const month = index + 1;
            dataChartRevenue.push({
              type: 'Th ' + month,
              desktop: +res?.revenue[index]?.revenue_in_restaurant || 0,
              mobile: +res?.revenue[index]?.revenue_online || 0
            });
            dataChartBill.push({
              type: 'Th ' + month,
              desktop: +res?.revenue[index]?.completed_bills || 0,
              mobile: +res?.revenue[index]?.failed_bills || 0,
            });
          }
        }
        setState(prev => ({ ...prev, loadingChart: false, dataChartBill, dataChartRevenue }))
      } catch (error: any) {
        console.log(error);
        // toast.showError(error);
        setState(prev => ({ ...prev, loadingChart: false }));
      }
    })();
  }, [state.refresh, state.optionChart]);

  const options = [
    { label: 'Tháng trước', value: 0 },
    { label: 'Ngày', value: 1 },
    { label: 'Tháng này', value: 2 },
    { label: 'Tuỳ chỉnh', value: 3 },
  ];

  const optionsCascader: any[] = [
    {
      value: "year",
      label: "Năm",
      children: [
        { value: "2015", label: "2015" },
        { value: "2016", label: "2016" },
        { value: "2017", label: "2017" },
        { value: "2018", label: "2018" },
        { value: "2019", label: "2019" },
        { value: "2020", label: "2020" },
        { value: "2021", label: "2021" },
        { value: "2022", label: "2022" },
        { value: "2023", label: "2023" },
        { value: "2024", label: "2024" },
        { value: "2025", label: "2025", disabled: true },
        { value: "2026", label: "2026", disabled: true },
      ],
    },
    {
      value: "quarter",
      label: "Quý",
      children: [
        { value: "1", label: "Quý 1" },
        { value: "2", label: "Quý 2" },
        { value: "3", label: "Quý 3" },
        { value: "4", label: "Quý 4" },
      ],
      disabled: true,
    },
    {
      value: "month",
      label: "Tháng",
      children: [
        { value: 1, label: "Tháng 1" },
        { value: 2, label: "Tháng 2" },
        { value: 3, label: "Tháng 3" },
        { value: 4, label: "Tháng 4" },
        { value: 5, label: "Tháng 5" },
        { value: 6, label: "Tháng 6" },
        { value: 7, label: "Tháng 7" },
        { value: 8, label: "Tháng 8" },
        { value: 9, label: "Tháng 9" },
        { value: 10, label: "Tháng 10" },
        { value: 11, label: "Tháng 11" },
        { value: 12, label: "Tháng 12" },
      ],
    },
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

  const handleChangeCascader = useCallback((value: any) => {
    let optionChart = {
      year: undefined, month: undefined, quarter: undefined
    };
    if (value[0] == 'year') {
      optionChart.year = value[1];
    } else if (value[0] == 'month') {
      optionChart.month = value[1];
    } else {
      optionChart.quarter = value[1];
    }
    setState(prev => ({ ...prev, optionChart }))
  }, []);

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
          <Cascader
            options={optionsCascader}
            onChange={handleChangeCascader}
            allowClear={false}
            defaultValue={['month', (moment().month() + 1)]}
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
                loading={state.loading}
              />
            </Col>
            <Col span={12}>
              <RadialChartStackedCn
                completed_bills={state.dataOption?.bills?.completed_bills?.count}
                failed_bills={state.dataOption?.bills?.failed_bills?.count}
                loading={state.loading}
              />
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <BarChartCn
            guests={Math.ceil((+state.dataOption?.guests?.max_guest + +state.dataOption?.guests?.min_guest) / 2)}
            orders={+state.dataOption?.bills?.total_bills}
            products={+state.dataOption?.products}
            tables={+state.dataOption?.tables}
            users={+state.dataOption?.users}
            loading={state.loading}
          />
        </Col>
        <Col span={12}>
          <LineChartCn
            loading={state.loadingChart}
            dataChart={state.dataChartRevenue}
          />
        </Col>
        <Col span={12}>
          <BarChartStacked
            loading={state.loadingChart}
            dataChart={state.dataChartBill}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
