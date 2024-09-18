import { ResponeBase } from "../../../../interFaces/common.types";
import { Icustomer } from "../../../../interFaces/custommers";
import ApiUtils from "../../../../utils/api/api.utils";


const apiName = {
    customer: '/api/admin/customers',
};

export const apiGetCustomers = async (params?: any) => {
    const res = await ApiUtils.fetch<any, ResponeBase<Icustomer[]>>(apiName.customer, params);
    return res;
}

export const apiGetOneCustomer = async (id: number) => {
    const res = await ApiUtils.fetch<number, ResponeBase<Icustomer>>(`${apiName.customer}/${id}`);
    return res;
}

export const apiCreateCus = async (body: FormData) => {
    const res = await ApiUtils.post<any, any>(apiName.customer, body);
    return res;
}