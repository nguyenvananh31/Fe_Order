import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICart } from "../../../interFaces/cart";
import { RootState } from "../../../utils/redux-store.utils";


interface IState {
    proCarts: ICart[];
    optionSelect: number[];
}

const initialState: IState = {
    proCarts: [],
    optionSelect: []
}

const cartStore = createSlice({
    name: 'CART',
    initialState,
    reducers: {
        addPro: (state: IState, actions: PayloadAction<ICart[]>) => {
            return {
                ...state,
                proCarts: actions.payload
            }
        },
        addSelect: (state: IState, actions: PayloadAction<number[]>) => {
            return {
                ...state,
                optionSelect: actions.payload
            }
        },
        clearCart: () => {
            return initialState;
        }
    }
});

const { reducer, actions } = cartStore;
export const getCartStore = (state: RootState) => state?.cartStore;
export const { addPro, clearCart, addSelect } = actions;
export default reducer;