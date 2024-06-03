import { createSlice } from "@reduxjs/toolkit"
import { removeFromLocalStorage } from "../../helpers/function/encrypted-storage";


const initialState = {
    user: null,
    isUserLogin: false,
    failure: 0,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isUserLogin = true;
            state.user = action.payload;
            state.failure = 0;
        },
        logout: (state) => {
            state.isUserLogin = false;
            state.user = null;
            state.menu = [];
            removeFromLocalStorage("token");
        },
        failAttempt: (state) => {
            state.failure += 1;
        },
        resetFailure: (state) => {
            state.failure = 0;
        },
        updateUser: (state, action) => {
            state.user = action.payload;
        }
    }
})

export const { login, logout, failAttempt, resetFailure, updateUser } = authSlice.actions;
export default authSlice.reducer;