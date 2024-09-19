import { Navigate, Route, Routes } from "react-router-dom";
import BaseLayoutAdmin from "../layout/admin/BaseLayoutAdmin";

import Search from "antd/es/transfer/search";
import { RoutePath } from "../constants/path";
import useAuth from "../hooks/redux/auth/useAuth";
import About from "../pages/user/About/About";
import Contact from "../pages/user/Contact/Contact";

import Cart from "../pages/user/Cart/Cart";
import Checkout from "../pages/user/Checkout/Checkout";

import Home from "../pages/user/Home/Home";
import { privateProtectedFlattenRoutes, publicProtectedFlattenRoutes } from "./app";
import BaseLayoutUser from "../pages/user/BaseLayoutUser";
import ListProducts from "../pages/user/Product/Products";


const Router = () => {
  const { user } = useAuth();

  return (
    <>
      <Routes>
        {/* page without authen */}
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
        </Route>
        <Route path={RoutePath.ADMIN} element={user ? !!user.roles.length ? <BaseLayoutAdmin /> : <Navigate to={RoutePath.HOME} /> : <Navigate to={`/${RoutePath.LOGIN}`} />} >
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