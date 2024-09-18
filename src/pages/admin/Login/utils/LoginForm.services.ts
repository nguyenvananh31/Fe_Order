/* eslint-disable @typescript-eslint/no-explicit-any */
import { notification } from "antd";
import { IFormUser } from "../../../../interFaces/user";
import ApiUtils from "../../../../utils/api/api.utils";

export const loginService = async (body: IFormUser) => {
  try {
    const res = await ApiUtils.post<IFormUser, any>(
      "/api/login",
      body
    );
    return res;
  } catch (error : any) {
    notification.error({
      message: error.message,
      description:error.errors,
    });
  }
};
