import { useEffect, useState } from "react";
import localStorageUtils, { KeyStorage } from "../utils/local-storage.utils";

const useOrder = () => {
    const [isFisrtLoad, setIsFisrtLoad] = useState<boolean>(false); 
    const [orderId, setOrderId] = useState<string>();

    const getInitOrder = () => {
        const orderId = localStorageUtils.get(KeyStorage.ORDER);
        if (orderId) {
            setOrderId(orderId);
        }
        setIsFisrtLoad(true);
    };

    useEffect(() => {
        getInitOrder();
    }, []);


    const setOrderToLocal = (id: string) => {
        localStorageUtils.set(KeyStorage.ORDER, id);
    };

    const clearOrder = () => {
        localStorageUtils.remove(KeyStorage.ORDER);
    }

    return { orderId, setOrderToLocal, clearOrder, isFisrtLoad }
}

export default useOrder;