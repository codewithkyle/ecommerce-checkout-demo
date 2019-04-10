export class Account{

    public el:  HTMLElement;
    public checkout: Checkout;

    private _inputs: Array<HTMLInputElement>;
    private _loginForm: HTMLFormElement;

    constructor(modal:HTMLElement, checkout:Checkout){
        this.el = modal;
        this.checkout = checkout;

        this._inputs = Array.from(this.el.querySelectorAll('input'));
        this._loginForm = this.el.querySelector('.js-login-form');

        this.init();
    }

    /**
     * Called when the class is created.
     */
    private init():void{

        // Loop through all of the inputs
        this._inputs.forEach((input)=>{

            // Set the focus and blur event listeners
            input.addEventListener('focus', this.handleFocus);
            input.addEventListener('blur', this.handleBlur);
        });

        // Set the form submit event listener
        this._loginForm.addEventListener('submit', this.loginFormSubmit);
    };

    /**
     * Called when the `submit` event is fired on the login form.
     */
    private loginFormSubmit:EventListener = (e:Event)=>{
        
        // Prevent the default form submission
        e.preventDefault();

        // Temp warning, to be removed when the checkout is hooked up to craft
        console.warn('Server login verification is not implemented');
        
        // Gets the Email and Password inputs
        const email = <HTMLInputElement>this._loginForm.querySelector('#loginEmailAddress');
        const password = <HTMLInputElement>this._loginForm.querySelector('#loginPassword');
        
        // If the password is `123` fake a login
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
        // If the password is `1234` fake a guest login
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
            
            // Handle the login errors
            this.handleLoginErrors(errorResponse);
        }
    }

    /**
     * Called when the `blur` event is fired on a input.
     */
    private handleBlur:EventListener = (e:Event)=>{

        // Get the input that fired the event
        const target = <HTMLInputElement>e.currentTarget;

        // Remove the `has-focus` status class
        target.parentElement.classList.remove('has-focus');

        // Check if the value is blank
        if(target.value !== ''){
            // If input has a value add the `has-value` status class
            target.parentElement.classList.add('has-value');
        }else{
            // If the input doesn't have a value remove the `has-value` status class
            target.parentElement.classList.remove('has-value');
        }

        // Check if the input is valid
        if(!target.validity.valid){

            // If invalid add the `is-invalid` status class
            target.parentElement.classList.add('is-invalid');

            // Get the error message element
            const errorEl = target.parentElement.querySelector('.js-error-message');

            // Add the validation message to the error
            errorEl.innerHTML = target.validationMessage;
        }else{

            // If valid remove the `is-invalid` status class
            target.parentElement.classList.remove('is-invalid');
        }
    }

    /**
     * Called when the `focus` event is fired on an input.
     */
    private handleFocus:EventListener = (e:Event)=>{

        // Get the input that the event was fired on
        const target = <HTMLInputElement>e.currentTarget;

        // Set the `has-focus` status class
        target.parentElement.classList.add('has-focus');
    }

    /**
     * Called when the server couldn't validate the user.
     * Displays custom error messages from the server.
     * @param response - ILoginResponse object
     */
    private handleLoginErrors(response:ILoginResponse):void{
        
        // Loop through all of the custom errors
        for(let i = 0; i < response.errors.length; i++){
            
            // Get the `ILoginError` object from the response
            const error:ILoginError = response.errors[i];

            // Get the input element that caused the error
            const inputEl = this._loginForm.querySelector(`#${ error.id }`);
            
            // Add the `is-invalid` status class
            inputEl.parentElement.classList.add('is-invalid');

            // Get the error message element
            const errorEl = inputEl.parentElement.querySelector('.js-error-message');

            // Set the custom error message
            errorEl.innerHTML = error.message;
        }
    }
}