import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../../../interFaces/common.types";
import { changeAuth, getAuth, removeAuth } from "./reducer";
import { useCallback } from "react";
import { logout } from "../../../utils/event-bus/event-bus.events";

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



    return {
        user,
        setAuth,
        clearStore
    }
}