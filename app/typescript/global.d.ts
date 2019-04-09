declare class Checkout{
    public set: (key:string, value:string|number|boolean)=>void;
    public next: ()=>void;
}

interface IUser{
    [index:string]: string|number|boolean;
}

interface ILoginError{
    [index:number] : {
        inputId: string;
        errorMessage: string;
    }
}