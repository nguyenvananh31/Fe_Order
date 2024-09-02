import { Route, Routes } from "react-router-dom";
import DashboardPayments from "../dashboard/payments/DashboardPayments";
import BaseLayoutAdmin from "../layout/admin/BaseLayoutAdmin";
import ListCategories from "../pages/admin/Categories/ListCategories";
import { RoutePath } from "../constants/path";
import Login from "../pages/admin/Login/Login";
import Register from "../pages/admin/Register/Register";

const Router = () => {
  return (
    <>

      <Routes >
        <Route path={`${RoutePath.LOGIN}`}  element={<Login />} />
        <Route path={`${RoutePath.REGISTER}`}  element={<Register />} />
      </Routes>
      <Routes>


        <Route path={RoutePath.ADMIN} element={<BaseLayoutAdmin />}>
          <Route index element={<DashboardPayments />} />
          <Route path={`${RoutePath.ADMIN}`+`.`+`${RoutePath.CATEGORY}`} element={<ListCategories />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
