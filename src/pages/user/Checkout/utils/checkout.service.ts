import ApiUtils from "../../../../utils/api/api.utils"


const apiName = {
    getAddress: '/api/client/profile',
    addBill: '/api/client/bill_store',
    getPaymant: '/api/client/list_payments',
    vouchersYagi: '/api/client/vouchers_yagi' 
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

export const apiGetAllVoucher = async () => {
    return await ApiUtils.fetch<any, any>(apiName.vouchersYagi);
}