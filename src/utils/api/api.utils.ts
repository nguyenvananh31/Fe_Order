import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, ResponseType } from 'axios';
import { ResponseCode } from './api.types';
import localStorageUtils, { KeyStorage } from '../local-storage.utils';

interface CustomHeaders {
    isAuth: boolean;
    token?: string | undefined | null;
}

const REQ_TIMEOUT = 25 * 1000;
// export const __DEV__ = !process.env.REACT_APP_NODE_ENV || process.env.REACT_APP_NODE_ENV === 'development';
export const __DEV__ = 'development';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    timeout: REQ_TIMEOUT
});

instance.interceptors.request.use((_config: any) => requestHandler(_config));

const initHeader: CustomHeaders = { isAuth: true };

export const getAccessToken = () => {
    const auth = localStorageUtils.getObject(KeyStorage.AUTH);
    const token = auth?.token;
    if (token) {
        return token;
    }
    return null;
};

export const getHeader = async (customHeaders?: CustomHeaders) => {
    const header: any = customHeaders || {};
    const initCustomHeader = customHeaders ? customHeaders : initHeader;
    if (!initCustomHeader?.isAuth) {
        delete header.Authorization;
    } else {
        let authToken = await getAccessToken();
        if (!authToken) {
            authToken = customHeaders?.token || null;
        }
        if (authToken) {
            header.Authorization = `Bearer ${authToken}`;
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

const errorHandler = (error: AxiosError) => {
    const resError: AxiosResponse<any> | undefined = error.response;

    const config: any = error.config;
    if (resError?.data?.code === ResponseCode.UNAUTHORIZED) {
        config._isRefreshToken = true;
    }

    if (__DEV__) {
        console.log(
            `ERROR ${error.config.method?.toUpperCase()} - ${error.config.url}:`,
            resError?.data
        );
    }

    return Promise.reject({ ...resError?.data });
};

const successHandler = (response: AxiosResponse) => {
    if (__DEV__) {
        console.log(
            `SUCESS ${response.config.method?.toUpperCase()} - ${response.config.url}`,
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
