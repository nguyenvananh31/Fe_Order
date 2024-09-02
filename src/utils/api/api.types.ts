export enum ResponseCode {
    SUCCESS = 'SUCCESS',
    UNAUTHORIZED = 'UNAUTHORIZED'
}

export interface ResponseBase<T> {
    data?: T;
    message?: ResponseCode;
    status?: string;
}

export interface DataResponseError {
    error: string;
    message: string;
    status: number;
    path: string;
}
