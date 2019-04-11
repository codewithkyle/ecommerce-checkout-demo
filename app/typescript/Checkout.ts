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
        console.group();
        console.log(`Moving to step ${ this._step }`);
        console.log('Current User Object: ', this.user);
        console.groupEnd();


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
            
            this._sections.push(shippingAddressSection);
            
            shippingAddressSection.classList.add('is-current-step');

            // Make is visible
            shippingAddressSection.classList.add('is-visible');

            // Start the shipping address logic
            new Address(shippingAddressSection, this);
        }
        // User moved to the shipping option selection step
        else if(this._step === 2){
            
            // Clear the `is-current-step` class from all sections
            this._sections.forEach((section)=>{
                section.classList.remove('is-current-step');
            });

            // Get the shipping address section
            const shippingOptionSection = <HTMLElement>this.el.querySelector('[data-section="Shipping Options"]');
            this._sections.push(shippingOptionSection);
            shippingOptionSection.classList.add('is-current-step', 'is-visible');
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
