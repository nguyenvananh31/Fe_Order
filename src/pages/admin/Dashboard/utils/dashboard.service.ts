import ApiUtils from "../../../../utils/api/api.utils"

const apiName = {
    dashboard: '/api/admin/dashboard',
    dashboardfull: '/api/admin/dashboardfull'
}

export const apiGetDashboard = async (params?: any) => {
    return await ApiUtils.fetch<any, any>(apiName.dashboard, params);
}

export const apiGetDashboardChart = async (params?: any) => {
    return await ApiUtils.fetch<any, any>(apiName.dashboardfull, params);
}