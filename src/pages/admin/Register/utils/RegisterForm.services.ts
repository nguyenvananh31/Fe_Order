import { notification } from "antd";
import { IFormUser } from "../../../../interFaces/user";
import ApiUtils from "../../../../utils/api/api.utils";

export const registerService = async (body: IFormUser) => {
  try {
    const res = await ApiUtils.post(
      "/api/register",
      body
    );
    return res;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error : any) {
    notification.error({
      message: error.message,
      description:error.errors[0],
    });
  }
};
