import {createAsyncThunk} from "@reduxjs/toolkit";
import {GlobalError, LoginMutation, RegisterMutation, RegisterResponse, User} from "../../types";
import axiosApi from "../../axiosApi";
import {isAxiosError} from "axios";

export const register = createAsyncThunk(
    'users/register',
    async (registerMutation:RegisterMutation)=> {
        const response = await axiosApi.post<RegisterResponse>('/users/register', registerMutation);
        return response.data.user
    }
);

export const login = createAsyncThunk<User,LoginMutation, {rejectValue: GlobalError}>(
    'users/login',
    async (loginMutation, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<RegisterResponse>('/users/sessions', loginMutation);
            return response.data.user;
        } catch (error) {
            if (isAxiosError(error) && error.response && error.response.status === 400) {
                return rejectWithValue(error.response.data)
            }
            throw error
        }
    }
);

export const googleLogin = createAsyncThunk<User, string, {rejectValue: GlobalError}>(
    'users/googleLogin',
    async (credential, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<RegisterResponse>('/users/google', {credential});
            return response.data.user;
        } catch (error) {
            if (isAxiosError(error) && error.response && error.response.status === 400) {
                return rejectWithValue(error.response.data)
            }
            throw error
        }
    }
)