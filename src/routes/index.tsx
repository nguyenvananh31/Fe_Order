import { Route, Routes } from "react-router-dom";
import BaseLayoutUsers from "../layout/users/BaseLayoutUsers";
import BaseLayoutAdmin from "../layout/admin/BaseLayoutAdmin";

// import DashboardPayments from "../dashboard/payments/DashboardPayments";
import { RoutePath } from "../constants/path";
import Login from "../pages/admin/Login/Login";
import Register from "../pages/admin/Register/Register";
import ListPayment from "../pages/Payments/ListPayment";
import ListProduct from "../pages/admin/Products/ListProduct";


const Router = () => {
  return (
    <>

      <Routes >
        <Route path={`${RoutePath.LOGIN}`} element={<Login />} />
        <Route path={`${RoutePath.REGISTER}`} element={<Register />} />
      </Routes>
      <Routes>

        <Route path="/" element={<BaseLayoutUsers />}>
        </Route>
        <Route path="admin" element={<BaseLayoutAdmin />}>
          {/* <Route index element={<Dashboard />} /> */}
          <Route path="payments" element={<ListPayment />} />
          <Route path="products" element={<ListProduct />} />
          {/* <Route path="update-payments/:id" element={<UpdatePayments />} />
          <Route path="create-payments" element={<CreatePayments />} />
           */}
          {/* <Route path="vouchers" element={<DashboardVoucher />} /> */}
          {/* <Route path="update-vouchers/:id" element={<UpdateVoucher />} />
          <Route path="create-vouchers" element={<CreateVouchers />} /> */}

        </Route>

      </Routes>
    </>
  );
};

export default Router;