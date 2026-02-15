export enum PaymentStatus {
    Pending = 'Pending',
    Completed = 'Completed',
    Failed = 'Failed',
    Refunded = 'Refunded'
}

export enum PaymentMethod {
    CreditCard = 'CreditCard',
    DebitCard = 'DebitCard',
    BankTransfer = 'BankTransfer'
}

export class Payment {
    id: string;
    orderId: string;
    paymentStatus: PaymentStatus;
    amount: number;
    paymentMethod: PaymentMethod;
}