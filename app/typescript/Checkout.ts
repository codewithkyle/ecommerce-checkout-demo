import { Account } from './checkout/Account';
import { Address } from './checkout/Address';

export class Checkout{

    private _sections:  Array<HTMLElement>;
    private _sectionsContainer: HTMLElement;
    private _loginModal:    HTMLElement;
    private _step:  number;

    public el: HTMLElement;
    public user: IUser;

    constructor(){

        this.el = document.body.querySelector('.js-checkout');
        this.user = {};

        this._sectionsContainer = this.el.querySelector('.js-checkout-section-container');
        this._loginModal = document.body.querySelector('.js-login-modal');
        this._step = 0;
        this._sections = [];

        this.init();
    }

    /**
     * Called when the class has be created.
     */
    private init():void{
        new Account(this._loginModal, this);
    }

    private manageNextStep():void{
        // User moved to the address input step
        if(this._step === 1){
            this.el.classList.remove('is-hidden');
            this._loginModal.classList.add('is-hidden');
            const shippingAddressSection = <HTMLElement>this.el.querySelector('[data-section="Shipping Address"]');
            shippingAddressSection.classList.add('is-visible');

            new Address(shippingAddressSection, this);
        }
    }

    public next():void{
        this._step++;
        this.manageNextStep();
    }
}

/**
 * IIFE for launching the Checkout prototype.
 */
(()=>{
    new Checkout();
})();
