declare class Checkout{
    user: IUser;
    public next: ()=>void;
}

interface IUser{
    email?: string;
    isGuest?: boolean;
    addresses?: Array<IAddress>;
}

interface ILoginResponse{
    success: boolean;
    errors?: Array<ILoginError>;
}

interface ILoginError{
    id: string;
    message: string;
}

interface ISavedAddressesResponse{
    addresses: Array<IAddress>;
}

interface IAddress{
    fullName: string;
    addressLine1: string;
    additionalAddressLines?: Array<string>;
    city: string;
    state: string;
    zip: number;
    country: string;
    phoneNumber: string;
}

interface IShippingOptionsResponse{
    options: Array<IShippingOption>;
}

interface IShippingOption{
    name: string;
    estimatedDeliveryDate: string;
    cost: number;
}

interface IPaymentOptionsResponse{
    options: Array<IPaymentOption>;
}

interface IPaymentOption{
    cardholder: string;
    brand: string;
    last4: string;
    expDate: string;
}