
export enum PAGINATE_DEFAULT {
    LIMIT = 5
}

//Quyền admin
export enum ROLES {
    ADMIN = 'admin',
    QTV = 'qtv',
    SHIPPER = 'shipper',
    USER = 'user',
    CUSTOMER = 'customer',
    CATEGORIES = 'categories',
    SIZE = 'size',
    VOUCHER = 'voucher',
    TABLE = 'table',
    PRODUCT = 'product',
    PAYMENT = 'payment',
    BILL = 'bill',
    CTV = 'ctv',
}

//order type
export enum EOrderType {
    In_restaurant = 'in_restaurant',
    Online = 'online'
}

//Order status
export enum EOrderStatus {
    Pending = 'pending',
    Confirmed = 'confirmed',
    Preparing = 'preparing',
    Shipping = 'shipping',
    Completed = 'completed',
    Cancelled = 'cancelled',
    Failed = 'failed',
    cancellation_requested = 'cancellation_requested',
    cancellation_approved = 'cancellation_approved',
    cancellation_rejected = 'cancellation_rejected',
}

//Order type pro
export enum EOrderProStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

//Permission
export enum EPermisstion {
    USER,
    CUSTOMER,
    CATEGORY,
    SIZE,
    VOUCHER,
    TABLE,
    PRODUCT,
    PAYMENT,
    BILL
}

//Permission qtv
export enum EPermisstionQTV {
    TABLE,
    PRODUCT,
    CUSTOMER,
    CATEGORY,
    SIZE,
    VOUCHER,
}

//Permission qtv
export enum EPermisstionStaff {
    TABLE,
    CUSTOMER,
}

//Status table client
export enum EStatusTable {
    OPEN = 'open',
    CLOSE = 'close',
    PENDING = 'pending'
}

export enum PUSHER_CHANNEL {
    BILL_ORDER = 'bill',
    CALL = 'call',
    CART = 'cart',
}