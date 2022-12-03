export interface Login {
    statusCode: number;
    data: LoginData;
}

export interface LoginData {
    message: string;
    user_id: number;
}
