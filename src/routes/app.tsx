import { lazy } from "react";
import { RouteProps } from "react-router-dom";
import { RouteConfig } from "../constants/path";
import GuestGuard from "../components/GuestGuard";
import ProtectedRoute from "../components/ProtectedRoute";
import { ROLES } from "../constants/enum";

//Auth
const LoginScreen = lazy(() => import('../pages/auth/Login/Login'));
const RegisterScreen = lazy(() => import('../pages/auth/Register/Register'));
const ForgotScreen = lazy(() => import('../pages/auth/Forgot'));
const ResetPassScreen = lazy(() => import('../pages/auth/Forgot/ResetPass'));

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

const DetailOrderTable = lazy(() => import('../pages/admin/Vouchers'));

//Quản lý giao hàng
const ShipperPage = lazy(() => import('../pages/admin/Shipper'));

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
        name: 'Đăng ký tài khoản',
        element: <GuestGuard>
            <RegisterScreen />
        </GuestGuard>
    },
    {
        path: RouteConfig.FORGOT,
        name: 'Quên mật khẩu',
        element: <GuestGuard>
            <ForgotScreen />
        </GuestGuard>
    },
    {
        path: RouteConfig.RESETPASS,
        name: 'Thay đổi mật khẩu',
        element: <GuestGuard>
            <ResetPassScreen />
        </GuestGuard>
    },
];

// Quản lý admin
const accountRoutes: IRoutesProperties[] = [
    {
        path: RouteConfig.ACCOUNT,
        name: 'Quản lý tài khoản',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN, ROLES.USER]}>
            <AccountScreen />
        </ProtectedRoute>
    },
    {
        path: RouteConfig.CATEGORY,
        name: 'Quản lý danh mục',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN, ROLES.CATEGORIES]}>
            <CateScreen />
        </ProtectedRoute>
    },
    {
        path: RouteConfig.SIZES,
        name: 'Quản lý kích thước',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN, ROLES.SIZE]}>
            <SizesScreen />
        </ProtectedRoute>
    },
    {
        path: RouteConfig.PAYMENT,
        name: 'Quản lý phương thức thanh toán',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN, ROLES.PAYMENT]}>
            <PaymentsScreen />
        </ProtectedRoute>
    },
    {
        path: RouteConfig.ADMIN_TABLE,
        name: 'Quản lý bàn',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN, ROLES.TABLE]}>
            <TableScreen />
        </ProtectedRoute>
    },
    {
        path: RouteConfig.ADMIN_TABLE_ORDER,
        name: 'Quản lý bàn đặt',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN]}>
            <DetailOrderTable />
        </ProtectedRoute>
    },

    {
        path: `${RouteConfig.ADMIN_EDIT_PRODUCT}/:id`,
        name: 'Sửa sản phẩm',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN, ROLES.PRODUCT]}>
            <EditProductScreen />
        </ProtectedRoute>
    },
    {
        path: RouteConfig.ADMIN_PRODUCT,
        name: 'Quản lý sản phẩm',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN, ROLES.PRODUCT]}>
            <ProductScreen />
        </ProtectedRoute>
    },
    {
        path: RouteConfig.ADMIN_ADD_PRODUCT,
        name: 'Quản lý thêm sản phẩm',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN, ROLES.PRODUCT]}>
            <AddProductScreen />
        </ProtectedRoute>
    },
    {
        path: RouteConfig.CUSTOMERS,
        name: 'Quản lý khách hàng',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN, ROLES.CUSTOMER]}>
            <CustomerScreen />
        </ProtectedRoute>
    },
    {
        path: RouteConfig.VOUCHER,
        name: 'Quản lý Voucher',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN, ROLES.VOUCHER]}>
            <ListVoucher />
        </ProtectedRoute>
    },
    {
        path: RouteConfig.AD_BILL,
        name: 'Quản lý đơn',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN, ROLES.BILL]}>
            <BillScreen />
        </ProtectedRoute>
    },
    {
        path: RouteConfig.SHIPPER,
        name: 'Quản lý giao hàng',
        element: <ProtectedRoute allowedRoles={[ROLES.QTV, ROLES.ADMIN, ROLES.SHIPPER]}>
            <ShipperPage />
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
];

const EditProfile = lazy(() => import('../pages/user/profiles/editProfiles/editProfile'));
const Bill = lazy(() => import('../pages/user/profiles/billProfiles/bill'));

// Profile page
const profileRoutes: IRoutesProperties[] = [
    {
        path: RouteConfig.EDIT_PROFILE,
        element: <EditProfile />
    },
    {
        path: RouteConfig.BILL,
        element: <Bill />
    },
];

const About = lazy(() => import('../pages/user/About/About'));
const Contact = lazy(() => import('../pages/user/Contact/Contact'));
const Checkout = lazy(() => import('../pages/user/Checkout/Checkout'));
// const Contact = lazy(() => import('../pages/user/Contact/Contact'));


// Client route
const clientRoutes: IRoutesProperties[] = [
    {
        path: RouteConfig.ABOUT,
        element: <About />
    },
    {
        path: RouteConfig.CONTACT,
        element: <Contact />
    },
    {
        path: RouteConfig.CHECKOUT,
        element: <Checkout />
    },
    // {
    //     path: RouteConfig.CONTACT,
    //     element: <Contact />
    // },
];

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
export const profileFlattenRoutes = flattenRoutes([...profileRoutes]);
export const clientFlattenRoutes = flattenRoutes([...clientRoutes]);
export const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);
export const privateProtectedFlattenRoutes = flattenRoutes([...privateRoutes]);