import ApiUtils from "../../../../utils/api/api.utils"

const apiName = {
    getProbyCate: '/api/client/product_cate',
    cate: '/api/client/category'
}

export const apiGetProByCate = async (id: number, params?: any) => {
    return await ApiUtils.fetch<any, any>(`${apiName.getProbyCate}/${id}`, params);
}

export const apiGetCate = async (id: number) => {
    return await ApiUtils.fetch<any, any>(`${apiName.cate}/${id}`);
}