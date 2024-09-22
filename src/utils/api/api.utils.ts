import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  ResponseType,
} from "axios";
import { useNavigate } from "react-router-dom";
import localStorageUtils, { KeyStorage } from "../local-storage.utils";
import { ResponseCode } from "./api.types";

interface CustomHeaders {
  isAuth: boolean;
  access_token?: string | undefined | null;
}

const REQ_TIMEOUT = 25 * 1000;
export const __DEV__ =
  !import.meta.env.VITE_NODE_ENV ||
  import.meta.env.VITE_NODE_ENV === "development";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_DOMAIN,
  timeout: REQ_TIMEOUT,
});

instance.interceptors.request.use((_config: any) => requestHandler(_config));

const initHeader: CustomHeaders = { isAuth: true };

export const getAccessToken = () => {
  const auth = localStorageUtils.getObject(KeyStorage.AUTH);
  const access_token = auth?.access_token;
  if (access_token) {
    return access_token;
  }
  return null;
};

export const getRefreshToken = () => {
  const auth = localStorageUtils.getObject(KeyStorage.AUTH);
  const refresh_token = auth?.refresh_token;
  if (refresh_token) {
    return refresh_token;
  }
  return null;
};

export const getHeader = async (customHeaders?: CustomHeaders) => {
  const header: any = customHeaders || {};
  const initCustomHeader = customHeaders ? customHeaders : initHeader;
  if (!initCustomHeader?.isAuth) {
    delete header.Authorization;
    delete header["x-api-key"];
  } else {
    const API_KEY = import.meta.env.VITE_API_KEY || undefined;
    let authToken = await getAccessToken();
    if (!authToken) {
      authToken = customHeaders?.access_token || null;
    }
    if (authToken && !API_KEY) {
      header.Authorization = `Bearer ${authToken}`;
    }
    if (API_KEY) {
      header["x-api-key"] = API_KEY;
    }
  }
  return { ...header };
};

const requestHandler = (request: AxiosRequestConfig) => {
  if (__DEV__) {
    console.log(`Req API: ${request.url}`);
    console.log(`  + Params:     `, request.params);
    console.log(`  + Data:       `, request.data);
  }
  return request;
};

instance.interceptors.response.use(
  (response: any) => successHandler(response),
  (error: any) => errorHandler(error)
);

const refreshToken = async () => {
  const refresh_token = getRefreshToken();
  const res = ApiUtils.post<any, any>(
    "/api/refresh",
    { refresh_token },
    { isAuth: false }
  );
  return res;
};

const errorHandler = async (error: AxiosError) => {
  const resError: AxiosResponse<any> | undefined = error.response;

  const config: any = error.config;

  if (resError?.status === 401 && !config._isRefreshToken) {
    config._isRefreshToken = true;
    try {
      const res = await refreshToken();
      if (res.access_token) {
        const auth = localStorageUtils.getObject(KeyStorage.AUTH);
        localStorageUtils.setObject(KeyStorage.AUTH, {
          ...auth,
          access_token: res.access_token,
        });
        config.headers["Authorization"] = `Bearer ${res.access_token}`;
        return instance(config);
      }
    } catch (error) {
      console.log(error);
      const navigate = useNavigate();
      navigate("/login");
    }
  }

  if (__DEV__) {
    console.log(
      `ERROR ${error?.config?.method?.toUpperCase()} - ${error?.config?.url}:`,
      resError?.data
    );
  }

  return Promise.reject({ ...resError?.data });
};

const successHandler = (response: AxiosResponse) => {
  if (__DEV__) {
    console.log(
      `SUCESS ${response.config.method?.toUpperCase()} - ${
        response.config.url
      }`,
      response.data
    );
  }
  const data: any = response.data;
  if (!data || data.code === ResponseCode.UNAUTHORIZED) {
    return;
  }
  return data;
};

async function fetch<ReqType, ResType>(
  url: string,
  params?: ReqType,
  customHeaders?: CustomHeaders,
  responseType?: ResponseType
): Promise<ResType> {
  const headers = await getHeader(customHeaders);
  return instance.get(url, { params, headers, responseType });
}

async function post<ReqType, ResType>(
  url: string,
  data?: ReqType,
  customHeaders?: CustomHeaders
): Promise<ResType> {
  const headers = await getHeader(customHeaders);
  return instance.post(url, { ...data }, { headers });
}

async function postForm<ReqType, ResType>(
  url: string,
  data?: ReqType,
  customHeaders?: CustomHeaders
): Promise<ResType> {
  const headers = await getHeader(customHeaders);
  return instance.post(url, data, { headers });
}

async function put<ReqType, ResType>(
  url: string,
  data?: ReqType,
  customHeaders?: CustomHeaders
): Promise<ResType> {
  const headers = await getHeader(customHeaders);
  return instance.put(url, { ...data }, { headers });
}
async function putForm<ReqType, ResType>(
  url: string,
  data?: ReqType,
  customHeaders?: CustomHeaders
): Promise<ResType> {
  const headers = await getHeader(customHeaders);
  return instance.put(url, data, { headers });
}
async function remove<ReqType, ResType>(
  url: string,
  data?: ReqType,
  customHeaders?: CustomHeaders
): Promise<ResType> {
  const headers = await getHeader(customHeaders);
  return instance.delete(url, { data: { ...data }, headers: { ...headers } });
}

const ApiUtils = { fetch, post, put, putForm, postForm, remove };
export default ApiUtils;
