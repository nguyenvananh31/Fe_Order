import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../../../interFaces/common.types";
import { changeAuth, getAuth, removeAuth } from "./reducer";
import { useCallback } from "react";
import { logout } from "../../../utils/event-bus/event-bus.events";
import { apiGetOneUser } from "../../../pages/admin/Account/utils/account.service";

export default function useAuth() {
    const dispatch = useDispatch();
    const user: IUser = useSelector(getAuth);

    //Đăng xuất tài khoản
    const clearStore = useCallback(() => {
        dispatch(removeAuth());
        logout();
    }, []);

    const setAuth = useCallback((user: IUser) => {
        dispatch(changeAuth(user));
    }, []);

    const checkPermission = useCallback(async (id: number) => {
        try {
            const res = await apiGetOneUser(id);
            if (res?.data) {
                dispatch(changeAuth(res?.data));
            }
            return res?.data;
        } catch {
            return false;
        }
    }, []);

    return {
        user,
        setAuth,
        clearStore,
        checkPermission
    }
}