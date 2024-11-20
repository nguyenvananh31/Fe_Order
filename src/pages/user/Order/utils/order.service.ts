import ApiUtils from "../../../../utils/api/api.utils"

const apiName = {
    products: '/api/client/products_details',
    proByCateId: '/api/client/product_cate',
    getOrderByBillId: '/api/client/order_cart',
    cate: '/api/client/category',
    addCartPro: '/api/client/order_cart',
    bill: '/api/client/bill_online',
    orderPro: '/api/client/oder_item',
    saveBill: '/api/client/pay_bill',
}

export const apiGetProForOrder = async () => {
    return await ApiUtils.fetch<any, any>(apiName.products);
}

export const apiGetProByCateId = async (id: number) => {
    return await ApiUtils.fetch<any, any>(apiName.proByCateId + '/' + id);
}

export const apiGetOrderByBillId = async (id: string) => {
    return await ApiUtils.fetch<any, any>(apiName.getOrderByBillId + '/' + id);
}

export const apiUpdateOrderCart = async (body: any) => {
    return await ApiUtils.put<any, any>(apiName.addCartPro, body);
}

export const apiDelOrderCart = async (id: number) => {
    return await ApiUtils.remove<any, any>(apiName.addCartPro + '/' + id);
}

export const apiOrderPros = async (body: any) => {
    return await ApiUtils.post<any, any>(apiName.orderPro, body);
}

export const apiGetOrderCate = async () => {
    return await ApiUtils.fetch<any, any>(apiName.cate);
}

export const apiAddOrderPro = async (body: any) => {
    return await ApiUtils.post(apiName.addCartPro, body);
}

export const apiGetbillDetailOnline = async (body?: any) => {
    return await ApiUtils.post<any, any>(apiName.bill, body);
}

export const apiSaveBill = async (body: any) => {
    return await ApiUtils.put<any, any>(apiName.saveBill, body);
}