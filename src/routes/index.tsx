import { Route, Routes } from "react-router-dom";
import BaseLayoutAdmin from "../layout/admin/BaseLayoutAdmin";

import { RouteConfig } from "../constants/path";

import Cart from "../pages/user/Cart/Cart";

import BaseLayoutUser from "../pages/user/BaseLayoutUser";
import Home from "../pages/user/Home/Home";
import ListProducts from "../pages/user/Product/Products";
import Profiles from "../pages/user/profiles/Profiles";
import {
  clientFlattenRoutes,
  orderFlattenRoutes,
  privateProtectedFlattenRoutes,
  profileFlattenRoutes,
  publicProtectedFlattenRoutes,
} from "./app";

import Error from "../pages/user/Error/Error";
import ProductByCate from "../pages/user/Product/ProductByCate";
import ProductDetail from "../pages/user/ProductDetail/ProductDetail";
import FormInforProfile from "../pages/user/profiles/infoProfiles/FormInforProfile";
import Table from "../pages/user/Table/Table";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/admin/Dashboard/Dashboard";

const Router = () => {
  return (
    <>
      <Routes>
        {/* Login && Regiter */}
        {publicProtectedFlattenRoutes.map((route, index) => (
          <Route path={route.path} element={route.element} key={index} />
        ))}

        <Route path={RouteConfig.HOME} element={<BaseLayoutUser />}>
          <Route index element={<Home />} />
          <Route path={RouteConfig.CART} element={<Cart />} />
          <Route path={RouteConfig.CLINET_PRODUCTS} element={<ListProducts />} />
          <Route path={RouteConfig.PRODUCT_DETAIL} element={<ProductDetail />} />
          <Route path={RouteConfig.PRODUCT_CATE} element={<ProductByCate />} />
          <Route path={RouteConfig.TABLE} element={<Table />} />

          {
            clientFlattenRoutes.map((route, index) => (
              <Route path={route.path} element={route.element} key={index} />
            ))
          }

          {/* <Route path={RouteConfig.ABOUT} element={<About />} /> */}
          {/* <Route path={RouteConfig.SEARCH} element={<Search />} /> */}
          {/* <Route path={RouteConfig.CONTACT} element={<Contact />} /> */}
          {/* <Route path={RouteConfig.CHECKOUT} element={<Checkout />} /> */}

          {/* Profile */}
          <Route path={RouteConfig.PROFILE} element={<Profiles />}>
            <Route index element={<FormInforProfile />} />
            {
              profileFlattenRoutes.map((route, index) => (
                <Route path={route.path} element={route.element} key={index} />
              ))
            }
          </Route>
        </Route>

        {/* order page */}
        {
          orderFlattenRoutes.map((route, index) => (
            <Route path={route.path} element={route.element} key={index} />
          ))
        }

        <Route path={RouteConfig.ADMIN} element={<PrivateRoute><BaseLayoutAdmin /></PrivateRoute>} >
          <Route index element={<Dashboard />} />
          {
            privateProtectedFlattenRoutes.map((route, index) => (
              <Route path={route.path} element={route.element} key={index} />
            ))
          }
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default Router;
