import { StopOutlined } from "@ant-design/icons";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SpinnerLoader from '../components/loader';
import { RoutePath } from "../constants/path";
import useAuth from "../hooks/redux/auth/useAuth";

interface IProps {
    allowedRoles: string[];
    children: ReactNode;
}

export default function ProtectedRoute({ allowedRoles, children }: IProps) {

    const { user } = useAuth();
    const [roles, setRoles] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        checkSession();
    }, []);

    const checkSession = async () => {
        try {
            setLoading(true);
            if (user.roles?.length > 0) {
                setRoles(user.roles.map(i => i.name));
            }
            setLoading(false);
        } catch {
            console.log('không có quyền');
            setLoading(false);
            navigate(RoutePath.HOME);
        }
    };

    if (loading) {
        return <SpinnerLoader />
    }
    
    if (user == null || allowedRoles.filter(i => roles.some(x => x == i)).length == 0) {
        return (
            <div className="bg-primary drop-shadow-primary rounded-primary h-full flex items-center justify-center flex-col gap-3">
                <StopOutlined className="text-5xl" />
                <div className="text-lg">Không đủ quyền truy cập!</div>
            </div>
        )
    }

    return children;
}