import { useDispatch, useSelector } from "react-redux";
import { changeOrder, getOrder } from "./reducer";

const useOrder = () => {
    const dispatch = useDispatch();
    const order: string = useSelector(getOrder);

    const setOrderId = (orderId: string | null) => {
        dispatch(changeOrder(orderId || ''));
    }

    const clearOrderId = () => {
        dispatch(changeOrder(''));
    }

    return {
        order,
        setOrderId,
        clearOrderId
    }
}

export default useOrder;