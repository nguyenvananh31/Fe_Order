import { ResponeBase } from "../../../../interFaces/common.types"
import { Isize } from "../../../../interFaces/size"
import ApiUtils from "../../../../utils/api/api.utils"

const apiName = {
    sizes: '/api/admin/sizes',
    updateStatus: '/api/admin/size_status'
}

export const apiGetSizes = async (params?: any) => {
    const res = await ApiUtils.fetch<any, ResponeBase<Isize[]>>(apiName.sizes, params);
    return res;
}

export const apiCreateSize = async (body: any) => {
    const res = await ApiUtils.postForm<any, ResponeBase<Isize>>(apiName.sizes, body);
    return res;
}

export const apiUpdateSize = async (id: number, body: any) => {
    const res = await ApiUtils.put<any, ResponeBase<Isize>>(`${apiName.sizes}/${id}`, body);
    return res;
}

export const apiUpdateStatusSize = async (id: number) => {
    const res = await ApiUtils.put<number, any>(`${apiName.updateStatus}/${id}`);
    return res;
}

export const apiGetOneSize = async (id: number) => {
    const res = await ApiUtils.fetch<number, ResponeBase<Isize>>(`${apiName.sizes}/${id}`);
    return res;
}

export const apiDeleteSize = async (id: number) => {
    const res = await ApiUtils.remove<number, any>(`${apiName.sizes}/${id}`);
    return res;
}