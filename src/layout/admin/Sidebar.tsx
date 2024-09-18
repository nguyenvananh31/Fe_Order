import { Avatar, Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { LISTMENU } from "./menu";
import { useLocation } from "react-router-dom";

const { Sider } = Layout;


const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const loaction = useLocation();
  const [activeMenu, setActiveMenu] = useState<string[]>(['']);

  useEffect(() => {
      const menu: string = loaction.pathname.split('/').pop() || '';
      setActiveMenu([menu]);
  }, [loaction])

  return (
    <Sider
      className="drop-shadow-primary max-xl:hidden"
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        bottom: 0,
        height: '100vh'
      }}
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={260}
    >
      <div className={`m-1 justify-around py-3 flex items-center`}>
        <div className="flex gap-2 items-center">
          <Avatar src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg' />
          {!collapsed && (
            <div
              className={`transition-all duration-500 ${!collapsed ? 'animate-slideIn' : 'animate-slideOut'
                }`}
            >
              <h1 className="text-xl font-bold">Yagi</h1>
            </div>
          )}
        </div>
      </div>
      <Menu
        selectedKeys={activeMenu}
        mode="inline"
        theme="light"
        items={LISTMENU}
      />
    </Sider>
  );
};

export default Sidebar;
