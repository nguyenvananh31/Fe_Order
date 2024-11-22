import { Layout } from 'antd';
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { HeaderMain } from './HeaderMain';
import Sidebar from './Sidebar';
import SpinnerLoader from '../../components/loader';
import SidebarOder from './SidebarOder';

const { Header, Content, Footer } = Layout;

const BaseLayoutAdmin: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <Header style={{ padding: 0, backgroundColor: "transparent", minHeight: "78px" }}>
          <HeaderMain />
        </Header>
        <Content style={{ margin: '24px 24px 0 24px' }}>
          <Suspense fallback={<SpinnerLoader />}>
            <Outlet></Outlet>
          </Suspense>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          DATN ©{new Date().getFullYear()} Yagi
        </Footer>
      </Layout>
      <SidebarOder />
    </Layout>
  );
};

export default BaseLayoutAdmin;