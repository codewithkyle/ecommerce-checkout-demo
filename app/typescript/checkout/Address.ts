import { parsePhoneNumber } from 'libphonenumber-js'

export class Address{

    public static SVG:string = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="33.5" viewBox="0 0 23.761 33.5"><g class="cls-1" transform="translate(-38.5 -27)"><path id="Path_10" data-name="Path 10" class="cls-2" d="M46.055,76.082C42.482,77.092,40,79.314,40,81.893c0,3.53,4.648,6.39,10.381,6.39s10.381-2.861,10.381-6.39c0-2.647-2.614-4.918-6.34-5.888" transform="translate(0 -29.284)"/><path id="Path_9" data-name="Path 9" class="cls-3" d="M50.381,27A10.272,10.272,0,0,0,40,37.16c0,3.763,1.3,4.939,8.179,15.738a2.627,2.627,0,0,0,4.4,0c6.885-10.8,8.179-11.976,8.179-15.738A10.272,10.272,0,0,0,50.381,27Zm0,24.553C43.491,40.741,42.6,40.059,42.6,37.16a7.787,7.787,0,0,1,15.571,0C58.166,40.046,57.346,40.622,50.381,51.553ZM46.055,37.16a4.326,4.326,0,1,1,4.325,4.233A4.28,4.28,0,0,1,46.055,37.16Z"/></g></svg>';
    public static NEW_SVG:string = '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="map-marker-plus" class="svg-inline--fa fa-map-marker-plus fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M192 0C86.4 0 0 86.4 0 192c0 76.8 25.6 99.2 172.8 310.4 4.8 6.4 12 9.6 19.2 9.6 7.2 0 14.4-3.2 19.2-9.6C358.4 291.2 384 268.8 384 192 384 86.4 297.6 0 192 0zm0 446.09c-14.41-20.56-27.51-39.13-39.41-56C58.35 256.48 48 240.2 48 192c0-79.4 64.6-144 144-144s144 64.6 144 144c0 48.2-10.35 64.48-104.59 198.09-11.9 16.87-25 35.44-39.41 56zM272 168h-56v-56c0-8.84-7.16-16-16-16h-16c-8.84 0-16 7.16-16 16v56h-56c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h56v56c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-56h56c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16z"></path></svg>';

    public el:  HTMLElement;
    public checkout: Checkout;

    private _addressCardsContainer: HTMLElement;
    private _addressCards:  Array<HTMLElement>;
    private _additionalLine: number;
    private _additionalAddressLinesWrapper: HTMLElement;
    private _addAddressLineButton: HTMLButtonElement;
    private _addressForm: HTMLFormElement;
    private _addressFormInputs: Array<HTMLInputElement>;
    private _additionalAddressLineInputs: Array<HTMLInputElement>;

    private _continueButton: HTMLButtonElement;

    constructor(modal:HTMLElement, checkout:Checkout){

        this.el = modal;
        this.checkout = checkout;

        this._addressCardsContainer = this.el.querySelector('.js-address-cards');
        this._addressCards = [];
        this._additionalLine = 0;
        this._additionalAddressLinesWrapper = this.el.querySelector('.js-additional-address-lines');
        this._addAddressLineButton = this.el.querySelector('.js-add-new-address-line');
        this._addressForm = this.el.querySelector('form');
        this._addressFormInputs = Array.from(this.el.querySelectorAll('input'));
        this._additionalAddressLineInputs = [];

        this._continueButton = this.el.querySelector('.js-continue-button');

        this.init();
    }

    /**
     * Called when the class is created.
     */
    public init():void{

        // Set the custom form submit event listener
        this._addressForm.addEventListener('submit', this.submitNewAddressForm);

        // Check if the user is logged in
        if(!this.checkout.user.isGuest){
            
            // Try to create the address cards
            this.createAddressCards();
        }

        // Set the event listener for the "+ Address Line" button
        this._addAddressLineButton.addEventListener('click', this.addNewAddressLine);

        // Loop through all the initial new address form inputs
        this._addressFormInputs.forEach((input)=>{
            
            // Set the blur and focus event listeners
            input.addEventListener('blur', this.handleBlur);
            input.addEventListener('focus', this.handleFocus);
        });

        this._continueButton.addEventListener('click', this.continueButtonClicked);
    }

