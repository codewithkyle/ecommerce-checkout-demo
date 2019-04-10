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
        console.warn('Server login verification is not implemented');
        
        const email = <HTMLInputElement>this._loginForm.querySelector('#loginEmailAddress');
        const password = <HTMLInputElement>this._loginForm.querySelector('#loginPassword');
        if(password.value === '123'){
            (async ()=>{
                const request = await fetch(`${ window.location.origin }${ window.location.pathname }responses/success.json`);
                const resonse = await request.text();
                const user = await JSON.parse(resonse);
                user.email = email.value;
                user.isGuest = false;
                this.checkout.user = user;
                console.warn('Proceeding with fake user information');
                this.checkout.next();
            })();
        }
        else if(password.value === '1234'){
            console.warn('Proceeding with fake guest information');
            this.checkout.user.email = email.value;
            this.checkout.user.isGuest = true;
            this.checkout.next();
        }else{
            // Builds a fake error response
            const errorResponse:ILoginResponse ={
                "success": false,
                "errors": [
                    {
                        "id": "loginPassword",
                        "message": "Incorrect password"
                    }
                ]
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

    private handleLoginErrors(response:ILoginResponse):void{
        for(let i = 0; i < response.errors.length; i++){
            const error:ILoginError = response.errors[i];
            const inputEl = this._loginForm.querySelector(`#${ error.id }`);
            inputEl.parentElement.classList.add('is-invalid');
            const errorEl = inputEl.parentElement.querySelector('.js-error-message');
            errorEl.innerHTML = error.message;
        }
    }
}