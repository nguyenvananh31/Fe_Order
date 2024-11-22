import { lazy } from "react";
import { RouteProps } from "react-router-dom";
import { RoutePath } from "../constants/path";
import GuestGuard from "../components/GuestGuard";
import ProtectedRoute from "../components/ProtectedRoute";
import { ROLES } from "../constants/enum";

import ListSize from "../pages/admin/Size/index.page";
import DetailOrderTable from "../pages/admin/Tables/DetailOrderTable";
import ListVoucher from "../pages/admin/Vouchers";

//Auth
const LoginScreen = lazy(() => import('../pages/auth/Login/Login'));
const RegisterScreen = lazy(() => import('../pages/auth/Register/Register'));

//Quản lý tài khoản
const AccountScreen = lazy(() => import('../pages/admin/Account/index.page'));

//Quản lý danh mục
const CateScreen = lazy(() => import('../pages/admin/Categories/index.page'));

//Quản lý phương thức thanh toán
const PaymentsScreen = lazy(() => import('../pages/admin/Payments/index.page'));

//Quản lý kích thước
const SizesScreen = lazy(() => import('../pages/admin/Size/index.page'));

//Quản lý bàn
const TableScreen = lazy(() => import('../pages/admin/Tables/index.page'));

//customers
const CustomerScreen = lazy(() => import('../pages/admin/Customers/index.page'));

//Quản lý sản phẩm
const ProductScreen = lazy(() => import('../pages/admin/Products/index.page'));
const AddProductScreen = lazy(() => import('../pages/admin/Products/components/AddProduct'));
const EditProductScreen = lazy(() => import('../pages/admin/Products/components/EditProduct'));

//Quản lý đơn
const BillScreen = lazy(() => import('../pages/admin/Bill/index.page'));

//Page Order
const OrderPageSceen = lazy(() => import('../pages/user/Order'));
const QRheckOrder = lazy(() => import('../pages/user/Order/QrCheckOrder'));

export interface IRoutesProperties {
    path: RouteProps['path'];
    name?: string;
    element?: RouteProps['element'];
    permission?: string[];
    children?: IRoutesProperties[];
}

// Đăng nhập, đăng ký admin
const authRoutes: IRoutesProperties[] = [
    {
        path: RoutePath.LOGIN,
        name: 'Đăng nhập',
        element: <GuestGuard>
            <LoginScreen />
        </GuestGuard>,
    },
    {
        path: RoutePath.REGISTER,
        name: 'Quên mật khẩu',
        element: <GuestGuard>
            <RegisterScreen />
        </GuestGuard>,
    },
];

// Quản lý admin
const accountRoutes: IRoutesProperties[] = [
    {
        path: RoutePath.ACCOUNT,
        name: 'Quản lý tài khoản',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN]}>
            <AccountScreen />
        </ProtectedRoute>,
    },
    {
        path: RoutePath.CATEGORY,
        name: 'Quản lý danh mục',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN]}>
            <CateScreen />
        </ProtectedRoute>,
    },
    {
        path: RoutePath.SIZES,
        name: 'Quản lý kích thước',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN]}>
            <SizesScreen />,
        </ProtectedRoute>
    },
    {
        path: RoutePath.PAYMENT,
        name: 'Quản lý phương thức thanh toán',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN]}>
            <PaymentsScreen />,
        </ProtectedRoute>
    },
    {
        path: RoutePath.ADMIN_TABLE,
        name: 'Quản lý bàn',
        element: <TableScreen />,
    },
    {
        path: RoutePath.ADMIN_TABLE_ORDER,
        name: 'Quản lý bàn đặt',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN]}>
            <DetailOrderTable />,
        </ProtectedRoute>
    },

    {
        path: `${RoutePath.ADMIN_EDIT_PRODUCT}/:id`,
        name: 'Sửa sản phẩm',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN]}>
            <EditProductScreen />,
        </ProtectedRoute>
    },
    {
        path: RoutePath.ADMIN_PRODUCT,
        name: 'Quản lý sản phẩm',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN]}>
            <ProductScreen />,
        </ProtectedRoute>
    },
    {
        path: RoutePath.ADMIN_ADD_PRODUCT,
        name: 'Quản lý thêm sản phẩm',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN]}>
            <AddProductScreen />,
        </ProtectedRoute>
    },
    {
        path: RoutePath.CUSTOMERS,
        name: 'Quản lý khách hàng',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN]}>
            <CustomerScreen />,
        </ProtectedRoute>
    },
    {
        path: RoutePath.SIZES,
        name: 'Quản lý kích cỡ',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN]}>
            <ListSize />,
        </ProtectedRoute>

    },
    {
        path: RoutePath.VOUCHER,
        name: 'Quản lý Voucher',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN]}>
            <ListVoucher />,
        </ProtectedRoute>
    },
    {
        path: RoutePath.AD_BILL,
        name: 'Quản lý đơn',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN]}>
            <BillScreen />,
        </ProtectedRoute>
    }
];

// Order page
const orderRoutes: IRoutesProperties[] = [
    {
        path: RoutePath.ORDER,
        element: <OrderPageSceen />
    },
    {
        path: RoutePath.CHECK_QR,
        element: <QRheckOrder />
    },
]

export const flattenRoutes = (routes: IRoutesProperties[]) => {
    let flatRoutes: IRoutesProperties[] = [];
    routes = routes || [];
    for (const item of routes) {
        flatRoutes.push(item);
        if (item.children && item.children.length > 0) {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    }
    return flatRoutes;
};

const privateRoutes = [...accountRoutes];
const publicRoutes = [...authRoutes];

export const orderFlattenRoutes = flattenRoutes([...orderRoutes]);
export const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);
export const privateProtectedFlattenRoutes = flattenRoutes([...privateRoutes]);