import { Route, Routes } from "react-router-dom";
import BaseLayoutAdmin from "../layout/admin/BaseLayoutAdmin";
import BaseLayoutOder from "../layout/views/BaseLayoutOder";


const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<BaseLayoutAdmin />}></Route>
        <Route path="orders" element={<BaseLayoutOder />}></Route>
      </Routes>
    </>
  );
};

export default Router;