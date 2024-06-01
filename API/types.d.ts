export interface User {
    username: string;
    password: string;
    displayName: string;
    token: string;
}

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

export type UserModel = Model<User, {}, UserMethods>