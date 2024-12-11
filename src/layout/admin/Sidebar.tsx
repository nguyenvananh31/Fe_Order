import { Avatar, Layout, Menu } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Subscription } from "rxjs";
import { RouteConfig } from "../../constants/path";
import { BaseEventPayload, EventBusName } from "../../utils/event-bus";
import EventBus from "../../utils/event-bus/event-bus";
import useMenu from "./useMenu";

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { activeMenu, handleChange, menuItem } = useMenu();
  const subscriptions = useRef(new Subscription());
  const navigate = useNavigate();

  useEffect(() => {
    registerEventBus();

    return () => {
      subscriptions.current.unsubscribe();
    };
  }, []);

  const registerEventBus = () => {
    subscriptions.current = new Subscription();
    subscriptions.current.add(
      EventBus.getInstance().events.subscribe((data: BaseEventPayload<{ isOpen: boolean, orderId: number }>) => {
        if (data.type === EventBusName.ON_SHOW_SiDE_ORDER) {
          setCollapsed(prev => {
            handleChange([], prev);
            return data.payload.isOpen;
          });
        }
      })
    );
  };
  
  const closeNav = useCallback((value: boolean) => {
    setCollapsed(value);
    handleChange([], !value);
  }, []);
 
  const handleGotoHome = () => {
    navigate(RouteConfig.ADMIN);
  }

  return (
    <Sider
      className="drop-shadow-primary max-xl:hidden"
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        bottom: 0,
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={closeNav}
      width={260}
    >
      <div className={`m-1 justify-around py-3 flex items-center`}>
        <div onClick={handleGotoHome} className="cursor-pointer flex gap-2 items-center">
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
        openKeys={activeMenu[1] && !collapsed ? activeMenu[1] : undefined}
        mode="inline"
        theme="light"
        items={menuItem}
        onOpenChange={handleChange}
      />
    </Sider>
  );
};

export default Sidebar;
