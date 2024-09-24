import { EOrderStatus, EOrderType } from "../constants/enum";

interface Payment {
    id: number;
    name: string;
    status: number;
}
export interface IBill {
    id: number;
    ma_bill: string;
    user_id: number;
    customer_id: number;
    user_addresses_id: number | null;
    order_date: string;
    total_amount: string;
    branch_address: string;
    payment: Payment;
    voucher_id: number | null;
    note: string | null;
    order_type: EOrderType;
    products: Product[];
    status: EOrderStatus;
    created_at: string | null;
    updated_at: string | null;
}

export interface IBillDetail {
    id: number;
    ma_bill: string;
    user_id: number;
    customer_id: number;
    user_addresses_id: number | null;
    order_date: string;
    total_amount: string;
    branch_address: string;
    payment: Payment;
    voucher_id: number | null;
    note: string | null;
    order_type: EOrderType;
    products: Product[];
    status: EOrderStatus; // Thêm trạng thái nếu cần
    created_at: string | null;
    updated_at: string | null;
}

interface Product {
    id: number;
    bill_id: number;
    product_detail: ProductDetail;
    quantity: number;
    price: string | null;
    created_at: string | null;
    updated_at: string | null;
}

interface ProductDetail {
    id: number;
    size: Size;
    price: string;
    quantity: number;
    sale: string;
    status: number;
    images: any[]; // Có thể thay đổi nếu bạn biết chính xác kiểu của `images`
    product_id: number;
    created_at: string;
    updated_at: string;
}

interface Size {
    id: number;
    name: string;
    status: number;
}