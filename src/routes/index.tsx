import { Route, Routes } from "react-router-dom";
import BaseLayoutUsers from "../layout/users/BaseLayoutUsers";
import HomePage from "../website/users/homePage";
import BaseLayoutAdmin from "../layout/admin/BaseLayoutAdmin";
import DashboardPayments from "../dashboard/payments/DashboardPayments";
import UpdatePayments from "../dashboard/payments/UpdatePayments";
import CreatePayments from "../dashboard/payments/CreatePayments";
import UpdateVoucher from "../dashboard/vouchers/UploadVouchers";
import CreateVouchers from "../dashboard/vouchers/CreateVoucher";
import DashboardVoucher from "../dashboard/vouchers/DashboardVoucher";
import Dashboard from "../dashboard/Chartjs/Dashboard";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<BaseLayoutUsers />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="admin" element={<BaseLayoutAdmin />}>
        <Route index element={<Dashboard />} />
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
