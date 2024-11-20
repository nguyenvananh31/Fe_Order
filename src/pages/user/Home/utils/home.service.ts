import ApiUtils from "../../../../utils/api/api.utils"

const apiName = {
    productDetailClient: '/api/client/products_details',
    cateClient: '/api/client/category'
}

export const apiGetProDetail = async (params?: any) => {
    return await ApiUtils.fetch<any, any>(apiName.productDetailClient, params);
}

export const apiGetCateClient = async (params?: any) => {
    return await ApiUtils.fetch<any, any>(apiName.cateClient, params);
}