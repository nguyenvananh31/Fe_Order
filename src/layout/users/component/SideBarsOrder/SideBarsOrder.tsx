import { Menu } from 'antd';
import { AppstoreOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './SideBarsOrder.scss'
import axios from 'axios';
const { SubMenu } = Menu;
interface ISubcategory {
  id: number;
  name: string;
  product: ISubcategory[];
}
interface ICategory {
  id: number;
  name: string;
  parent_id: number;
  subcategory: ISubcategory[];
}
const SideBarsOrder: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [cates, setCates] = useState<ICategory[]>([]);
  // const [subCates, setSubCates] = useState([]);

  const url = 'http://127.0.0.1:8000/api/client/category/';
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(url, {
          headers: {
            'Api_key': import.meta.env.VITE_API_KEY,
          },
        });
        // console.log(data.data);
        // setSubCates(data.data.subcategory)
        setCates(data.data)        
      } catch (error) {
        console.log(error);
      }
    })()

  }, []);

  return (
    <div className={`h-full ${collapsed ? 'w-24' : 'w-[300px]'} order-side-bars transition-all static duration-300 bg-bgColor1`}>
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
          <Link to="/order">Trang Order</Link>
        </Menu.Item>

        {/* Danh mục */}
        {cates.map((cate) => (
          <SubMenu key={cate.id} icon={<AppstoreOutlined />} className='capitalize' title={cate.name}>
            {cate.subcategory.map((subCate) => (
              <Menu.Item key={subCate.id}>
                <Link className='capitalize text-[13px] ml-3' to={`cate/${subCate.id}`}>{subCate.name}</Link>
              </Menu.Item>
            ))}
          </SubMenu>
        ))}
        {/* <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Danh mục">
          <Menu.Item key="2">
            <Link to="#">Thức ăn</Link>
          </Menu.Item>
        </SubMenu> */}
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
