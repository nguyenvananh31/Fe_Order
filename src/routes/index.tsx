import { Route, Routes } from "react-router-dom";
import DashboardPayments from "../dashboard/payments/DashboardPayments";
import UpdatePayments from "../dashboard/payments/UpdatePayments";
import CreatePayments from "../dashboard/payments/CreatePayments";
import ListCategories from "../layout/admin/Categories/ListCategories";
import Login from "../layout/admin/Login";
import Register from "../layout/admin/Register";
import BaseLayoutAdmin from "../layout/admin/BaseLayoutAdmin";
import ListCategories from "../pages/admin/Categories/ListCategories";
import { RoutePath } from "../constants/path";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path={RoutePath.ADMIN} element={<BaseLayoutAdmin />}>
          <Route index element={<DashboardPayments />} />
          <Route path="categories" element={<ListCategories />} />
          <Route path="update-movies/:id" element={<UpdatePayments />} />
          <Route path="create-movie" element={<CreatePayments />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path={RoutePath.CATEGORY} element={<ListCategories />} />
        </Route>
        <Route path="login" element={<Login />} ></Route>
        <Route path="register" element={<Register />} ></Route>
      </Routes>
    </>
  );
};

export default Router;
