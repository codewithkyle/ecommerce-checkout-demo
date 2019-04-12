export class Account{

    public el:  HTMLElement;
    public checkout: Checkout;

    private _inputs: Array<HTMLInputElement>;
    private _loginForm: HTMLFormElement;
    private _signupForm: HTMLFormElement;

    private _guestCheckout: HTMLButtonElement;
    private _signupCheckout: HTMLButtonElement;

    constructor(modal:HTMLElement, checkout:Checkout){
        this.el = modal;
        this.checkout = checkout;

        this._inputs = Array.from(this.el.querySelectorAll('input'));
        this._loginForm = this.el.querySelector('.js-login-form');
        this._signupForm = this.el.querySelector('.js-signup-form');

        this._guestCheckout = this.el.querySelector('.js-guest-checkout-button');
        this._signupCheckout = this.el.querySelector('.js-signup-checkout-button');

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
        this._signupForm.addEventListener('submit', this.signupFormSubmit);

        // Set the click events for the signup form buttons
        this._guestCheckout.addEventListener('click', this.handleGuestCheckout);
        this._signupCheckout.addEventListener('click', this.handleSignupCheckout);
    };

    /**
     * Called when the user is trying to checkout as a guest.
     */
    private handleGuestCheckout:EventListener = (e:Event)=>{
        
        // The user is trying to checkout as a guest
        this.checkout.user.createAccount = false;
        this.checkout.user.isGuest = true;

        const nameInput = <HTMLInputElement>this._signupForm.querySelector('input#guestName');
        const emailInput = <HTMLInputElement>this._signupForm.querySelector('input#guestEmailAddress');

        if(nameInput.validity.valid && emailInput.validity.valid){
            this.checkout.user.fullName = nameInput.value;
            this.checkout.user.email = emailInput.value;
            this.checkout.next();
        }
    }

    /**
     * Called when the user is trying to checkout with a new account.
     */
    private handleSignupCheckout:EventListener = (e:Event)=>{
        
        // The user is trying to checkout with a new account
        this.checkout.user.createAccount = true;
        this.checkout.user.isGuest = true;

        console.warn('Not verifying the email availability with the server');

        const nameInput = <HTMLInputElement>this._signupForm.querySelector('input#guestName');
        const emailInput = <HTMLInputElement>this._signupForm.querySelector('input#guestEmailAddress');

        if(nameInput.validity.valid && emailInput.validity.valid){
            this.checkout.user.fullName = nameInput.value;
            this.checkout.user.email = emailInput.value;

            const passwordInput = <HTMLInputElement>this._signupForm.querySelector('input#guestPassword');
            if(passwordInput.validity.valid){
                const verifyPasswordInput = <HTMLInputElement>this._signupForm.querySelector('input#verifyPassword');

                // Check if the password values match
                if(passwordInput.value === verifyPasswordInput.value){
                    this.checkout.user.password = passwordInput.value;
                    this.checkout.next();
                }else{
                    // If invalid add the `is-invalid` status class
                    verifyPasswordInput.parentElement.classList.add('is-invalid');

                    // Get the error message element
                    const errorEl = verifyPasswordInput.parentElement.querySelector('.js-error-message');

                    // Add the validation message to the error
                    errorEl.innerHTML = 'Passwords don\'t match';
                }
            }
        }
    }

    /**
     * Called when the `submit` event is fired on the signup form.
     */
    private signupFormSubmit:EventListener = (e:Event)=>{
        // Prevent the default form submission
        e.preventDefault();
    }

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