    /**
     * Generate address cards from the `addresses` array returned by the successful login.
     */
    private createAddressCards():void{

        // Check if the user object has any addresses in the addresses array
        if(this.checkout.user.addresses.length){

            const addressModal = this.el.querySelector('.js-modal');
            addressModal.classList.add('has-addresses');

            // If the user has saved addresses loop through them
            for(let i = 0; i < this.checkout.user.addresses.length; i++){
                
                const address = this.checkout.user.addresses[i];

                // Create a new address card element
                const newAddressCard = document.createElement('div');
                newAddressCard.classList.add('o-address-cards_card', 'js-address-card');
                newAddressCard.dataset.id = `${ i }`;

                // Add the static address SVG
                newAddressCard.innerHTML += Address.SVG;

                // Create the unordered list element
                const addressDetails = document.createElement('ul');
                addressDetails.classList.add('o-address-cards_card_details');

                // If the address has a label, use it
                if(address.label){
                    addressDetails.innerHTML += `<li class="has-highlight">${ address.label }</li>`;
                    addressDetails.innerHTML += `<li>${ address.fullName }</li>`;
                }else{
                    addressDetails.innerHTML += `<li class="has-highlight">${ address.fullName }</li>`;
                }

                // Add Address Line 1
                addressDetails.innerHTML += `<li>${ address.addressLine1 }</li>`;
                
                // If the address has additional address lines, add them
                if(address.additionalAddressLines.length){
                    for(let i = 0; i < address.additionalAddressLines.length; i++){
                        addressDetails.innerHTML += `<li>${ address.additionalAddressLines[i] }</li>`;
                    }
                }

                // Add city, state, and zip
                addressDetails.innerHTML += `<li>${ address.city }, ${ address.state } ${ address.zip }</li>`;
                
                // Add country
                addressDetails.innerHTML += `<li>${ address.country }</li>`;
                
                // Try to parse the phone number
                try{
                    const phoneNumber = parsePhoneNumber(address.phoneNumber);
                    addressDetails.innerHTML += `<li>${ phoneNumber.formatNational() }</li>`;
                }catch{
                    addressDetails.innerHTML += `<li>${ address.phoneNumber }</li>`;
                }

                // Append the address details to the card
                newAddressCard.appendChild(addressDetails);

                // Append the card to the grid
                this._addressCardsContainer.appendChild(newAddressCard);
                
                // Push the card into the cards array
                this._addressCards.push(newAddressCard);

                // Give the card the toggle click event listener
                newAddressCard.addEventListener('click', this.toggleAddressCard);
            };
        }
    }

    /**
     * Called when we need to validate the shipping options.
     */
    private validate():void{
        
        let selectedAddress:IAddress = null;
        let usingPreviousAddress = false;

        // Check if the user is logged in
        if(!this.checkout.user.isGuest){
            
            // Get the selected address card
            const selectedAddressCard = <HTMLElement>this.el.querySelector('.js-address-card.is-selected');

            // Check if a address card is selected
            if(selectedAddressCard){

                // Set the selected address details
                selectedAddress = this.checkout.user.addresses[parseInt(selectedAddressCard.dataset.id)];
                usingPreviousAddress = true;

                this._addressFormInputs.forEach((input)=>{
                    
                    // Remove invalid status class
                    input.parentElement.classList.remove('is-invalid');
                    
                    // Check if the inputs value is empty
                    if(input.value !== ''){
                        // Value isn't empty, add the `has-value` status class
                        input.parentElement.classList.add('has-value');
                    }else{
                        // Value is empty, remove the `has-value` status class
                        input.parentElement.classList.remove('has-value');
                    }
                });
            }
        }

        // If we don't have an address try the form
        if(!usingPreviousAddress){
            
            // Assume the inputs are valid
            let allInputsAreValid = true;

            // Loop through all of the new address form inputs
            this._addressFormInputs.forEach((input)=>{
                
                // Check if the input is valid
                if(!input.validity.valid){
                    
                    // We found an invalid input
                    allInputsAreValid = false;

                    // The input is invalid, add the `is-invalid` status class
                    input.parentElement.classList.add('is-invalid');

                    // Get the error message element
                    const errorEl = input.parentElement.querySelector('.js-error-message');

                    // Update the message with the validation error message
                    errorEl.innerHTML = input.validationMessage;
                }
            });

            // If the inputs are valid get the address information
            if(allInputsAreValid){

                const labelInput = <HTMLInputElement>this._addressForm.querySelector('input#label');
                const fullName = <HTMLInputElement>this._addressForm.querySelector('input#fullName');
                const addressLine1 = <HTMLInputElement>this._addressForm.querySelector('input#addressLine1');
                const city = <HTMLInputElement>this._addressForm.querySelector('input#city');
                const state = <HTMLInputElement>this._addressForm.querySelector('input#state');
                const zip = <HTMLInputElement>this._addressForm.querySelector('input#zip');
                const country = <HTMLInputElement>this._addressForm.querySelector('input#country');
                const phoneNumber = <HTMLInputElement>this._addressForm.querySelector('input#phoneNumber');

                const additionalAddressLines:Array<string> = [];
                this._additionalAddressLineInputs.forEach((input)=>{
                    if(input.value !== ''){
                        additionalAddressLines.push(input.value);
                    }
                });

                selectedAddress = {
                    label: labelInput.value,
                    fullName: fullName.value,
                    addressLine1: addressLine1.value,
                    additionalAddressLines: additionalAddressLines,
                    city: city.value,
                    state: state.value,
                    zip: zip.value,
                    country: country.value,
                    phoneNumber: phoneNumber.value
                }
            }
        }

        this.checkout.user.selectedAddress = selectedAddress;
        this.checkout.next();
    }

