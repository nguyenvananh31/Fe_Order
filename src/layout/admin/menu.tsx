// components/SharedMenu.tsx
import { ClockCircleOutlined, FileSearchOutlined, FileTextOutlined, GiftOutlined, HomeOutlined, InboxOutlined, LineHeightOutlined, PayCircleOutlined, TruckOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { RouteConfig, RoutePath } from "../../constants/path";
import { ROLES } from "../../constants/enum";

// type MenuItem = Required<MenuProps>['items'][number];

export const LISTMENU: any[] = [
  {
    key: RoutePath.ADMIN,
    label: (
      <Link to={RouteConfig.ADMIN}>Trang chủ</Link>
    ),
    icon: <HomeOutlined />,
    permission: [ROLES.ADMIN],
  },
  {
    key: RoutePath.ACCOUNT,
    label: (
      <Link to={RouteConfig.ACCOUNT}>Quản lý tài khoản</Link>
    ),
    icon: <UserOutlined />,
    permission: [ROLES.ADMIN, ROLES.USER],
  },
  {
    key: RoutePath.CUSTOMERS,
    label: (
      <Link to={RouteConfig.CUSTOMERS}>Quản lý khách hàng</Link>
    ),
    icon: <UsergroupAddOutlined />,
    permission: [ROLES.ADMIN, ROLES.CUSTOMER],
  },
  {
    key: RoutePath.CATEGORY,
    label: (
      <Link to={RouteConfig.CATEGORY}>Quản lý danh mục</Link>
    ),
    icon: <FileTextOutlined />,
    permission: [ROLES.ADMIN, ROLES.CATEGORIES],
  },
  {
    key: RoutePath.SIZES,
    label: (
      <Link to={RouteConfig.SIZES}>Quản lý kích thước</Link>
    ),
    icon: <LineHeightOutlined />,
    permission: [ROLES.ADMIN, ROLES.SIZE],
  },
  {
    key: RoutePath.ADMIN_PRODUCT_MAIN,
    label: 'Quản lý sản phẩm',
    icon: <InboxOutlined />,
    children: [
      {
        key: RoutePath.ADMIN_PRODUCT, label: (
          <Link to={RouteConfig.ADMIN_PRODUCT}>Danh sách sản phẩm</Link>
        )
      },
      {
        key: RoutePath.ADMIN_ADD_PRODUCT, label: (
          <Link to={RouteConfig.ADMIN_ADD_PRODUCT}>Thêm sản phẩm</Link>
        )
      }
    ],
    permission: [ROLES.ADMIN, ROLES.PRODUCT],
  },
  {
    key: RoutePath.ADMIN_TABLE_MAIN,
    label: 'Quản lý bàn',
    icon: <ClockCircleOutlined />,
    children: [
      {
        key: RoutePath.ADMIN_TABLE, label: (
          <Link to={RouteConfig.ADMIN_TABLE}>Danh sách bàn</Link>
        )
      },
      // {
      //   key: RoutePath.ADMIN_TABLE_ORDER, label: (
      //     <Link to={RouteConfig.ADMIN_TABLE_ORDER}>Danh sách đặt bàn</Link>
      //   )
      // }
    ],
    permission: [ROLES.ADMIN, ROLES.TABLE],
  },
  {
    key: RoutePath.AD_BILL,
    icon: <FileSearchOutlined />,
    label: (
      <Link to={RouteConfig.AD_BILL}>Quản lý đơn</Link>
    ),
    permission: [ROLES.ADMIN, ROLES.BILL],
  },
  {
    key: RoutePath.PAYMENT,
    icon: <PayCircleOutlined />,
    label: (
      <Link to={RouteConfig.PAYMENT}>Quản lý thanh toán</Link>
    ),
    permission: [ROLES.ADMIN, ROLES.PAYMENT],
  },
  {
    key: RoutePath.VOUCHER,
    icon: <GiftOutlined />,
    label: (
      <Link to={RouteConfig.VOUCHER}>Quản lý khuyến mại</Link>
    ),
    permission: [ROLES.ADMIN, ROLES.VOUCHER],
  },
  {
    key: RoutePath.SHIPPER,
    icon: <TruckOutlined />,
    label: (
      <Link to={RouteConfig.SHIPPER}>Quản lý giao hàng</Link>
    ),
    permission: [ROLES.ADMIN, ROLES.SHIPPER],
  },
];
