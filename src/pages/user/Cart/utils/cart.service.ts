import { ResponeBase } from "../../../../interFaces/common.types"
import ApiUtils from "../../../../utils/api/api.utils"

const apiName = {
    cart: '/api/client/online_cart'
}

export const apiGetCart = async (params?: any) => {
    return await ApiUtils.fetch<any, ResponeBase<any>>(apiName.cart, params);
}

export const apiUpdateCart = async (id: number, body: any) => {
    return await ApiUtils.put<any, any>(`${apiName.cart}/${id}`, body);
}

export const apiDeleteCart = async (id: number) => {
    return await ApiUtils.remove<number, any>(`${apiName.cart}/${id}`);
}