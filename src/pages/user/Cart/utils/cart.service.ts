import { ResponeBase } from "../../../../interFaces/common.types"
import ApiUtils from "../../../../utils/api/api.utils"

const apiName = {
    cart: '/api/client/online_cart'
}

export const apiGetCart = async (params?: any) => {
    return await ApiUtils.fetch<any, ResponeBase<any>>(apiName.cart, params);
}