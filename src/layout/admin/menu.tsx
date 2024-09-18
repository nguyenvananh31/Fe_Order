// components/SharedMenu.tsx
import { FileTextOutlined, MailOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { RoutePath } from "../../constants/path";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

export const LISTMENU: MenuItem[] = [
  {
    key: '1',
    label: (
      <a href={`http://localhost:5173/admin/${RoutePath.ACCOUNT}`}>Quản lý tài khoản</a>
    ),
    icon: <UserOutlined />,
  },
  {
    key: '2',
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
