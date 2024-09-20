// components/SharedMenu.tsx
import { ClockCircleOutlined, FileTextOutlined, GiftOutlined, LineHeightOutlined, PayCircleOutlined, SettingOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { Link } from "react-router-dom";
import { RoutePath } from "../../constants/path";

type MenuItem = Required<MenuProps>['items'][number];

export const LISTMENU: MenuItem[] = [
  {
    key: RoutePath.ACCOUNT,
    label: (
      <Link to={RoutePath.ACCOUNT}>Quản lý tài khoản</Link>
    ),
    icon: <UserOutlined />,
  },
  {
    key: RoutePath.CUSTOMERS,
    label: (
      <Link to={RoutePath.CUSTOMERS}>Quản lý khách hàng</Link>
    ),
    icon: <UsergroupAddOutlined />,
  },
  {
    key: RoutePath.CATEGORY,
    label: (
      <Link to={RoutePath.CATEGORY}>Quản lý danh mục</Link>
    ),
    icon: <FileTextOutlined />,
  },
  {
    key: RoutePath.SIZES,
    label: (
      <Link to={RoutePath.SIZES}>Quản lý kích thước</Link>
    ),
    icon: <LineHeightOutlined />,
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
    icon: <ClockCircleOutlined />,
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
  {
    key: RoutePath.PAYMENT,
    icon: <PayCircleOutlined />,
    label: (
      <Link to={RoutePath.PAYMENT}>Payment</Link>
    ),
  },
  {
    key: RoutePath.VOUCHER,
    icon: <GiftOutlined />,
    label: (
      <Link to={RoutePath.VOUCHER}>Voucher</Link>
    ),
  },
];
