import { Icate } from "../../../../interFaces/categories";
import { ResponeBase } from "../../../../interFaces/common.types";
import ApiUtils from "../../../../utils/api/api.utils";


const apiName = {
    cate: '/api/admin/category',
};

export const apiGetCate = async (params?: any) => {
    const res = await ApiUtils.fetch<any , ResponeBase<Icate[]>>(apiName.cate, params);
    return res;
}

export const apiCreateCate = async (body: FormData) => {
    const res = await ApiUtils.postForm<FormData, ResponeBase<Icate>>(apiName.cate, body);
    return res;
}

export const apiGetOneCate = async (id: number) => {
    const res = await ApiUtils.fetch<number , Icate>(`${apiName.cate}/${id}`);
    return res;
}

export const apiDeleteCate = async (id: number) => {
    const res = await ApiUtils.remove<number, any>(`${apiName.cate}/${id}`);
    return res;
}

