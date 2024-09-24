
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