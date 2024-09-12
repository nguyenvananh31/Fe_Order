import { ICate, ICateReq } from "../../../../interFaces/categories";
import { ResponeBase } from "../../../../interFaces/common.types";
import ApiUtils from "../../../../utils/api/api.utils";


const apiName = {
    cate: '/api/admin/category',
    updateStatus: '/api/admin/category/update',
};

export const apiGetCates = async (params?: any) => {
    const res = await ApiUtils.fetch<any , ResponeBase<ICate[]>>(apiName.cate, params);
    return res;
}

export const apiCreateCate = async (body: FormData) => {
    const res = await ApiUtils.postForm<FormData, ResponeBase<ICate>>(apiName.cate, body);
    return res;
}

export const apiUpdateCate = async (id:number, body: FormData) => {
    const res = await ApiUtils.putForm<FormData, ResponeBase<ICate>>(`${apiName.cate}/${id}`, body);
    return res;
}

export const apiGetOneCate = async (id: number) => {
    const res = await ApiUtils.fetch<number , ResponeBase<ICate>>(`${apiName.cate}/${id}`);
    return res;
}

export const apiDeleteCate = async (id: number) => {
    const res = await ApiUtils.remove<number, any>(`${apiName.cate}/${id}`);
    return res;
}

export const apiChangeStatus = async (id: number, body: ICateReq) => {
    const res = await ApiUtils.post<any, any>(`${apiName.updateStatus}/${id}/status`, body);
    return res;
}

