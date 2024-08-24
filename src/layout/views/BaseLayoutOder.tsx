import { Layout } from "antd";
import HeaderUsers from "./Header";
import { Outlet } from "react-router-dom";

const BaseLayoutOder = () => {
  return (
    <Layout>
      <HeaderUsers />
      <div>
        <Outlet></Outlet>
      </div>
    </Layout>
  );
};
export default BaseLayoutOder;
