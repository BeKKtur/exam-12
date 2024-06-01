export interface User {
    email: string;
    password: string;
    displayName?: string;
    token: string;
    googleID?: string;
}

export interface Photo {
    title: string;

}

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

export type UserModel = Model<User, {}, UserMethods>