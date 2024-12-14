import { StopOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SpinnerLoader from '../components/loader';
import { ROLES } from "../constants/enum";
import useAuth from "../hooks/redux/auth/useAuth";

interface IProps {
    allowedRoles: string[];
    children: any;
}

interface IState {
    loading: boolean;
    roles: any[];
}

const initState: IState = {
    loading: true,
    roles: []
}

export default function ProtectedRoute({ allowedRoles, children }: IProps) {

    const { user, checkPermission } = useAuth();
    const [state, setState] = useState<IState>(initState);
    // const navigate = useNavigate();
    const loaction = useLocation();

    useEffect(() => {
        checkSession();
    }, [loaction.pathname]);

    const checkSession = async () => {
        try {
            setState(prev => ({ ...prev, loading: true }));
            const res: any = await checkPermission(user?.id || 0);
            let roles = [];
            if (res?.roles?.length > 0) {
                roles = res.roles.map((i: any) => i.name);
            }
            if (user?.roles?.some(i => i.name == ROLES.SHIPPER)) {
                roles.push(ROLES.SHIPPER);
            }
            setState(prev => ({ ...prev, loading: false, roles }));
        } catch {
            setState(prev => ({ ...prev, loading: false }));
            // navigate(RoutePath.HOME);
        }
    };

    if (state.loading) {
        return <SpinnerLoader />
    }

    if (user == null || allowedRoles.filter(i => state.roles.includes(i)).length == 0) {
        return (
            <div className="bg-primary drop-shadow-primary rounded-primary h-full flex items-center justify-center flex-col gap-3">
                <StopOutlined className="text-5xl" />
                <div className="text-lg">Không đủ quyền truy cập!</div>
            </div>
        )
    }

    return children;
}