import ApiUtils from "../../../../utils/api/api.utils";

const apiName = {
  proById: '/api/client/product',
  proByCate: '/api/client/product_cate'
}

export const fetchProductById = async (id: number) => {
  return await ApiUtils.fetch<any, any>(`${apiName.proById}/${id}`);
};

export const apiGetProByCate = async (id: number) => {
  return await ApiUtils.fetch<any, any>(`${apiName.proByCate}/${id}`);
}
