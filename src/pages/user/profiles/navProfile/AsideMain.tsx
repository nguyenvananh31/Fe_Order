import { BellOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RouteConfig } from '../../../../constants/path';

const AsideMain = () => {
  type MenuItem = Required<MenuProps>['items'][number];
  const { Sider } = Layout;

  const items: MenuItem[] = [
    {
      key: '1',
      label: <Link to ={RouteConfig.PROFILE}>Thông tin tài khoản</Link>,
      icon: <UserOutlined />,
    },
    {
      key: '2',
      label: <Link to ={RouteConfig.BILL}>Bill</Link>,
      icon: <BellOutlined />,
    },

    {
      key: '3',
      label: <Link to ={RouteConfig.EDIT_PROFILE}>Đổi mật khẩu</Link>,
      icon: <BellOutlined />,
    },
    {
      key: '4',
      label: <div className='cursor-pointer'>Đăng xuất</div>,
      icon: <BellOutlined />,
    },
  ];

  const [selectedKey, setSelectedKey] = useState<string>(() => {
    // return localStorage.getItem('selectedKey') || '1';
    return '1';
  });

  useEffect(() => {
    localStorage.setItem('selectedKey', selectedKey);
  }, [selectedKey]);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    // setSelectedKey(e.key);
  };


  return (
    <Sider theme="light" className="h-full rounded" width="auto">
      <Menu
        className="w-full rounded"
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
