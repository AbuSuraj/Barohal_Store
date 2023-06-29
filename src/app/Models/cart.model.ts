export interface Cart {
    items: CartItem[];
}

export interface CartItem{
    id:number;
    name:string;
    price:number;
    quantity:number;
    product: string;
}