import { Avatar, Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { LISTMENU } from "./menu";
import { useLocation } from "react-router-dom";
import { menuActive, menuPath } from "../../constants/path";

const { Sider } = Layout;


const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const loaction = useLocation();
  const [activeMenu, setActiveMenu] = useState<(string)[]>(['']);

  useEffect(() => {
    let menu: string = loaction.pathname.split('/').pop() || '';

    if (+menu) {
      let pathParts = location.pathname.split('/');
      menu = pathParts[pathParts.length - 2] || '';
    }
    if (menuPath[menu] && collapsed) {
      setActiveMenu([menuActive[menu] || menu, menuPath[menu]]);
    } else {
      setActiveMenu([menu]);
    }
  }, [loaction, collapsed])

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
              <h1 className="text-xl font-bold">Nhà Hàng Yagi</h1>
            </div>
          )}
        </div>
      </div>
      <Menu
        selectedKeys={[activeMenu[0] || '']}
        openKeys={activeMenu[1] ? [activeMenu[1]] : undefined}
        mode="inline"
        theme="light"
        items={LISTMENU}
      />
    </Sider>
  );
};

export default Sidebar;
