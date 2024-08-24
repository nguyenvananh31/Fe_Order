import { Breadcrumb, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const BaseLayoutAdmin = () => {
  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Header />
        <Content style={{ margin: "0 16px" }}>
          <div>
            <Outlet></Outlet>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayoutAdmin;
