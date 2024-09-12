import { Navigate, Route, Routes } from "react-router-dom";
import BaseLayoutAdmin from "../layout/admin/BaseLayoutAdmin";

import { RoutePath } from "../constants/path";
import useAuth from "../hooks/redux/auth/useAuth";
import ListCategories from "../pages/admin/Categories/ListCategories";
import Login from "../pages/admin/Login/Login";
import DashboardCustommers from "../pages/admin/customers/DashboardCustomers";

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
          <Route path={RoutePath.CUSTOMERS} element={<DashboardCustommers />} />



        </Route>
      </Routes>
    </>
  );
};

export default Router;