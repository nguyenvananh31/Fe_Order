
export interface IProduct {
  id: number;
  name: string;
  thumbnail: string;
  status: number;
  category_id: number;
  product_details: ProductDetail[];
  created_at: string;
  updated_at: string;
}

export interface IProductParams {
  textSearch?: string;
  status?: boolean;
  page: number;
  per_page: number
}

interface ProductSize {
  id: number;
  name: string;
  status: number;
}

interface ProductDetail {
  id: number;
  size: ProductSize;
  price: string;
  quantity: number;
  sale: string;
  status: number;
  images: string[];
  product_id: number;
  created_at: string;
  updated_at: string;
}
