export interface Icustomer{
    id:number , 
    name:string,
    phone_number:number,
    diemthuong:number,
    user_id:string
    email: string;
}

export interface IAddress {
    id: number;
    address: string;
    city: string;
    country: string;
    is_default: number;
    fullname: string;
    phone: string;
    commune: string;
    postal_code: string;
}