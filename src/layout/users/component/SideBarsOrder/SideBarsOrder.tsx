import { AppstoreOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ApiUtils from '../../../../utils/api/api.utils';
import './SideBarsOrder.scss';
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

interface IState {
  loading: boolean;
  loadingBtn: boolean;
  refresh: boolean;
  cates: any[];
}

const initState: IState = {
  loading: false,
  loadingBtn: false,
  refresh: false,
  cates: [],
}

const SideBarsOrder: React.FC = () => {
  const [state, setState] = useState<IState>(initState);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setState(prev => ({ ...prev, loading: true }));
        const data = await apiGetCategory();
        setState(prev => ({ ...prev, loading: true,cates: data.data }));
      } catch (error) {
        console.log(error);
        setState(prev => ({ ...prev, loading: true }));
      }
    })()

  }, []);

  const apiGetCategory = useCallback(async () => {
    return await ApiUtils.fetch<any, any>('/api/client/category');
  }, []);

  return (
    <div className={`h-full ${collapsed ? 'w-24' : 'w-[300px]'} order-side-bars transition-all static duration-300 bg-bgColor1`}>
      <div className="flex items-center justify-center py-4">
        <h1 className={`text-mainColor1 text-2xl font-bold ${collapsed ? 'hidden' : 'block'}`}>YAGI ORDER</h1>
      </div>
      <Menu
        defaultSelectedKeys={['0']}
        // defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        className="h-full"
      >
        {/* Trang Order */}
        <Menu.Item key="0" icon={<ShoppingCartOutlined />}>
          <Link to="/order">Trang Order</Link>
        </Menu.Item>

        {/* Danh mục */}
        {state.cates.map((cate) => (
          <SubMenu key={cate.id} icon={<AppstoreOutlined />} className='capitalize' title={cate.name}>
            <Menu.Item>
              <Link className='capitalize text-[13px] ml-3' to={`cate/${cate.id}`}>{cate.name}</Link>
            </Menu.Item>
            {cate.subcategory.map((subCate: any) => (
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
