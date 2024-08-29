import { Route, Routes } from "react-router-dom";
import BaseLayoutUsers from "../layout/users/BaseLayoutUsers";
import HomePage from "../website/users/homePage";
import BaseLayoutAdmin from "../layout/admin/BaseLayoutAdmin";
import DashboardPayments from "../dashboard/payments/DashboardPayments";
import UpdatePayments from "../dashboard/payments/UpdatePayments";
import CreatePayments from "../dashboard/payments/CreatePayments";
import ListCategories from "../layout/admin/Categories/ListCategories";
import Login from "../layout/admin/Login";
import Register from "../layout/admin/Register";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<BaseLayoutUsers />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="admin" element={<BaseLayoutAdmin />}>
          <Route index element={<DashboardPayments />} />
          <Route path="categories" element={<ListCategories />} />
          <Route path="update-movies/:id" element={<UpdatePayments />} />
          <Route path="create-movie" element={<CreatePayments />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="login" element={<Login />} ></Route>
        <Route path="register" element={<Register />} ></Route>
      </Routes>
    </>
  );
};

export default Router;
