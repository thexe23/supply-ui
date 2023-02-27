export interface Transports {
    id: number;
    sourceId: number;
    targetId: number;
    item: string;
    quantity: number;
    createAt: string;
    status: number;
}

export interface CreateTransport {
    sourceId: number;
    targetId: number;
    item: string;
    quantity: number;
}