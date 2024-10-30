/* eslint-disable @typescript-eslint/no-explicit-any */
import { IFormUser } from "../../../../interFaces/user";
import ApiUtils from "../../../../utils/api/api.utils";

export const loginService = async (body: IFormUser) => {

  const res = await ApiUtils.post<IFormUser, any>(
    "/api/login",
    body
  );
  return res;

};
