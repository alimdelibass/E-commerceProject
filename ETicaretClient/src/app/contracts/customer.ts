export class Customer {
    id: string;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    isActive: boolean;
    lastLoginDate?: Date;
    isCorporate: boolean;
    companyName?: string;
    taxNumber?: string;
    taxOffice?: string;
    totalOrderCount: number;
    totalSpentAmount: number;
}