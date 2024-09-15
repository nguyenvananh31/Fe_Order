// Interface cho Size
interface Size {
    id: number;
    name: string;
    status: number;
  }
  
  // Interface cho ProductDetail
  interface ProductDetail {
    id: number;
    size: Size;
    price: number | string;
    quantity: number;
    sale: string;
    status: number;
    images: string[];
    product_id: number;
    created_at: string;
    updated_at: string;
  }
  
  // Interface cho Product
 export interface IProduct {
    id: number;
    name: string;
    thumbnail?: string;
    status: number;
    sub_categories_id: number;
    product_details?: ProductDetail[];
    created_at: string;
    updated_at: string;
  }
  