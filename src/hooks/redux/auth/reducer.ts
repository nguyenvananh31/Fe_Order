import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../interFaces/common.types";
import { getInitAuth } from "../../../utils/auth.utils";
import localStorageUtils, { KeyStorage } from "../../../utils/local-storage.utils";
import { RootState } from "../../../utils/redux-store.utils";

const initialState: IUser | null = getInitAuth();

const auth = createSlice({
    name: 'AUTH',
    initialState: initialState,
    reducers: {
        changeAuth: (state: IUser | null, actions: PayloadAction<IUser | null>) => {
            localStorageUtils.setObject(KeyStorage.AUTH, actions.payload);
            state = !!state ? {...state, ...actions.payload} : actions.payload;
            return state;
        },
        removeAuth: () => {
            localStorageUtils.remove(KeyStorage.AUTH);
            return null;
        }
    }
})

const { reducer, actions} = auth;
export const getAuth = (state: RootState) => state?.auth;
export const { changeAuth, removeAuth } = actions;
export default reducer;
