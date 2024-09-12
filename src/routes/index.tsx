import { Navigate, Route, Routes } from "react-router-dom";
import BaseLayoutAdmin from "../layout/admin/BaseLayoutAdmin";

import { RoutePath } from "../constants/path";
import useAuth from "../hooks/redux/auth/useAuth";
import ListCategories from "../pages/admin/Categories/ListCategories";
import Login from "../pages/admin/Login/Login";
import Register from "../pages/admin/Register/Register";
import AccountPage from "../pages/admin/Account/index.page";
import ListProduct from "../pages/admin/Products/ListProduct";
import ListPayment from "../pages/admin/Payments/ListPayment";
import ListTable from "../pages/admin/Tables/ListTable";
import DetailOrderTable from "../pages/admin/Tables/DetailOrderTable";
import AddProduct from "../pages/admin/Products/AddProduct";
import BaseLayoutUsers from "../layout/users/BaseLayoutUsers";


const Router = () => {
  const { auth } = useAuth();

  return (
    <>
      <Routes>
        <Route path={RoutePath.LOGIN} element={auth ? <Navigate to={`/${RoutePath.ADMIN}`} /> : <Login />} />
        <Route path={RoutePath.REGISTER} element={auth ? <Navigate to={`/${RoutePath.ADMIN}`} /> : <Register />} />
        <Route path="/" element={<BaseLayoutUsers />}>
        </Route>
        <Route path={RoutePath.ADMIN} element={auth ? <BaseLayoutAdmin /> : <Navigate to={`/${RoutePath.LOGIN}`} />} >
          <Route path={RoutePath.CATEGORY} element={<ListCategories />} />
          <Route path={RoutePath.ACCOUNT} element={<AccountPage />} />

          <Route path="payments" element={<ListPayment />} />
          <Route path="products" element={<ListProduct />} />
          <Route path="tables" element={<ListTable />} />
          <Route path="product-add" element={<AddProduct />} />
          <Route path="tables-order" element={<DetailOrderTable />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;