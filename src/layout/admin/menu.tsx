// components/SharedMenu.tsx
import { FileTextOutlined, UserOutlined } from "@ant-design/icons";
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
];
