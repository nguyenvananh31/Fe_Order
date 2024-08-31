import { Route, Routes } from "react-router-dom";
import DashboardPayments from "../dashboard/payments/DashboardPayments";
import BaseLayoutAdmin from "../layout/admin/BaseLayoutAdmin";
import ListCategories from "../pages/admin/Categories/ListCategories";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="admin" element={<BaseLayoutAdmin />}>
          <Route index element={<DashboardPayments />} />
          <Route path="categories" element={<ListCategories />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
