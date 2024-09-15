import { Navigate, Route, Routes } from "react-router-dom";
import BaseLayoutAdmin from "../layout/admin/BaseLayoutAdmin";

import Search from "antd/es/transfer/search";
import { RoutePath } from "../constants/path";
import useAuth from "../hooks/redux/auth/useAuth";
import About from "../pages/user/About/About";
import Contact from "../pages/user/Contact/Contact";
import Home from "../pages/user/Home/Home";
import { privateProtectedFlattenRoutes, publicProtectedFlattenRoutes } from "./app";
import BaseLayoutUser from "../pages/user/BaseLayoutUser";

const Router = () => {
  const { auth } = useAuth();

  return (
    <>
      <Routes>
        {/* page without authen */}
        <Route>
          {publicProtectedFlattenRoutes.map((route, index) => (
            <Route path={route.path} element={route.element} key={index} />
          ))}
        </Route>
        <Route path="/" element={<BaseLayoutUser />}>
          <Route index element={<Home />} />
          <Route path={RoutePath.ABOUT} element={<About />} />
          <Route path={RoutePath.SEARCH} element={<Search />} />
          <Route path={RoutePath.CONTACT} element={<Contact />} />
        </Route>
        <Route path={RoutePath.ADMIN} element={auth ? <BaseLayoutAdmin /> : <Navigate to={`/${RoutePath.LOGIN}`} />} >
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