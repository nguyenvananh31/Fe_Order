// components/SharedMenu.tsx
import { ClockCircleOutlined, FileTextOutlined, GiftOutlined, InboxOutlined, LineHeightOutlined, PayCircleOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
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
    key: RoutePath.ADMIN_PRODUCT_MAIN,
    label: 'Quản lý sản phẩm',
    icon: <InboxOutlined />,
    children: [
      { key: RoutePath.ADMIN_PRODUCT, label: (
        <Link to={RoutePath.ADMIN_PRODUCT}>Danh sách sản phẩm</Link>
      ) },
      {
        key: RoutePath.ADMIN_ADD_PRODUCT, label: (
          <Link to={RoutePath.ADMIN_ADD_PRODUCT}>Thêm sản phẩm</Link>
        )
      }
    ],
  },
  {
    key: RoutePath.ADMIN_TABLE_MAIN,
    label: 'Quản lý bàn',
    icon: <ClockCircleOutlined />,
    children: [
      { key: RoutePath.ADMIN_TABLE, label: (
        <Link to={RoutePath.ADMIN_TABLE}>Danh sách bàn</Link>
      ) },
      {
        key: RoutePath.ADMIN_TABLE_ORDER, label: (
          <Link to={RoutePath.ADMIN_TABLE_ORDER}>Danh sách Order bàn</Link>
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
