import { CartItem, Item } from './item';

export interface Order {
    id: number;
    userId: number;
    marketId: number;
    orgId: number;
    items: CartItem[];
    amount: number;
    createdAt: string;
    orderStatus: number;
}

export interface CreateOrder {
    userId: number;
    marketId: number;
    orgId: number;
    items: string;
    amount: number;
}
