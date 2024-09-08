import {
  FileTextOutlined,
  MailOutlined,
  SettingOutlined
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Layout, Menu } from "antd";
import React, { useState } from "react";
import { RoutePath } from "../../constants/path";

const { Sider } = Layout;



type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: <MailOutlined />,
    children: [
      {
        key: 'g1',
        label: 'Item 1',
        type: 'group',
        children: [
          { key: '1', label: 'Option 1' },
          { key: '2', label: 'Option 2' },
        ],
      },
      {
        key: 'g2',
        label: 'Item 2',
        type: 'group',
        children: [
          { key: '3', label: 'Option 3' },
          { key: '4', label: 'Option 4' },
        ],
      },
    ],
  },
  {
    key: 'cate',
    label: (
      <a href={`http://localhost:5173/admin/${RoutePath.CATEGORY}`}>Danh mục sản phẩm</a>
    ),
    icon: <FileTextOutlined />,
  },
  {
    key: 'sub4',
    label: 'Navigation Three',
    icon: <SettingOutlined />,
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      { key: '11', label: 'Option 11' },
      { key: '12', label: 'Option 12' },
    ],
  },
  {
    key: 'grp',
    label: 'Group',
    type: 'group',
    children: [
      { key: '13', label: 'Option 13' },
      { key: '14', label: 'Option 14' },
    ],
  },
];

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
        items={items}
      />
    </Sider>
  );
};

export default Sidebar;
