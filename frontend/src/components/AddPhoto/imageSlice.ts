import {Image} from "../../types";
import {addImage, fetchImage} from "./imageThunk";
import {createSlice} from "@reduxjs/toolkit";

interface ImageState {
    images: Image[] | null;
    image: Image | null;
    imagesLoading: boolean;
    imagesError: boolean;
    imageError:  boolean;
    imageLoading: boolean;
}

const initialState:ImageState = {
    images: null,
    image: null,
    imageError: false,
    imageLoading: false,
    imagesError: false,
    imagesLoading: false
}

export const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addImage.pending, (state) => {
            state.imagesLoading = true;
            state.imagesError = false;
        }).addCase(addImage.fulfilled, (state, {payload: image}) => {
            state.imagesLoading = true;
            // @ts-ignore
            state.image = image
        }).addCase(addImage.rejected, (state) => {
            state.imagesLoading = true;
            state.imagesError = true;
        });
        builder.addCase(fetchImage.pending, (state) => {
            state.imageLoading = true;
        }).addCase(fetchImage.fulfilled , (state, {payload: images}) => {
            state.imageLoading = false;
            state.images = images;
        }).addCase(fetchImage.rejected, (state) => {
            state.imageError = true;
        })
    }
});

export const imageReducer = imageSlice.reducer