import { StopOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SpinnerLoader from '../components/loader';
import { RoutePath } from "../constants/path";
import useAuth from "../hooks/redux/auth/useAuth";

interface IProps {
    allowedRoles: string[];
    children: any;
}

export default function ProtectedRoute({ allowedRoles, children }: IProps) {

    const { user, checkPermission } = useAuth();
    const [roles, setRoles] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const loaction = useLocation();

    useEffect(() => {
        checkSession();
    }, [loaction]);

    const checkSession = async () => {
        try {
            setLoading(true);
            const res: any = await checkPermission(user?.id || 0);
            if (res?.roles?.length > 0) {
                setRoles(res.roles.map((i: any) => i.name));
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

    if (user == null || allowedRoles.filter(i => roles.includes(i)).length == 0) {
        return (
            <div className="bg-primary drop-shadow-primary rounded-primary h-full flex items-center justify-center flex-col gap-3">
                <StopOutlined className="text-5xl" />
                <div className="text-lg">Không đủ quyền truy cập!</div>
            </div>
        )
    }

    return children;
}