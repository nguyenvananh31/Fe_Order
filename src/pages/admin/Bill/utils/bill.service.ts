import ApiUtils from "../../../../utils/api/api.utils"

const apiName = {
    bill: '/api/admin/bill'
}

export const apiGetBils = async (params?: any) => {
    const res = await ApiUtils.fetch<any, any>(apiName.bill, params);
    return res;
}

export const apiGetOneBill = async (id: number) => {
    const res = await ApiUtils.fetch<any, any>(`${apiName.bill}/${id}`);
    return res;
}

export const apiUpdateStatus = async (id: number, status: number) => {
    const res = await ApiUtils.put<number, any>(`${apiName.bill}/${id}`, status);
    return res;
}