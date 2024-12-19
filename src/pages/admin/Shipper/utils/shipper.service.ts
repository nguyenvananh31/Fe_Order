import ApiUtils from "../../../../utils/api/api.utils"

const apiName = {
    shipper: '/api/shipper/bill',
    updateShippingStatus: '/api/shipper/updateShippingStatus',
    retryShipper: '/api/shipper/retryShipping'
}

export const apigetShipper = async (params?: any) => {
    return await ApiUtils.fetch<any, any>(apiName.shipper, params);
}

export const apiGetUpdateShippingStatus = async (id: number, body: any, hasImage?: boolean) => {
    if (hasImage) {
        return await ApiUtils.postForm<any, any>(apiName.updateShippingStatus + '/' + id + '?_method=PUT', body);
    }
    return await ApiUtils.put<any, any>(apiName.updateShippingStatus + '/' + id, body);
}

export const apiRetryShipper = async (id: number) => {
    return await ApiUtils.put<any, any>(apiName.retryShipper + '/' + id);
}
