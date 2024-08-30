import React, { useState } from "react";
import {

    UserOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { NavLink, Outlet } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const LayoutAdmin: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    items={[
                        {
                            key: "1",
                            icon: <UserOutlined />,
                            label: <NavLink to="/admin/">Thống kê</NavLink>,
                        },
                        {
                            key: "2",
                            icon: <VideoCameraOutlined />,
                            label: <NavLink to="/admin/vouchers">Vouchers</NavLink>,
                        },
                        {
                            key: "3",
                            icon: <UserOutlined />,
                            label: <NavLink to="/admin/payments">Payments</NavLink>,
                        }
                        
                    ]}
                />
            </Sider>
            <Layout>
               
                <Content className="m-3">
                   
                    <div className="p-2 my-2 min-h-screen"
                        style={{
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
      
            </Layout>
        </Layout>
    );
};

export default LayoutAdmin;