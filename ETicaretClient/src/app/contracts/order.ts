export enum OrderStatus {
    Pending = 'Pending',
    Confirmed = 'Confirmed',
    Shipped = 'Shipped',
    Delivered = 'Delivered',
    Cancelled = 'Cancelled'
}

export class Order {
    id: string;
    customerId: string;
    addressId: string;
    description: string;
    totalPrice: number;
    orderStatus: OrderStatus;
    createDate: Date;
}