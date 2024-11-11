import ApiUtils from "../../../../utils/api/api.utils"


const apiName = {
    table: '/api/client/order_table',
    payment: '/api/client/list_payments'
}

export const apiGetTableClient = async (params?: any) => {
    return await ApiUtils.fetch<any, any>(apiName.table, params);
}

export const apiGetPayments = async (params?: any) => {
    return await ApiUtils.fetch<any, any>(apiName.payment, params);
}
