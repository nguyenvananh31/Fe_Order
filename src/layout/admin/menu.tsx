// components/SharedMenu.tsx
import { FileTextOutlined, MailOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { RoutePath } from "../../constants/path";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

export const LISTMENU: MenuItem[] = [
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
    key: 'account',
    label: (
      <a href={`http://localhost:5173/admin/${RoutePath.ACCOUNT}`}>Quản lý tài khoản</a>
    ),
    icon: <UserOutlined />,
  },
  {
    key: 'cate',
    label: (
      <a href={`http://localhost:5173/admin/${RoutePath.CATEGORY}`}>Quản lý danh mục</a>
    ),
    icon: <FileTextOutlined />,
  },
  {
    key: 'product',
    label: 'Sản phẩm',
    icon: <SettingOutlined />,
    children: [
      { key: 'product-list', label: (
        <Link to={`products`}>Danh sách sản phẩm</Link>
      ) },
      {
        key: 'product-add', label: (
          <Link to={`product-add`}>Thêm sản phẩm</Link>
        )
      }
    ],
  },
  {
    key: 'table',
    label: 'Quản lý bàn',
    children: [
      { key: 'tables', label: (
        <Link to={`tables`}>Danh sách bàn</Link>
      ) },
      {
        key: 'tables-order', label: (
          <Link to={`tables-order`}>Danh sách Order bàn</Link>
        )
      }
    ],
  },
];
