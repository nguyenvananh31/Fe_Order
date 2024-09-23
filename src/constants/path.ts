export const RoutePath = {
    //Client
    HOME: '/',
    PRODUCT_DETAIL: 'product/:id',


    //Admin
    ADMIN: 'admin',
    ACCOUNT: 'accounts',
    CATEGORY: 'categories',
    LOGIN : 'login',
    REGISTER : 'register',
    ABOUT : 'about',
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