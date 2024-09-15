import { Navigate, Route, Routes } from "react-router-dom";
import BaseLayoutAdmin from "../layout/admin/BaseLayoutAdmin";

import { RoutePath } from "../constants/path";
import useAuth from "../hooks/redux/auth/useAuth";
import AccountPage from "../pages/admin/Account/index.page";
import CatePage from "../pages/admin/Categories/index.page";
import Login from "../pages/admin/Login/Login";
import Register from "../pages/admin/Register/Register";
import ListTable from "../pages/admin/Tables/ListTable";
import DetailOrderTable from "../pages/admin/Tables/DetailOrderTable";
import BaseLayoutUser from "../pages/user/BaseLayoutUser";
import About from "../pages/user/About/About";
import Search from "antd/es/transfer/search";
import Home from "../pages/user/Home/Home";
import Contact from "../pages/user/Contact/Contact";
import AddProduct from "../pages/admin/products/AddProduct";
import ListProduct from "../pages/admin/products/ListProduct";
import ListPayment from "../pages/admin/payments/ListPayment";
import DashboardCustomers from "../pages/admin/customers/DashboardCustomers";
import DashboardSizes from "../pages/admin/sizes/DashboardSizes";

const Router = () => {
  const { auth } = useAuth();

  return (
    <>
      <Routes>
        <Route path={RoutePath.LOGIN} element={auth ? <Navigate to={`/${RoutePath.ADMIN}`} /> : <Login />} />
        <Route path={RoutePath.REGISTER} element={auth ? <Navigate to={`/${RoutePath.ADMIN}`} /> : <Register />} />
        <Route path="/" element={<BaseLayoutUser />}>
          <Route index element={<Home />} />
          <Route path={RoutePath.ABOUT} element={<About />} />
          <Route path={RoutePath.SEARCH} element={<Search />} />
          <Route path={RoutePath.CONTACT} element={<Contact />} />

        </Route>
        <Route path={RoutePath.ADMIN} element={auth ? <BaseLayoutAdmin /> : <Navigate to={`/${RoutePath.LOGIN}`} />} >
          <Route path={RoutePath.CATEGORY} element={<CatePage />} />
          <Route path={RoutePath.ACCOUNT} element={<AccountPage />} />

          <Route path="payments" element={<ListPayment />} />
          <Route path="products" element={<ListProduct />} />
          <Route path="tables" element={<ListTable />} />
          <Route path="product-add" element={<AddProduct />} />
          <Route path="tables-order" element={<DetailOrderTable />} />
          <Route path="customers" element={<DashboardSizes />} />
          {/* <Route path="customers" element={<DashboardCustomers/>} /> */}
         </Route>
      </Routes>
    </>
  );
};

export default Router;