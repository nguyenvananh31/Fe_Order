import ApiUtils from "../../../../utils/api/api.utils"


const apiName = {
    getAddress: '/api/client/profile',
    addBill: '/api/client/bill_store',
    getPaymant: '/api/client/list_payments'
}

export const apiGetAddresandCustomer = async () => {
    return await ApiUtils.fetch<any, any>(apiName.getAddress);
}

export const apiAddBill = async (body: any) => {
    return await ApiUtils.postForm<any, any>(apiName.addBill, body);
}

export const apiGetPayment = async () => {
    return await ApiUtils.fetch<any, any>(apiName.getPaymant);
}