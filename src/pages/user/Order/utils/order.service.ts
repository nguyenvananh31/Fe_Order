import ApiUtils from "../../../../utils/api/api.utils"

const apiName = {
    products: '/api/client/products_details',
    proByCateId: '/api/client/'
}

export const apiGetProForOrder = async () => {
    return await ApiUtils.fetch<any, any>(apiName.products);
}