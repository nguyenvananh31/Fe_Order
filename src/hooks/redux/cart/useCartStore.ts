import { useDispatch, useSelector } from "react-redux";
import { ICart } from "../../../interFaces/cart";
import { addPro, addSelect, clearCart, getCartStore } from "./reducer";
import { apiGetCart } from "../../../pages/user/Cart/utils/cart.service";

export default function useCartStore() {
    const dispatch = useDispatch();
    const cartStore: { proCarts: ICart[], optionSelect: number[] } = useSelector(getCartStore);

    const setCartSelect = (proIds: number[]) => {
        dispatch(addSelect(proIds));
    }

    const setProtoCart = (pros: ICart[]) => {
        dispatch(addPro(pros));
    }

    const clearCartStore = () => {
        dispatch(clearCart());
    }

    const refreshCartStore = async () => {
        try {
            const res = await apiGetCart();
            dispatch(addPro(res.data));
            return true;
        } catch (error) {
            dispatch(addPro([]));
            console.log(error);
            return false;
        }
    }

    return {
        cartStore,
        setProtoCart,
        clearCartStore,
        refreshCartStore,
        setCartSelect
    }
}