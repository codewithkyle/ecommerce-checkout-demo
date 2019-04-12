declare class Checkout{
    user: IUser;
    public next: ()=>void;
}

interface IUser{
    email?: string;
    fullName?: string;
    password?: string;
    isGuest?: boolean;
    addresses?: Array<IAddress>;
    cardTokens?: Array<string>;
    paymentOptions?: Array<IPaymentOption>;
    selectedAddress?: IAddress;
    createAccount?: boolean;
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
    label?: string;
    fullName: string;
    addressLine1: string;
    additionalAddressLines?: Array<string>;
    city: string;
    state: string;
    zip: string;
    country: string;
    phoneNumber: string;    
}

interface IShippingOptionsResponse{
    options: Array<IShippingOption>;
}

interface IShippingOption{
    name: string;
    estimatedDeliveryDate: string;
    cost: string;
}

interface IPaymentOptionsResponse{
    cardTokens: Array<string>;
}

interface IPaymentOption{
    cardholder: string;
    brand: string;
    last4: string;
    expDate: string;
}