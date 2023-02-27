export interface User {
    id: number;
    username: string;
    password: string;
    role: number;
    phone: string;
    orgId: number;
    marketId: number;
    imgUrl: string;
}

export interface UpdateUserReq {
    username: string;
    password: string;
    phone: string;
    imgUrl: string;
}
