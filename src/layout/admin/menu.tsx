// components/SharedMenu.tsx
import { ClockCircleOutlined, FileSearchOutlined, FileTextOutlined, GiftOutlined, HomeOutlined, InboxOutlined, LineHeightOutlined, PayCircleOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { Link } from "react-router-dom";
import { RouteConfig, RoutePath } from "../../constants/path";

type MenuItem = Required<MenuProps>['items'][number];

export const LISTMENU: MenuItem[] = [
  {
    key: RoutePath.ADMIN,
    label: (
      <Link to={RouteConfig.ADMIN}>Trang chủ</Link>
    ),
    icon: <HomeOutlined />,
  },
  {
    key: RoutePath.ACCOUNT,
    label: (
      <Link to={RouteConfig.ACCOUNT}>Quản lý tài khoản</Link>
    ),
    icon: <UserOutlined />,
  },
  {
    key: RoutePath.CUSTOMERS,
    label: (
      <Link to={RouteConfig.CUSTOMERS}>Quản lý khách hàng</Link>
    ),
    icon: <UsergroupAddOutlined />,
  },
  {
    key: RoutePath.CATEGORY,
    label: (
      <Link to={RouteConfig.CATEGORY}>Quản lý danh mục</Link>
    ),
    icon: <FileTextOutlined />,
  },
  {
    key: RoutePath.SIZES,
    label: (
      <Link to={RouteConfig.SIZES}>Quản lý kích thước</Link>
    ),
    icon: <LineHeightOutlined />,
  },
  {
    key: RoutePath.ADMIN_PRODUCT_MAIN,
    label: 'Quản lý sản phẩm',
    icon: <InboxOutlined />,
    children: [
      { key: RoutePath.ADMIN_PRODUCT, label: (
        <Link to={RouteConfig.ADMIN_PRODUCT}>Danh sách sản phẩm</Link>
      ) },
      {
        key: RoutePath.ADMIN_ADD_PRODUCT, label: (
          <Link to={RouteConfig.ADMIN_ADD_PRODUCT}>Thêm sản phẩm</Link>
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
        <Link to={RouteConfig.ADMIN_TABLE}>Danh sách bàn</Link>
      ) },
      {
        key: RoutePath.ADMIN_TABLE_ORDER, label: (
          <Link to={RouteConfig.ADMIN_TABLE_ORDER}>Danh sách đặt bàn</Link>
        )
      }
    ],
  },
  {
    key: RoutePath.AD_BILL,
    icon: <FileSearchOutlined />,
    label: (
      <Link to={RouteConfig.AD_BILL}>Quản lý đơn</Link>
    ),
  },
  {
    key: RoutePath.PAYMENT,
    icon: <PayCircleOutlined />,
    label: (
      <Link to={RouteConfig.PAYMENT}>Quản lý thanh toán</Link>
    ),
  },
  {
    key: RoutePath.VOUCHER,
    icon: <GiftOutlined />,
    label: (
      <Link to={RouteConfig.VOUCHER}>Quản lý khuyến mại</Link>
    ),
  },
];
