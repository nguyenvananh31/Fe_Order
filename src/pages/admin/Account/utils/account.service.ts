import { IRole, IUser, ReqBase, ResponeBase } from "../../../../interFaces/common.types";
import ApiUtils from "../../../../utils/api/api.utils";

const apiName = {
    users: '/api/admin/users',
    user: '/api/admin/user',
    roles: '/api/admin/roles'
};

export const apiGetUsers = async (params: ReqBase) => {
    const res = await ApiUtils.fetch<ReqBase, ResponeBase<IUser[]>>(apiName.users, params);
    return res;
}

export const apiDelAccount = async (id: number) => {
    const res = await ApiUtils.remove<number , any>(`${apiName.users}/${id}`);
    return res;
}

export const apiGetOneUser = async (id: number) => {
    const res = await ApiUtils.fetch<number , ResponeBase<IUser>>(`${apiName.users}/${id}`);
    return res;
}

export const apiGetRoles = async () => {
    const res = await ApiUtils.fetch<any, ResponeBase<IRole[]>>(apiName.roles);
    return res;
}

export const apiUpadateRoles = async (id: number, body: any) => {
    const res = await ApiUtils.put<any, any>(`${apiName.user}/${id}/roles`, body);
    return res;
}

export const apiChangeLock = async (id: number) => {
    const res = await ApiUtils.post<any, any>(`${apiName.user}/${id}/locked`);
    return res;
}