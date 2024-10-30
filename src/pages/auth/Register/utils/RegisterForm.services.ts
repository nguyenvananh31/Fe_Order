import { IFormUser } from "../../../../interFaces/user";
import ApiUtils from "../../../../utils/api/api.utils";

export const registerService = async (body: IFormUser) => {
    const res = await ApiUtils.post(
      "/api/register",
      body
    );
    return res;

};
