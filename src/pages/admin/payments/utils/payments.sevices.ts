
import { ResponeBase } from "../../../../interFaces/common.types";
import { IPayments } from "../../../../interFaces/payments";
import ApiUtils from "../../../../utils/api/api.utils";


const apiName = {
    payments: '/api/admin/payments',
};

export const apiGetPayments = async (params?: any) => {
    const res = await ApiUtils.fetch<any , ResponeBase<IPayments[]>>(apiName.payments, params);
    return res;
}

export const apiCreatePayments = async (body: FormData) => {
    const res = await ApiUtils.postForm<FormData, ResponeBase<IPayments>>(apiName.payments, body);
    return res;
}

export const apiGetOnePayments = async (id: number) => {
    const res = await ApiUtils.fetch<number , IPayments>(`${apiName.payments}/${id}`);
    return res;
}

export const apiDeletePayments = async (id: number) => {
    const res = await ApiUtils.remove<number, any>(`${apiName.payments}/${id}`);
    return res;
}

