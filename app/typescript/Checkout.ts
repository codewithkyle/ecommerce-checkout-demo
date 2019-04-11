import { Account } from './checkout/Account';
import { Address } from './checkout/Address';

export class Checkout{

    private _sections:  Array<HTMLElement>;
    private _sectionsContainer: HTMLElement;
    private _loginModal:    HTMLElement;
    private _step:  number;
    private _summaryEl: HTMLElement;

    public el: HTMLElement;
    public user: IUser;

    constructor(){

        this.el = document.body.querySelector('.js-checkout');
        this.user = {};

        this._sectionsContainer = this.el.querySelector('.js-checkout-section-container');
        this._loginModal = document.body.querySelector('.js-login-modal');
        this._step = 0;
        this._sections = [];
        this._summaryEl = document.body.querySelector('.js-summary');

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

            // Display the sections
            this.el.classList.remove('is-hidden');

            // Display the cart summary
            this._summaryEl.classList.remove('is-hidden');

            // Hide the login modal
            this._loginModal.classList.add('is-hidden');

            // Get the shipping address section
            const shippingAddressSection = <HTMLElement>this.el.querySelector('[data-section="Shipping Address"]');

            // Make is visible
            shippingAddressSection.classList.add('is-visible');

            // Start the shipping address logic
            new Address(shippingAddressSection, this);
        }
    }

    /**
     * Called when the user is ready progress to the next step.
     */
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
