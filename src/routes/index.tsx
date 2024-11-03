import { Route, Routes } from "react-router-dom";
import BaseLayoutAdmin from "../layout/admin/BaseLayoutAdmin";

import Search from "antd/es/transfer/search";
import { RoutePath } from "../constants/path";
import About from "../pages/user/About/About";
import Contact from "../pages/user/Contact/Contact";

import Cart from "../pages/user/Cart/Cart";
import Checkout from "../pages/user/Checkout/Checkout";

import BaseLayoutUser from "../pages/user/BaseLayoutUser";
import Home from "../pages/user/Home/Home";
import ListProducts from "../pages/user/Product/Products";
import Profiles from "../pages/user/profiles/Profiles";
import {
  orderFlattenRoutes,
  privateProtectedFlattenRoutes,
  publicProtectedFlattenRoutes,
} from "./app";

import Error from "../pages/user/Error/Error";
import ProductByCate from "../pages/user/Product/ProductByCate";
import ProductDetail from "../pages/user/ProductDetail/ProductDetail";
import Bill from "../pages/user/profiles/billProfiles/bill";
import EditProfile from "../pages/user/profiles/editProfiles/editProfile";
import FormInforProfile from "../pages/user/profiles/infoProfiles/FormInforProfile";
import Table from "../pages/user/Table/Table";
import PrivateRoute from "./PrivateRoute";

const Router = () => {
  return (
    <>
      <Routes>
        <Route>
          {publicProtectedFlattenRoutes.map((route, index) => (
            <Route path={route.path} element={route.element} key={index} />
          ))}
        </Route>
        <Route path={RoutePath.HOME} element={<BaseLayoutUser />}>
          <Route index element={<Home />} />
          <Route path={RoutePath.ABOUT} element={<About />} />
          <Route path={RoutePath.SEARCH} element={<Search />} />
          <Route path={RoutePath.CONTACT} element={<Contact />} />
          <Route path={RoutePath.CART} element={<Cart />} />
          <Route path={RoutePath.CHECKOUT} element={<Checkout />} />
          <Route path={RoutePath.PRODUCTS} element={<ListProducts />} />

          <Route path={RoutePath.CLINET_PRODUCTS} element={<ListProducts />} />
          <Route path={RoutePath.PRODUCT_DETAIL} element={<ProductDetail />} />

          <Route path={RoutePath.TABLE} element={<Table />} />

          {/* Profile */}
          <Route path={RoutePath.PROFILE} element={<Profiles />}>
            <Route index element={<FormInforProfile />} />
            <Route path={RoutePath.EDIT_PROFILE}element={<EditProfile />} />
            <Route path={RoutePath.BILL}element={<Bill />} />
          </Route>

          <Route path={RoutePath.PRODUCT_CATE} element={<ProductByCate />} />
        </Route>
        {/* order page */}
        {
          orderFlattenRoutes.map((route, index) => (
            <Route path={route.path} element={route.element} key={index} />
          ))
        }

        <Route path="*" element={<Error />} />
        <Route path={RoutePath.ADMIN} element={<PrivateRoute><BaseLayoutAdmin /></PrivateRoute>} >
          {
            privateProtectedFlattenRoutes.map((route, index) => (
              <Route path={route.path} element={route.element} key={index} />
            ))
          }
        </Route>
      </Routes>
    </>
  );
};

export default Router;
