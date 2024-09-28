import { Menu } from 'antd';
import { AppstoreOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

const SideBarsOrder: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`h-full ${collapsed ? 'w-24' : 'w-[300px]'} transition-all static duration-300 bg-bgColor1`}>
      <div className="flex items-center justify-center py-4">
        <h1 className={`text-mainColor1 text-2xl font-bold ${collapsed ? 'hidden' : 'block'}`}>YAGI ORDER</h1>
      </div>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        className="h-full"
      >
        {/* Trang Order */}
        <Menu.Item key="1" icon={<ShoppingCartOutlined />}>
          <Link to="/orders">Trang Order</Link>
        </Menu.Item>

        {/* Danh mục */}
        <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Danh mục">
          <Menu.Item key="2">
            <Link to="/categories/food">Thức ăn</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
      <div className="absolute bottom-4 left-4">
        <button
          className="text-white bg-blue-500 px-4 py-1 rounded hover:bg-blue-600"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? 'Expand' : 'Collapse'}
        </button>
      </div>
    </div>
  );
};

export default SideBarsOrder;
