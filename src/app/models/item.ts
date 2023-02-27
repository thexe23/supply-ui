export interface Item {
    id: number;
    marketId: number;
    name: string;
    price: number;
    stock: number;
    category: number;
    imgUrl: string;
    onSale: boolean;
  }

export interface CartItem {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
    number: number;
  }
