import { Navigate, Route, Routes } from "react-router-dom";
import BaseLayoutAdmin from "../layout/admin/BaseLayoutAdmin";

import { RoutePath } from "../constants/path";
import useAuth from "../hooks/redux/auth/useAuth";
import ListCategories from "../pages/admin/Categories/ListCategories";
import Login from "../pages/admin/Login/Login";
import DashboardVouchers from "../pages/admin/vouchers/ListVoucher";
import DashboardPayments from "../pages/admin/payments/ListPayments";
import UpdatePayments from "../pages/admin/payments/UpdatePayments";

const Router = () => {
  const { auth } = useAuth();

  return (
    <>
      <Routes>
        <Route path={RoutePath.LOGIN} element={auth ? <Navigate to={`/${RoutePath.ADMIN}`} /> : <Login />} />
        <Route path="/" element={<BaseLayoutAdmin />}>
        </Route>
        <Route path={RoutePath.ADMIN} element={auth ? <BaseLayoutAdmin /> : <Navigate to={`/${RoutePath.LOGIN}`} />} >
          <Route path={RoutePath.CATEGORY} element={<ListCategories />} />
          <Route path={RoutePath.VOUCHERS} element={<DashboardVouchers />} />
          <Route path={RoutePath.UPDATE_PAYMENTS} element={<UpdatePayments />} />
          <Route path={RoutePath.PAYMENTS} element={<DashboardPayments />} />

        </Route>
      </Routes>
    </>
  );
};

export default Router;