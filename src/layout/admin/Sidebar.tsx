import { Avatar, Layout, Menu } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { LISTMENU } from "./menu";
import useMenu from "./useMenu";
import { BaseEventPayload, EventBusName } from "../../utils/event-bus";
import EventBus from "../../utils/event-bus/event-bus";
import { Subscription } from "rxjs";

const { Sider } = Layout;


const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { activeMenu, handleChange } = useMenu();
  const subscriptions = useRef(new Subscription());

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
          !collapsed && setCollapsed(true);
          handleChange([], undefined, collapsed);
        }
      })
    );
  };

  const closeNav = (value: boolean) => {
    setCollapsed(value);
    handleChange([], !value);
  }

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
      onCollapse={closeNav}
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
        openKeys={activeMenu[1] && !collapsed ? activeMenu[1] : undefined}
        mode="inline"
        theme="light"
        items={LISTMENU}
        onOpenChange={handleChange}
      />
    </Sider>
  );
};

export default Sidebar;
