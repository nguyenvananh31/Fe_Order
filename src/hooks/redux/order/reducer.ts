import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../utils/redux-store.utils";


const initialState: string = '';

const order = createSlice({
    name: 'ORDER',
    initialState: initialState,
    reducers: {
        changeOrder: (state: string, actions: PayloadAction<string | null>) => {
            state = actions.payload || '';
            return state;
        }
    }
})

const {reducer , actions} = order;
export const getOrder = (state: RootState) => state?.order;
export const {changeOrder} = actions;
export default reducer;