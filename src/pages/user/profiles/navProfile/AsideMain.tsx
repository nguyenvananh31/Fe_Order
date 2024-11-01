import { useState, useEffect } from 'react';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const AsideMain = () => {
  type MenuItem = Required<MenuProps>['items'][number];
  const { Sider } = Layout;




  const items: MenuItem[] = [
    {
      key: '1',
      label: <Link to ="/profile">Thông tin tài khoản</Link>,
      icon: <UserOutlined />,
    },
    {
      key: '2',
      label: <Link to ="/profile/bill">Bill</Link>,
      icon: <BellOutlined />,
    },

    {
      key: '3',
      label: <Link to ="/profile/editProfile">Đổi mật khẩu</Link>,
      icon: <BellOutlined />,
    },
    {
      key: '4',
      label: <div className='cursor-pointer'>Đăng xuất</div>,

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
