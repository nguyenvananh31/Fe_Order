import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../components/loader";
import { RouteConfig } from "../../../constants/path";
import useOrder from "../../../hooks/useOrder";
import useToast from "../../../hooks/useToast";

const QrCheckOrder = () => {

    const { id } = useParams();
    const { setOrderToLocal } = useOrder();
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        if (id) {
            setOrderToLocal(id);
            navigate(RouteConfig.ORDER);
        }else {
            toast.showError('Qr không hợp lệ!');
            navigate(RouteConfig.HOME);
        }
    }, []);

    return <Loader />
}

export default QrCheckOrder;