
export enum PAGINATE_DEFAULT {
    LIMIT = 5
}

//Quyền admin
export enum ROLES {
    ADMIN = 'admin',
    QTV= 'qtv'
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
    Failed = 'failed'
}

//Permission
export enum EPermisstion {
    USER ,
    CUSTOMER , 
    CATEGORY ,
    SIZE , 
    VOUCHER  , 
    TABLE , 
    PRODUCT , 
    PAYMENT , 
    BILL
}

//Permission qtv
export enum EPermisstionQTV {
    TABLE , 
    PRODUCT , 
    CUSTOMER , 
    CATEGORY ,
    SIZE , 
    VOUCHER  , 
}

//Permission qtv
export enum EPermisstionStaff {
    TABLE , 
    CUSTOMER ,
}