import { RouteProps } from "react-router-dom";
import { RoutePath } from "../constants/path";
import { lazy } from "react";
// import ListProduct from "../pages/admin/Products/ListProduct";
import ListTable from "../pages/admin/Tables/ListTable";
import DetailOrderTable from "../pages/admin/Tables/DetailOrderTable";
import EditProduct from "../pages/admin/Products/EditProducts";
import ListProduct from "../pages/admin/Products/ListProduct";
import AddProduct from "../pages/admin/Products/AddProduct";

//Auth
const LoginScreen = lazy(() => import('../pages/admin/Login/Login'));
const RegisterScreen = lazy(() => import('../pages/admin/Register/Register'));

//Quản lý tài khoản
const AccountScreen = lazy(() => import('../pages/admin/Account/index.page'));
//Quản lý danh mục
const CateScreen = lazy(() => import('../pages/admin/Categories/index.page'));
//Quản lý phương thức thanh toán
const PaymentsScreen = lazy(() => import('../pages/admin/Payments/ListPayment'));
//Quản lý sản phẩm
// const ProductScreen = lazy(() => import('../pages/admin/Products/ListProduct'));
// const AddProductScreen = lazy(() => import('../pages/admin/Products/AddProduct'));
//Quản lý bàn
const TableScreen = lazy(() => import('../pages/admin/Tables/ListTable'));
const OrderTableScreen = lazy(() => import('../pages/admin/Tables/DetailOrderTable'));

//customers
const CustomerScreen = lazy(() => import('../pages/admin/Customers/index.page'));

//sizes
const SizeScreen = lazy(() => import('../pages/admin/sizes/DashboardSizes'));



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
        element: <LoginScreen />,
    },
    {
        path: RoutePath.REGISTER,
        name: 'Quên mật khẩu',
        element: <RegisterScreen />,
    },
];

// Quản lý admin
const accountRoutes: IRoutesProperties[] = [
    {
        path: RoutePath.ACCOUNT,
        name: 'Quản lý tài khoản',
        element: <AccountScreen />,
    },
    {
        path: RoutePath.CATEGORY,
        name: 'Quản lý danh mục',
        element: <CateScreen />,
    },
    {
        path: RoutePath.PAYMENT,
        name: 'Quản lý phương thức thanh toán',
        element: <PaymentsScreen />,
    },
    {
        path: RoutePath.ADMIN_TABLE,
        name: 'Quản lý bàn',
        element: <ListTable />,
    },
    {
        path: RoutePath.ADMIN_TABLE_ORDER,
        name: 'Quản lý bàn đặt',
        element: <DetailOrderTable />,
    },
    {
        path: `${RoutePath.ADMIN_EDIT_PRODUCT}/:id`,
        name: 'Sửa sản phẩm',
        element: <EditProduct />,
    },
    {
        path: RoutePath.ADMIN_PRODUCT,
        name: 'Quản lý sản phẩm',
        element: <ListProduct />,
    },
    {
        path: RoutePath.ADMIN_ADD_PRODUCT,
        name: 'Quản lý thêm sản phẩm',
        element: <AddProduct />,
    },
    {
        path: RoutePath.ADMIN_TABLE,
        name: 'Quản lý bàn',
        element: <TableScreen />,
    },
    {
        path: RoutePath.ADMIN_TABLE_ORDER,
        name: 'Quản lý đặt bàn',
        element: <OrderTableScreen />,
    },
    {
        path:  RoutePath.CUSTOMERS,
        name: 'Quản lý khách hàng',
        element: <CustomerScreen />,
    },
    {
        path:  RoutePath.SIZES,
        name: 'Quản lý kích cỡ',
        element: <SizeScreen />,
    }
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

export const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);
export const privateProtectedFlattenRoutes = flattenRoutes([...privateRoutes]);