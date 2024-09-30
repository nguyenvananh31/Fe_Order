import ApiUtils from "../../../../utils/api/api.utils"

const apiName = {
    table: '/api/admin/tables',
    tableOder: '/api/admin/time_order_table'
}

export const apiGetTables = async (params?: any) => {
    const res = await ApiUtils.fetch<any, any>(apiName.table, params);
    return res;
}

export const apiGetTableDetail = async (id: number) => {
    const res = await ApiUtils.fetch<number, any>(`${apiName.tableOder}/${id}`);
    return res;
}