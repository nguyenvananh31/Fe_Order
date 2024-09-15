/* eslint-disable @typescript-eslint/no-explicit-any */
import { notification } from "antd";
import { ResponeBase } from "../../../../interFaces/common.types";
import ApiUtils from "../../../../utils/api/api.utils";
import { IProduct } from "../../../../interFaces/product";
import { ICate } from "../../../../interFaces/categories";

export const getAllProduct = async () => {
  try {
    const res = await ApiUtils.fetch<any, ResponeBase<IProduct>>(
      "/api/admin/products"
    );
    return res;
  } catch (error: any) {
    notification.error({
      message: error.message,
      description: error.errors
    });
  }
};
export const getAllCategory = async () => {
  try {
    const res = await ApiUtils.fetch<any, ResponeBase<ICate>>(
      "/api/admin/categories"
    );
    return res;
  } catch (error: any) {
    notification.error({
      message: error.message,
      description: error.errors,
    });
  }
};
export const deleteProduct = async (id: number) => {
  const res = await ApiUtils.remove<number, any>(`/api/admin/products/${id}`);
  return res;
};
