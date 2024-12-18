import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RouteConfig } from "../constants/path";
import useAuth from "../hooks/redux/auth/useAuth";

interface IProps {
    children: ReactNode;
}

export default function GuestGuard({ children }: IProps) {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!!user?.roles?.length) {
            navigate(RouteConfig.ADMIN);
        } else if (user) {
            navigate(RouteConfig.HOME);
        }
    }, []);

    return children;
}