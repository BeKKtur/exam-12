export interface User {
    email: string;
    password: string;
    displayName?: string;
    token: string;
    googleID?: string;
}

export interface Image {
    title: string;
    user: string;
    image: string | null

}

interface ImageMethods {
    username(username: string): Promise<boolean>;
}

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

export type UserModel = Model<User, {}, UserMethods>

export type ImageModel = Model<Items, {}, ItemMethods>