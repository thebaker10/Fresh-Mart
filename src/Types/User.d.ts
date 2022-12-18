export interface User {
    statusCode: number;
    data: UserData;
}

export interface UserData {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    balance: string;
    shoppingCart: any[];
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    profileImage: string;
}
