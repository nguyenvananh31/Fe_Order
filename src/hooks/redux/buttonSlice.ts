// src/redux/slices/buttonSlice.js
import { createSlice } from '@reduxjs/toolkit';

const buttonSlice = createSlice({
    name: 'button',
    initialState: {
        state: false,
    },
    reducers: {
        toggleState: (state) => {
            state.state = !state.state;
        },
        setState: (state, action) => {
            state.state = action.payload;
        },
    },
});

export const { toggleState, setState } = buttonSlice.actions;
export default buttonSlice.reducer;
