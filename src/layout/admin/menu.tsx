// components/SharedMenu.tsx
import { FileTextOutlined, MailOutlined, SettingOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { RoutePath } from "../../constants/path";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

export const LISTMENU: MenuItem[] = [
  {
    key: RoutePath.ACCOUNT,
    label: (
      <a href={RoutePath.ACCOUNT}>Quản lý tài khoản</a>
    ),
    icon: <UserOutlined />,
  },
  {
    key: RoutePath.CUSTOMERS,
    label: (
      <a href={RoutePath.CUSTOMERS}>Quản lý khách hàng</a>
    ),
    icon: <UsergroupAddOutlined />,
  },
  {
    key: RoutePath.CATEGORY,
    label: (
      <a href={RoutePath.CATEGORY}>Quản lý danh mục</a>
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
