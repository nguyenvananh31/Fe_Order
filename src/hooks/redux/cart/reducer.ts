import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICart } from "../../../interFaces/cart";
import { RootState } from "../../../utils/redux-store.utils";


interface IState {
    proCarts: ICart[];
}

const initialState: IState = {
    proCarts: []
}

const cartStore = createSlice({
    name: 'CART_STORE',
    initialState,
    reducers: {
        addPro: (state: IState, actions: PayloadAction<ICart[]>) => {
            return {
                ...state,
                proCarts: actions.payload
            }
        },
        clearCart: () => {
            return initialState;
        }
    }
});

const { reducer, actions } = cartStore;
export const getCartStore = (state: RootState) => state?.cartStore;
export const { addPro, clearCart } = actions;
export default reducer;