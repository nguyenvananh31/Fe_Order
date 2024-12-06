
export interface ICart {
    id: number;
    quantity: number;
    sale: number;
    price: number;
    product_detail_id: number;
    product_name: string;
    product_thumbnail: string;
    product_price: string;
    product_sale: string;
    size_name: string;
    user_id: number;
    user_name: string | null;
}