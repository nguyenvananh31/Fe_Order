export const RoutePath = {
    //Client
    HOME: '/',
    ABOUT : 'about',
    PRODUCTS : 'products',
    PROFILE:'profile',
    CLINET_PRODUCTS: 'product',
    PRODUCT_DETAIL: 'product/:id',
    INFO_PROFILES:"infoProfiles",


    //Admin
    ADMIN: 'admin',
    ACCOUNT: 'accounts',
    CATEGORY: 'categories',
    LOGIN : 'login',
    REGISTER : 'register',
    CHECKOUT : 'checkout',
    ORDER : 'order',
    TABLE : 'table',
    CONTACT : 'contact',
    CART : 'cart',
    SEARCH : 'search',
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
    VOUCHER : 'vouchers'
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