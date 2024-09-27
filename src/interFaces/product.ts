
export interface IProduct {
  id: number;
  name: string;
  thumbnail: string;
  status: number;
  category: ICate;
  product_details: ProductDetail[];
  created_at: string;
  updated_at: string;
}

interface ICate {
  id: number;
  name: string;
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

export interface ProductDetail {
  id: number;
  size: ProductSize;
  price: string;
  quantity: number;
  sale: string;
  status: number;
  images: IImg[];
  product_id: number;
  created_at: string;
  updated_at: string;
}

interface IImg {
  id: number;
  product_detail_id: number;
  name: string;
}