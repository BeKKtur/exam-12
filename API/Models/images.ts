import mongoose from "mongoose";
import {Image, ImageMethods, ImageModel} from "../types";

const Schema = mongoose.Schema

const ImageSchema = new Schema<Image, ImageModel, ImageMethods>({
    title: {
        type: String,
        required: true
    },

    image: {
        type: String
    },

    user: {
        type: String,
        required: true
    },
});

// @ts-ignore
ImageSchema.methods.username = function (username) {
    return this.user = username
}

const Image = mongoose.model<Image, ImageModel>('image', ImageSchema);

export default Image