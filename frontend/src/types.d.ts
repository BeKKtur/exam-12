export interface RegisterMutation {
    email: string;
    password: string;
    displayName: string;
}

export interface User {
    _id: string;
    email: string;
    displayName: string;
    token: string;
}

export interface RegisterResponse {
    user: User;
    message: string;
}

export interface LoginMutation {
    email: string;
    password: string;
}

export interface GlobalError {
    error: string
}
