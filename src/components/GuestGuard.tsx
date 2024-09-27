import { ReactNode, useEffect } from "react";
import useAuth from "../hooks/redux/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../constants/path";

interface IProps {
    children: ReactNode;
}

export default function GuestGuard({ children }: IProps) {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!!user?.roles.length) {
            navigate(`/${RoutePath.ADMIN}`);
        } else if (user) {
            navigate(`/${RoutePath.HOME}`);
        }
    }, []);

    return children;
}