import ApiUtils from "../../../../utils/api/api.utils"

const apiName = {
    dashboard: '/api/admin/dashboard',
}

export const apiGetDashboard = async (params?: any) => {
    return await ApiUtils.fetch<any, any>(apiName.dashboard, params);
}