
export interface IUser {
  id?: number | string;
  point?: number;
  phone?: string;
  gender?: string;
  name?: string;
  email?: string;
  avatar?: string;
  token?: string;
  password?: string;
}

export interface ResponeBase<T> {
  data: T;
  meta: {
    total: number;
    current_page: number;
  }
}

