import {createAsyncThunk} from "@reduxjs/toolkit";
import {Image, ImageMutation} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchImage = createAsyncThunk<Image[]>(
    'fetchImage',
    async () => {
        const imageResponse = await axiosApi.get<Image[]>('/image');
        return imageResponse.data
    }
);

export const addImage = createAsyncThunk<void, ImageMutation>(
    'addImage',
    async (imageMutation) => {
        const formData = new FormData();

        const keys = Object.keys(imageMutation) as (keyof ImageMutation)[];

        keys.forEach(key => {
            const value = imageMutation[key];

            if (value !== null ){
                formData.append(key, value)
            }
        });

        return axiosApi.post('/image', formData)

    }
)