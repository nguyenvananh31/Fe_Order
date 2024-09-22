/* eslint-disable @typescript-eslint/no-explicit-any */

import { ResponeBase } from "../../../../interFaces/common.types";
import ApiUtils from "../../../../utils/api/api.utils";

export const useAddProduct = () => {
  const getThumbnailUrl = (file: any) => {
    return file?.thumbUrl || file?.url || (file.response && file.response.url);
  };
  const getImageUrls = (fileList: any[]) => {
    return fileList.map((file) => getThumbnailUrl(file));
  };
  
  return { getImageUrls, getThumbnailUrl };
};
