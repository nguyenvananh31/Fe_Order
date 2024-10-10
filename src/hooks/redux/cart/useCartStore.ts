import { useDispatch, useSelector } from "react-redux";
import { ICart } from "../../../interFaces/cart";
import { addPro, getCartStore } from "./reducer";

export default function useCartStore () {
    const dispatch = useDispatch();
    const cartStore = useSelector(getCartStore);

    const setProtoCart = (pros: ICart[]) => {
        dispatch(addPro(pros));
    }

    return {
        cartStore,
        setProtoCart
    }
}