    /**
     * Called when the `click` event is fired on this sections continue button.
     */
    private continueButtonClicked:EventListener = (e:Event)=>{
        this.validate();
    }

    /**
     * Toggles the selected address card.
     */
    private toggleAddressCard:EventListener = (e:Event)=>{
        
        // Get the card that the event fired on
        const target = <HTMLElement>e.currentTarget;

        // Check if the card is selected and needs to be unselected.
        const isOn = target.classList.contains('is-selected');
        
        // Clear all the `is-selected` status classes
        this._addressCards.forEach((card)=>{
            card.classList.remove('is-selected');
        });

        // If the card was unselected, select it
        if(!isOn){
            target.classList.add('is-selected');
        }
    }

    /**
     * Don't let the user submit the new address form.
     */
    private submitNewAddressForm:EventListener = (e:Event)=>{
        e.preventDefault();
    }

    /**
     * Called when the `click` event fires on the "+ Address Line" button.
     */
    private addNewAddressLine:EventListener = (e:Event)=>{
        e.preventDefault();

        // Update the line number ID
        this._additionalLine++;

        // Create a new div to wrap the line item
        const newAddressLine = document.createElement('div');
        
        // Apply the checkout input class
        newAddressLine.classList.add('o-checkout-input');

        // Add the new input
        newAddressLine.innerHTML = `<input type="text" name="addressLine${ this._additionalLine }" id="addressLine${ this._additionalLine }">`;

        // Add the label for the input
        newAddressLine.innerHTML += `<label for="addressLine${ this._additionalLine }">Address Line ${ this._additionalLine }</label>`;

        // Get the new input
        const newAddressInput = newAddressLine.querySelector('input');

        // Add the input event listeners
        newAddressInput.addEventListener('blur', this.handleBlur);
        newAddressInput.addEventListener('focus', this.handleFocus);

        // Push the input into the inputs array
        this._additionalAddressLineInputs.push(newAddressInput);

        // Append the new input to the form
        this._additionalAddressLinesWrapper.appendChild(newAddressLine);
    }

    /**
     * Called when an `HMLTInputElement` elements `blur` event is fired.
     */
    private handleBlur:EventListener = (e:Event)=>{
        const target = <HTMLInputElement>e.currentTarget;

        // Remove the `has-focus` status class
        target.parentElement.classList.remove('has-focus');

        // Check if the inputs value is empty
        if(target.value !== ''){
            // Value isn't empty, add the `has-value` status class
            target.parentElement.classList.add('has-value');
        }else{
            // Value is empty, remove the `has-value` status class
            target.parentElement.classList.remove('has-value');
        }

        // Check if the input is valid
        if(!target.validity.valid){
            // The input is invalid, add the `is-invalid` status class
            target.parentElement.classList.add('is-invalid');

            // Get the error message element
            const errorEl = target.parentElement.querySelector('.js-error-message');

            // Update the message with the validation error message
            errorEl.innerHTML = target.validationMessage;
        }else{
            // The input is valid, remove the `is-invalid` status class
            target.parentElement.classList.remove('is-invalid');
        }
    }

    /**
     * Called when an inputs `focus` event is fired.
     */
    private handleFocus:EventListener = (e:Event)=>{
        
        // Gets the input that the event fired on
        const target = <HTMLInputElement>e.currentTarget;

        // Sets the `has-focus` status class
        target.parentElement.classList.add('has-focus');

        // Clear all the `is-selected` status classes from the address cards
        this._addressCards.forEach((card)=>{
            card.classList.remove('is-selected');
        });
    }
}