import { EOrderStatus, EOrderType } from "../constants/enum";

interface Customer {
    id: number;
    name: string | null;
    email: string | null;
    is_locked: boolean;
  }
  
export interface IBill {
    id: number;
    ma_bill: string;
    khachhang: Customer;
    addresses: string | null;
    order_date: string;
    total_amount: string;
    branch_address: string | null;
    payment: string;
    voucher: string | null;
    note: string | null;
    order_type: string;
    status: string;
    created_at: string | null;
    updated_at: string | null;
  }


export interface IBillDetail {
    id: number;
    name: string;
    thumbnail: string;
    size: string;
    quantity: number;
    price: string;
    total: number;
}
