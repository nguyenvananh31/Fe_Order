import { ReactNode } from "react";
import useAuth from "../hooks/redux/auth/useAuth";

interface IProps {
    allowedRoles: string[];
    children: ReactNode;
}

export default function ProtectedRoute ({ allowedRoles, children }: IProps) {

    const { user } = useAuth();

    if (user == null || (allowedRoles && !allowedRoles.includes(user?.roles[0]?.name))) {
        return (
            <div>Tuổi lol</div>
        )
    }

    return children;
}