import { IBill, IBillDetail } from "../../../../interFaces/bill";
import { ResponeBase } from "../../../../interFaces/common.types";
import ApiUtils from "../../../../utils/api/api.utils"

const apiName = {
    bill: '/api/admin/bills',
    billDetail: '/api/admin/billsDetail',
}

export const apiGetBils = async (params?: any) => {
    const res = await ApiUtils.fetch<any, ResponeBase<IBill[]>>(apiName.bill, params);
    return res;
}

export const apiGetOneBill = async (id: number) => {
    const res = await ApiUtils.fetch<any, ResponeBase<IBill>>(`${apiName.bill}/${id}`);
    return res;
}

export const apiGetOneBillDetail = async (id: number) => {
    const res = await ApiUtils.fetch<any, ResponeBase<IBillDetail[]>>(`${apiName.billDetail}/${id}`);
    return res;
}

export const apiUpdateStatusBill = async (id: number, status: any) => {
    const res = await ApiUtils.put<any, ResponeBase<IBill>>(`${apiName.bill}/${id}`, status);
    return res;
}