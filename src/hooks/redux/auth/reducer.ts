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
            state = !!state ? {...state, ...actions.payload} : actions.payload;
            localStorageUtils.setObject(KeyStorage.AUTH, state);
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
