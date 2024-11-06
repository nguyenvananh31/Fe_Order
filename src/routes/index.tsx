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
  privateProtectedFlattenRoutes,
  publicProtectedFlattenRoutes,
} from "./app";

import BaseLayoutOrder from "../pages/user/BaseLayoutOrder";
import Error from "../pages/user/Error/Error";
import Order from "../pages/user/Order/Order";
// import ProductCates from "../pages/user/Order/ProductCates";
import ProductByCate from "../pages/user/Product/ProductByCate";
import ProductDetail from "../pages/user/ProductDetail/ProductDetail";
import FormInforProfile from "../pages/user/profiles/infoProfiles/FormInforProfile";
import Table from "../pages/user/Table/Table";
import ProtectedRoute from "./PrivateRoute";
import ProductCates from "../pages/user/Order/ProductCates";
import EditProfile from "../pages/user/profiles/editProfiles/editProfile";
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

          <Route path={RoutePath.ORDER} element={<Order />} />
          
          {/* Profile */}
          <Route path={RoutePath.PROFILE} element={<Profiles />}>
            <Route index element={<FormInforProfile />} />
            <Route path={RoutePath.EDIT_PROFILE}element={<EditProfile />} />
          </Route>

          {/* <Route path={RoutePath.ORDER} element={<Order />} /> */}
          <Route path={RoutePath.PRODUCT_CATE} element={<ProductByCate />} />
        </Route>
        {/* order page */}
        <Route path={RoutePath.ORDER} element={<BaseLayoutOrder />}>
          <Route index element={<Order />} />
          <Route path="/order/cate/:id" element={<ProductCates />} />
        </Route>
        <Route path="*" element={<Error/>} />
        <Route path={RoutePath.ADMIN} element={ <PrivateRoute><BaseLayoutAdmin /></PrivateRoute>} >
          {
            privateProtectedFlattenRoutes.map((route, index) => (
              <Route path={route.path} element={route.element} key={index} />
            ))
          }
          {privateProtectedFlattenRoutes.map((route, index) => (
            <Route path={route.path} element={route.element} key={index} />
          ))}
        </Route>
      </Routes>
    </>
  );
};

export default Router;
