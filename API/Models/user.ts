import * as mongoose from "mongoose";
import {User, UserMethods, UserModel} from "../types";
import bcrypt from "bcrypt";
import {randomUUID} from "node:crypto";

const SALT_WORK_FACTORY = 10

const Schema = mongoose.Schema;

const userSchema = new Schema<User, UserModel, UserMethods>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

    displayName: {
        type: String,
        required: true,
    },

    token: {
        type: String,
        required: true,
    },

    googleID: String
}, {versionKey: false});

userSchema.set('toJSON',{
    transform:(_doc, ret, _options) => {
        delete ret.password;
        return ret
    }
})

userSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
    this.token = randomUUID();
};

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(SALT_WORK_FACTORY);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
});

const userModel = mongoose.model<User, UserModel>('user', userSchema);

export default  userModel;