import { ICateReq } from "../../../../interFaces/categories";
import ApiUtils from "../../../../utils/api/api.utils";


const apiName = {
    createCate: '/api/admin/categories'
};

export const apiGetCate = async () => {
    const res = await ApiUtils.fetch<undefined, ICateReq[]>(apiName.createCate);
    return res;
}


