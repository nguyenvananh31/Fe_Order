import { Route, Routes } from "react-router-dom";
import DashboardPayments from "../dashboard/payments/DashboardPayments";
import BaseLayoutAdmin from "../layout/admin/BaseLayoutAdmin";
import ListCategories from "../pages/admin/Categories/ListCategories";
import { RoutePath } from "../constants/path";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path={RoutePath.ADMIN} element={<BaseLayoutAdmin />}>
          <Route index element={<DashboardPayments />} />
          <Route path={RoutePath.CATEGORY} element={<ListCategories />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
