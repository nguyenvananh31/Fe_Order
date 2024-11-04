import ApiUtils from "../../../../utils/api/api.utils"

const apiName = {
    products: '/api/client/products_details',
    proByCateId: '/api/client/product_cate',
    getOrderByBillId: '/api/client/order_cart',
    cate: '/api/client/category',
    addCartPro: '/api/client/order_cart'
}

export const apiGetProForOrder = async () => {
    return await ApiUtils.fetch<any, any>(apiName.products);
}

export const apiGetProByCateId = async (id: number) => {
    return await ApiUtils.fetch<any, any>(apiName.proByCateId + '/' + id);
}

export const apiGetOrderByBillId = async (id: number) => {
    return await ApiUtils.fetch<any, any>(apiName.getOrderByBillId + '/' + id);
}

export const apiGetOrderCate = async () => {
    return await ApiUtils.fetch<any, any>(apiName.cate);
}

export const apiAddOrderPro = async (body: any) => {
    return await ApiUtils.post(apiName.addCartPro, body);
}