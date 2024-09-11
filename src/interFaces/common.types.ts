
export interface IUser {
  id: number;
  point?: number;
  phone?: string;
  gender?: string;
  name?: string;
  email?: string;
  avatar?: string;
  token?: string;
  password?: string;
  roles: IRole[];
  is_locked: boolean;
}

export interface IRole {
  id: number;
  name: string;
  status: number;
}

export interface ResponeBase<T> {
  data: T;
  meta: {
    total: number;
    current_page: number;
  }
}

export interface ReqBase {
  page?: number;
  per_page?: number;
}

