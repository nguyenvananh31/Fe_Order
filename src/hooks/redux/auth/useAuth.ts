import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../../../interFaces/common.types";
import { changeAuth, getAuth, removeAuth } from "./reducer";

export default function useAuth() {
    const dispatch = useDispatch();
    const user: IUser = useSelector(getAuth);

    //Đăng xuất tài khoản
    const clearStore = () => {
        dispatch(removeAuth());
    }

    const setAuth = (user: IUser) => {
        dispatch(changeAuth(user));
    }

    return {
        user,
        setAuth,
        clearStore
    }
}