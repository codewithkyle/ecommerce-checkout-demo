import { Account } from './checkout/Account';

export class Checkout{

    private _sections:  Array<HTMLElement>;
    private _sectionsContainer: HTMLElement;
    private _loginModal:    HTMLElement;
    private _user:  IUser;
    private _step:  number;

    public el: HTMLElement;

    constructor(){

        this.el = document.body.querySelector('.js-checkout');
        this._sectionsContainer = this.el.querySelector('.js-checkout-section-container');
        this._loginModal = document.body.querySelector('.js-login-modal');
        this._user = {};
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
            (async ()=>{
                const request = await fetch(`${ window.location.origin }${ window.location.pathname }address.html`);
                const response = await request.text();

                const newSection = document.createElement('section');
                newSection.classList.add('c-checkout_section', 'is-visible');
                newSection.dataset.section = 'Address';
                newSection.innerHTML = response;

                this._sectionsContainer.appendChild(newSection);
                this.el.classList.remove('is-hidden');
                this._loginModal.classList.add('is-hidden');
            })();
        }
    }

    public set(key:string, value:string|number|boolean):void{
        this._user[key] = value;
    }

    public get(key:string):any{
        return this._user[key];
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
