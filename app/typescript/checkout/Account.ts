export class Account{

    public el:  HTMLElement;
    public checkout: Checkout;

    private _inputs: Array<HTMLInputElement>;
    private _loginForm: HTMLFormElement;

    constructor(modal:HTMLElement, checkout:Checkout){
        this.el = modal;
        this.checkout = checkout;
        this._inputs    = Array.from(this.el.querySelectorAll('input'));
        this._loginForm = this.el.querySelector('.js-login-form');
        this.init();
    }

    private init():void{
        this._inputs.forEach((input)=>{
            input.addEventListener('focus', this.handleFocus);
            input.addEventListener('blur', this.handleBlur);
        });

        this._loginForm.addEventListener('submit', this.loginFormSubmit);
    };

    /**
     * Called when the user submits the account login form.
     */
    private loginFormSubmit:EventListener = (e:Event)=>{
        e.preventDefault();
        console.error('Server login verification is not implemented');
        
        const email = <HTMLInputElement>this._loginForm.querySelector('#loginEmailAddress');
        const password = <HTMLInputElement>this._loginForm.querySelector('#loginPassword');
        if(password.value === '1231q2'){
            console.warn('Proceeding with fake information');
            this.checkout.set('emailAddress', email.value);
            this.checkout.next();
        }else{
            // Builds a fake error response
            const errorResponse:ILoginError ={
                0:{
                    inputId: 'loginPassword',
                    errorMessage: 'Incorrect password'
                }
            }
            this.handleLoginErrors(errorResponse);
        }
    }

    /**
     * Called when an `HMLTInputElement` elements `blur` event is fired.
     */
    private handleBlur:EventListener = (e:Event)=>{
        const target = <HTMLInputElement>e.currentTarget;
        target.parentElement.classList.remove('has-focus');

        if(target.value !== ''){
            target.parentElement.classList.add('has-value');
        }else{
            target.parentElement.classList.remove('has-value');
        }

        if(!target.validity.valid){
            target.parentElement.classList.add('is-invalid');
            const errorEl = target.parentElement.querySelector('.js-error-message');
            errorEl.innerHTML = target.validationMessage;
        }else{
            target.parentElement.classList.remove('is-invalid');
        }
    }

    /**
     * Called with an `HTMLInputElement` elements `focus` event is fired.
     */
    private handleFocus:EventListener = (e:Event)=>{
        const target = <HTMLInputElement>e.currentTarget;
        target.parentElement.classList.add('has-focus');
    }

    private handleLoginErrors(errors:ILoginError):void{
        for(let error in errors){
            const inputEl = this._loginForm.querySelector(`#${ errors[error].inputId }`);
            inputEl.parentElement.classList.add('is-invalid');
            const errorEl = inputEl.parentElement.querySelector('.js-error-message');
            errorEl.innerHTML = errors[error].errorMessage;
        }
    }
}