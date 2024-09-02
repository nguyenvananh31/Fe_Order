import { Route, Routes } from "react-router-dom";
import BaseLayoutAdmin from "../layout/admin/BaseLayoutAdmin";
import BaseLayoutUsers from "../layout/users/BaseLayoutUsers";

import CreatePayments from "../dashboard/payments/CreatePayments";
import DashboardPayments from "../dashboard/payments/DashboardPayments";
import UpdatePayments from "../dashboard/payments/UpdatePayments";

import Dashboard from "../dashboard/chartjs/Dashboard";
import CreateVouchers from "../dashboard/vouchers/CreateVoucher";
import DashboardVoucher from "../dashboard/vouchers/DashboardVoucher";
import UpdateVoucher from "../dashboard/vouchers/UploadVouchers";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<BaseLayoutUsers />}>
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