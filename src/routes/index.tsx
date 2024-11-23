import { Route, Routes } from "react-router-dom";
import BaseLayoutAdmin from "../layout/admin/BaseLayoutAdmin";

import Search from "antd/es/transfer/search";
import { RouteConfig } from "../constants/path";
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
        <Route path={RouteConfig.HOME} element={<BaseLayoutUser />}>
          <Route index element={<Home />} />
          <Route path={RouteConfig.ABOUT} element={<About />} />
          <Route path={RouteConfig.SEARCH} element={<Search />} />
          <Route path={RouteConfig.CONTACT} element={<Contact />} />
          <Route path={RouteConfig.CART} element={<Cart />} />
          <Route path={RouteConfig.CHECKOUT} element={<Checkout />} />
          <Route path={RouteConfig.PRODUCTS} element={<ListProducts />} />

          <Route path={RouteConfig.CLINET_PRODUCTS} element={<ListProducts />} />
          <Route path={RouteConfig.PRODUCT_DETAIL} element={<ProductDetail />} />

          <Route path={RouteConfig.TABLE} element={<Table />} />

          {/* Profile */}
          <Route path={RouteConfig.PROFILE} element={<Profiles />}>
            <Route index element={<FormInforProfile />} />
            <Route path={RouteConfig.EDIT_PROFILE} element={<EditProfile />} />
            <Route path={RouteConfig.BILL} element={<Bill />} />
          </Route>

          <Route path={RouteConfig.PRODUCT_CATE} element={<ProductByCate />} />
        </Route>
        {/* order page */}
        {
          orderFlattenRoutes.map((route, index) => (
            <Route path={route.path} element={route.element} key={index} />
          ))
        }

        <Route path="*" element={<Error />} />
        <Route path={RouteConfig.ADMIN} element={<PrivateRoute><BaseLayoutAdmin /></PrivateRoute>} >
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
