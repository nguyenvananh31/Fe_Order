import { Avatar, Layout, Menu } from "antd";
import React, { useState } from "react";
import { LISTMENU } from "./menu";

const { Sider } = Layout;


const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);


  return (
    <Sider
      className="drop-shadow-primary max-xl:hidden"
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        bottom: 0
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
              <h1 className="text-xl font-bold">Logo Branch</h1>
            </div>
          )}
        </div>
      </div>
      <Menu
        defaultSelectedKeys={['1']}
        // defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={LISTMENU}
      />
    </Sider>
  );
};

export default Sidebar;
