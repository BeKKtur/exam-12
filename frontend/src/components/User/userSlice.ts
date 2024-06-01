import {GlobalError, User} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {googleLogin, login, register} from "./userThunk";

interface UserState {
    user: User | null;
    registerLoading: boolean;
    registerError: boolean;
    loginError: GlobalError | null;
    loginLoading: boolean;
}

const initialState:UserState = {
    user: null,
    registerError: false,
    registerLoading: false,
    loginError: null,
    loginLoading: false,
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        unsetUser: (state) => {
            state.user = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.registerLoading = true;
            state.registerError = false;
        }).addCase(register.fulfilled, (state, {payload: user}) => {
            state.registerLoading = false;
            state.user = user
        }).addCase(register.rejected, (state) => {
            state.registerLoading = false;
            state.registerError = true;
        });
        builder.addCase(login.pending,(state) => {
            state.loginLoading = true;
            state.loginError = null
        }).addCase(login.fulfilled, (state,{payload: user}) => {
            state.loginLoading = false;
            state.user = user;
        }).addCase(login.rejected, (state, {payload: error}) => {
            state.loginLoading = false;
            state.loginError = error || null
        });
        builder.addCase(googleLogin.pending,(state) => {
            state.loginLoading = true;
            state.loginError = null
        }).addCase(googleLogin.fulfilled, (state,{payload: user}) => {
            state.loginLoading = false;
            state.user = user;
        }).addCase(googleLogin.rejected, (state, {payload: error}) => {
            state.loginLoading = false;
            state.loginError = error || null
        })

    }
});

export const {unsetUser} = userSlice.actions
export const userReducer = userSlice.reducer;

export const selectUser = (state:RootState) => state.users.user
export const selectUserLoading = (state:RootState) => state.users.registerLoading;
export const selectUserError = (state:RootState) => state.users.registerError;
export const selectLoginError = (state:RootState) => state.users.loginError;
export const selectLoginLoading = (state:RootState) => state.users.loginError;