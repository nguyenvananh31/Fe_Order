import ApiUtils from "../../../../utils/api/api.utils"

const apiName = {
    table: '/api/admin/tables',
    tableOder: '/api/admin/bill_table',
    aciveItem: '/api/admin/acive_item'
}

export const apiGetTables = async (params?: any) => {
    const res = await ApiUtils.fetch<any, any>(apiName.table, params);
    return res;
}

export const apiGetTableDetail = async (id: number) => {
    const res = await ApiUtils.fetch<number, any>(`${apiName.tableOder}/${id}`);
    return res;
}

export const apiAddTable = async (body: any) => {
    return await ApiUtils.post<any, any>(apiName.table, body);
}

export const apiActiveItem = async (body: any) => {
    return await ApiUtils.put<any, any>(apiName.aciveItem, body);
}