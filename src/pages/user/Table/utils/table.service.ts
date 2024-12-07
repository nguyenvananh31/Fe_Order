import ApiUtils from "../../../../utils/api/api.utils"


const apiName = {
    table: '/api/client/order_table',
    payment: '/api/client/list_payments',
    open_table: '/api/client/open_table',
    open_tables: '/api/client/open_tables',
}

export const apiGetTableClient = async (params?: any) => {
    return await ApiUtils.fetch<any, any>(apiName.table, params);
}

export const apiGetPayments = async (params?: any) => {
    return await ApiUtils.fetch<any, any>(apiName.payment, params);
}

export const apiOpenTable = async (body: any) => {
    return await ApiUtils.post<any, any>(apiName.open_table, body);
}

export const apiOpenTables = async (body: any) => {
    return await ApiUtils.post<any, any>(apiName.open_tables, body);
}
