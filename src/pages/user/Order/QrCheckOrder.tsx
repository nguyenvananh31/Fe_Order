import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../components/loader"
import { useEffect } from "react";
import useOrder from "../../../hooks/useOrder";
import { RoutePath } from "../../../constants/path";
import useToast from "../../../hooks/useToast";

const QrCheckOrder = () => {

    const { id } = useParams();
    const { setOrderToLocal } = useOrder();
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        if (id) {
            setOrderToLocal(id);
            navigate('/' + RoutePath.ORDER);
        }else {
            toast.showError('Qr không hợp lệ!');
            navigate(RoutePath.HOME);
        }
    }, []);

    return <Loader />
}

export default QrCheckOrder;