export const RoutePath = {
    //Client
    HOME: '/',
    ABOUT: 'about',
    PRODUCTS: 'products',
    PROFILE: 'profile',
    EDIT_PROFILE: 'editProfile',
    CLINET_PRODUCTS: 'product',
    PRODUCT_DETAIL: 'product/:id',
    INFO_PROFILES: "infoProfiles",
    PRODUCT_CATE: 'product/category/:id',
    BILL: 'bill',




    //Admin
    ADMIN: 'admin',
    ACCOUNT: 'accounts',
    CATEGORY: 'categories',
    LOGIN: 'login',
    REGISTER: 'register',
    FORGOT: 'forgot',
    CHECKOUT: 'checkout',
    ORDER: 'order',
    CHECK_QR: 'qr-check/:id',
    TABLE: 'table',
    CONTACT: 'contact',
    CART: 'cart',
    SEARCH: 'search',
    PAYMENT: 'payments',
    ADMIN_PRODUCT_MAIN: 'products-main',
    ADMIN_PRODUCT: 'products',
    ADMIN_ADD_PRODUCT: 'product-add',
    ADMIN_TABLE_MAIN: 'tables-main',
    ADMIN_TABLE: 'tables',
    ADMIN_TABLE_ORDER: 'tables-order',
    CUSTOMERS: 'customers',
    AD_BILL: 'bills',
    SIZES: 'sizes',
    ERROR: 'error',
    ADMIN_EDIT_PRODUCT: 'product-edit',
    VOUCHER: 'vouchers',
    SHIPPER: 'shipper',
}

export const menuPath: { [key: string]: string } = {
    'products': 'products-main',
    'product-edit': 'products-main',
    'product-add': 'products-main',
    'tables': 'tables-main',
    'tables-order': 'tables-main'
}

export const menuActive: { [key: string]: string } = {
    'product-edit': 'products'
}

export const RouteConfig = {
    HOME: '/',
    ABOUT: '/about',
    PROFILE: '/profile',
    EDIT_PROFILE: '/profile/editProfile',
    CLINET_PRODUCTS: '/products',
    PRODUCT_DETAIL: '/product/:id',
    INFO_PROFILES: "/profile/infoProfiles",
    PRODUCT_CATE: '/product/category/:id',
    PRODUCT_CATE_id: '/product/category/',
    BILL: '/profile/bill',
    
    //Admin
    ADMIN: '/admin',
    ACCOUNT: '/admin/accounts',
    CATEGORY: '/admin/categories',
    CHECKOUT: '/checkout',
    ORDER: '/order',
    CHECK_QR: '/qr-check/:id',
    TABLE: '/table',
    CONTACT: '/contact',
    CART: '/cart',
    SEARCH: '/search',
    PAYMENT: '/admin/payments',
    ADMIN_PRODUCT_MAIN: '/admin/products-main',
    ADMIN_PRODUCT: '/admin/products',
    ADMIN_ADD_PRODUCT: '/admin/product-add',
    ADMIN_TABLE_MAIN: '/admin/tables-main',
    ADMIN_TABLE: '/admin/tables',
    ADMIN_TABLE_ORDER: '/admin/tables-order',
    CUSTOMERS: '/admin/customers',
    AD_BILL: '/admin/bills',
    SIZES: '/admin/sizes',
    ADMIN_EDIT_PRODUCT: '/admin/product-edit',
    VOUCHER: '/admin/vouchers',
    SHIPPER: '/admin/shipper',

    // Error page
    ERROR: '/error',

    // Other routes
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT: '/forgot',
    RESETPASS: '/reset-password',
}