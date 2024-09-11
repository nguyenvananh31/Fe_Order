import { Navigate, Route, Routes } from "react-router-dom";
import BaseLayoutAdmin from "../layout/admin/BaseLayoutAdmin";

import { RoutePath } from "../constants/path";
import useAuth from "../hooks/redux/auth/useAuth";
import AccountPage from "../pages/admin/Account/index.page";
import CatePage from "../pages/admin/Categories/index.page";
import Login from "../pages/admin/Login/Login";
import Register from "../pages/admin/Register/Register";

const Router = () => {
  const { auth } = useAuth();

  return (
    <>
      <Routes>
        <Route path={RoutePath.LOGIN} element={auth ? <Navigate to={`/${RoutePath.ADMIN}`} /> : <Login />} />
        <Route path={RoutePath.REGISTER} element={auth ? <Navigate to={`/${RoutePath.ADMIN}`} /> : <Register />} />
        <Route path="/" element={<BaseLayoutAdmin />}>
        </Route>
        <Route path={RoutePath.ADMIN} element={auth ? <BaseLayoutAdmin /> : <Navigate to={`/${RoutePath.LOGIN}`} />} >
          <Route path={RoutePath.CATEGORY} element={<CatePage />} />
          <Route path={RoutePath.ACCOUNT} element={<AccountPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;