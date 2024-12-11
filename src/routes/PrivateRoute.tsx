import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SpinnerLoader from '../components/loader';
import { RoutePath } from "../constants/path";
import useAuth from "../hooks/redux/auth/useAuth";


interface IProps {
    children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {

    const { user, checkPermission } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        checkSession();
    }, []);

    const checkSession = async () => {
        try {
            setLoading(true);
            await checkPermission(user?.id || 0);
            setLoading(false);
        } catch {
            console.log('không có quyền');
            setLoading(false);
            navigate(RoutePath.HOME);
        }
    }

    if (loading) {
        return <SpinnerLoader />
    }

    return children;
}