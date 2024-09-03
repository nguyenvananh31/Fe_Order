import { Navigate, Route, Routes } from "react-router-dom";
import BaseLayoutAdmin from "../layout/admin/BaseLayoutAdmin";
import BaseLayoutUsers from "../layout/users/BaseLayoutUsers";

import CreatePayments from "../dashboard/payments/CreatePayments";
import DashboardPayments from "../dashboard/payments/DashboardPayments";
import UpdatePayments from "../dashboard/payments/UpdatePayments";

import Dashboard from "../dashboard/chartjs/Dashboard";
import CreateVouchers from "../dashboard/vouchers/CreateVoucher";
import DashboardVoucher from "../dashboard/vouchers/DashboardVoucher";
import UpdateVoucher from "../dashboard/vouchers/UploadVouchers";
import { RoutePath } from "../constants/path";
import ListCategories from "../pages/admin/Categories/ListCategories";
import useAuth from "../hooks/redux/auth/useAuth";
import Login from "../pages/admin/Login/Login";

const Router = () => {
  const { auth } = useAuth();

  return (
    <>
      <Routes>
        <Route path={RoutePath.LOGIN} element={auth ? <Navigate to={`/${RoutePath.ADMIN}`} /> : <Login />} />
        <Route path="/" element={<BaseLayoutAdmin />}>
        </Route>
        <Route path={RoutePath.ADMIN} element={auth ? <BaseLayoutAdmin /> : <Navigate to={`/${RoutePath.LOGIN}`} />} >
          <Route index element={<Dashboard />} />
          <Route path={RoutePath.CATEGORY} element={<ListCategories />} />
          <Route path="payments" element={<DashboardPayments />} />
          <Route path="update-payments/:id" element={<UpdatePayments />} />
          <Route path="create-payments" element={<CreatePayments />} />
          <Route path="vouchers" element={<DashboardVoucher />} />
          <Route path="update-vouchers/:id" element={<UpdateVoucher />} />
          <Route path="create-vouchers" element={<CreateVouchers />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;