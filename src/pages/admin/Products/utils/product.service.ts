import { ResponeBase } from "../../../../interFaces/common.types"
import { IProduct, IProductParams } from "../../../../interFaces/product"
import ApiUtils from "../../../../utils/api/api.utils"

const apiName = {
    product: '/api/admin/products'
}

export const apiGetPros = async (params?: IProductParams) => {
    const res = await ApiUtils.fetch<IProductParams, ResponeBase<IProduct[]>>(apiName.product, params);
    return res;
}

export const apiGetOnePro = async (id: number) => {
    const res = await ApiUtils.fetch<number, ResponeBase<IProduct>>(`${apiName.product}/${id}`);
    return res;
}


export const apiAddProduct = async (body: FormData) => {
    const res = await ApiUtils.postForm<FormData, ResponeBase<IProduct>>(apiName.product, body);
    return res;
}

export const apiUpdatePro = async (id: number, body: FormData) => {
    const res = await ApiUtils.postForm<any, ResponeBase<IProduct>>(`${apiName.product}/${id}?_method=PUT`, body);
    return res;
}