import React, { useState, useEffect } from 'react';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const AsideMain = () => {
  type MenuItem = Required<MenuProps>['items'][number];
  const { Sider } = Layout;

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem("Profile", '1', <UserOutlined />), 
    {
      key: '2',
      label: <Link to ="/admin">Bill</Link>,
      icon: <BellOutlined />,
    },
  ];

  const [selectedKey, setSelectedKey] = useState<string>(() => {
    return localStorage.getItem('selectedKey') || '1';
  });

  useEffect(() => {
    localStorage.setItem('selectedKey', selectedKey);
  }, [selectedKey]);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setSelectedKey(e.key);
  };


  return (
    <Sider  className="h-full" width="auto">
      <Menu
        className="w-full"
        theme="light"
        selectedKeys={[selectedKey]}
        mode="inline"
        items={items}
        onClick={handleMenuClick}
      />
    </Sider>
  );
};

export default AsideMain;
