import { lazy } from "react";
import { RouteProps } from "react-router-dom";
import { RouteConfig } from "../constants/path";
import GuestGuard from "../components/GuestGuard";
import ProtectedRoute from "../components/ProtectedRoute";
import { ROLES } from "../constants/enum";

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

const ListVoucher = lazy(() => import('../pages/admin/Vouchers'));

const DetailOrderTable  = lazy(() => import('../pages/admin/Vouchers'));

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
        path: RouteConfig.LOGIN,
        name: 'Đăng nhập',
        element: <GuestGuard>
            <LoginScreen />
        </GuestGuard>,
    },
    {
        path: RouteConfig.REGISTER,
        name: 'Quên mật khẩu',
        element: <GuestGuard>
            <RegisterScreen />
        </GuestGuard>,
    },
];

// Quản lý admin
const accountRoutes: IRoutesProperties[] = [
    {
        path: RouteConfig.ACCOUNT,
        name: 'Quản lý tài khoản',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN]}>
            <AccountScreen />
        </ProtectedRoute>,
    },
    {
        path: RouteConfig.CATEGORY,
        name: 'Quản lý danh mục',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN]}>
            <CateScreen />
        </ProtectedRoute>,
    },
    {
        path: RouteConfig.SIZES,
        name: 'Quản lý kích thước',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN]}>
            <SizesScreen />,
        </ProtectedRoute>
    },
    {
        path: RouteConfig.PAYMENT,
        name: 'Quản lý phương thức thanh toán',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN]}>
            <PaymentsScreen />,
        </ProtectedRoute>
    },
    {
        path: RouteConfig.ADMIN_TABLE,
        name: 'Quản lý bàn',
        element: <TableScreen />,
    },
    {
        path: RouteConfig.ADMIN_TABLE_ORDER,
        name: 'Quản lý bàn đặt',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN]}>
            <DetailOrderTable />,
        </ProtectedRoute>
    },

    {
        path: `${RouteConfig.ADMIN_EDIT_PRODUCT}/:id`,
        name: 'Sửa sản phẩm',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN]}>
            <EditProductScreen />,
        </ProtectedRoute>
    },
    {
        path: RouteConfig.ADMIN_PRODUCT,
        name: 'Quản lý sản phẩm',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN]}>
            <ProductScreen />,
        </ProtectedRoute>
    },
    {
        path: RouteConfig.ADMIN_ADD_PRODUCT,
        name: 'Quản lý thêm sản phẩm',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN]}>
            <AddProductScreen />,
        </ProtectedRoute>
    },
    {
        path: RouteConfig.CUSTOMERS,
        name: 'Quản lý khách hàng',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN]}>
            <CustomerScreen />,
        </ProtectedRoute>
    },
    {
        path: RouteConfig.VOUCHER,
        name: 'Quản lý Voucher',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN]}>
            <ListVoucher />,
        </ProtectedRoute>
    },
    {
        path: RouteConfig.AD_BILL,
        name: 'Quản lý đơn',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN]}>
            <BillScreen />,
        </ProtectedRoute>
    }
];

// Order page
const orderRoutes: IRoutesProperties[] = [
    {
        path: RouteConfig.ORDER,
        element: <OrderPageSceen />
    },
    {
        path: RouteConfig.CHECK_QR,
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