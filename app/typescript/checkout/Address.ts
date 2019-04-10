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
    private _newAddressForm: HTMLFormElement;
    private _addAddressLineButton: HTMLButtonElement;
    private _newAddressCancelButton: HTMLButtonElement;
    private _addNewAddressButton: HTMLButtonElement;

    private _addressFormInputs: Array<HTMLInputElement>;
    private _additionalAddressLineInputs: Array<HTMLInputElement>;

    constructor(modal:HTMLElement, checkout:Checkout){

        this.el = modal;
        this.checkout = checkout;

        this._addressCardsContainer = this.el.querySelector('.js-address-cards');
        this._addressCards = [];
        this._additionalLine = 0;
        this._additionalAddressLinesWrapper = this.el.querySelector('.js-additional-address-lines');
        this._newAddressForm = this.el.querySelector('.js-new-address-form');
        this._addAddressLineButton = this.el.querySelector('.js-add-new-address-line');
        this._newAddressCancelButton = this.el.querySelector('.js-cancel-new-address');
        this._addNewAddressButton = this.el.querySelector('.js-add-new-address');

        this._addressFormInputs = Array.from(this.el.querySelectorAll('input'));
        this._additionalAddressLineInputs = [];

        this.init();
    }

    public init():void{
        if(!this.checkout.user.isGuest){
            this.createAddressCards();
            this._newAddressCancelButton.addEventListener('click', this.hideNewAddressForm);
        }else{
            this._newAddressCancelButton.style.display = 'none';
            this._newAddressForm.style.marginTop = '0px';
            this.showAddressForm();
        }

        this._addAddressLineButton.addEventListener('click', this.addNewAddressLine);
        this._addNewAddressButton.addEventListener('click', this.submitNewAddressForm);

        this._addressFormInputs.forEach((input)=>{
            input.addEventListener('blur', this.handleBlur);
            input.addEventListener('focus', this.handleFocus);
        });
    }

    /**
     * Generate address cards.
     */
    private createAddressCards():void{
        if(this.checkout.user.addresses.length){
            this.checkout.user.addresses.forEach((address:IAddress)=>{
                const newAddressCard = document.createElement('div');
                newAddressCard.classList.add('o-address-cards_card', 'js-address-card');
                newAddressCard.innerHTML += Address.SVG;

                const addressDetails = document.createElement('ul');
                addressDetails.classList.add('o-address-cards_card_details');
                addressDetails.innerHTML += `<li class="has-highlight">${ address.fullName }</li>`;
                addressDetails.innerHTML += `<li>${ address.addressLine1 }</li>`;
                
                if(address.additionalAddressLines.length){
                    for(let i = 0; i < address.additionalAddressLines.length; i++){
                        addressDetails.innerHTML += `<li>${ address.additionalAddressLines[i] }</li>`;
                    }
                }

                addressDetails.innerHTML += `<li>${ address.city }, ${ address.state } ${ address.zip }</li>`;
                addressDetails.innerHTML += `<li>${ address.country }</li>`;
                
                try{
                    const phoneNumber = parsePhoneNumber(`+1${ address.phoneNumber }`);
                    addressDetails.innerHTML += `<li>${ phoneNumber.formatNational() }</li>`;
                }catch{
                    addressDetails.innerHTML += `<li>${ address.phoneNumber }</li>`;
                }

                newAddressCard.appendChild(addressDetails);
                this._addressCardsContainer.appendChild(newAddressCard);
                this._addressCards.push(newAddressCard);
                newAddressCard.addEventListener('click', this.toggleAddressCard);
            });

            const addNewAddressCard = document.createElement('div');
            addNewAddressCard.classList.add('o-address-cards_new', 'js-new-address-card');
            const addNewAddressCardDetails = document.createElement('div');
            addNewAddressCardDetails.classList.add('o-address-cards_new_details');
            addNewAddressCardDetails.innerHTML = Address.NEW_SVG;
            addNewAddressCardDetails.innerHTML += '<span>NEW ADDRESS</span>';
            addNewAddressCard.appendChild(addNewAddressCardDetails);
            this._addressCardsContainer.appendChild(addNewAddressCard);
            addNewAddressCard.addEventListener('click', ()=>{ this.showAddressForm() });
        }else{
            this.showAddressForm();
        }
    }

    private toggleAddressCard:EventListener = (e:Event)=>{
        const target = <HTMLElement>e.currentTarget;
        
        this._addressCards.forEach((card)=>{
            card.classList.remove('is-selected');
        });

        target.classList.add('is-selected');
    }

    private hideNewAddressForm:EventListener = (e:Event)=>{
        this._newAddressForm.classList.remove('is-visible');
        this._newAddressForm.style.height = '0px';

        const newAddressInputs = Array.from(this._newAddressForm.querySelectorAll('input'));
        newAddressInputs.forEach((input)=>{
            input.value = '';
            input.parentElement.classList.remove('has-focus', 'has-value', 'is-invalid');
        });

        if(this._additionalAddressLineInputs.length){
            this._additionalAddressLineInputs.forEach((input)=>{
                input.removeEventListener('blur', this.handleBlur);
                input.removeEventListener('focus', this.handleFocus);
            });
        }
    }

    private submitNewAddressForm:EventListener = (e:Event)=>{
        e.preventDefault();
        console.error('Missing form submission logic');
    }

    private addNewAddressLine:EventListener = (e:Event)=>{
        e.preventDefault();

        if(this._additionalLine < 3){
            this._additionalLine++;

            const newAddressLine = document.createElement('div');
            newAddressLine.dataset.lineNumber = this._additionalLine.toString();
            newAddressLine.classList.add('o-checkout-input');
            newAddressLine.innerHTML = `<input type="text" name="newStreetAddressLine${ this._additionalLine }" id="newStreetAddressLine${ this._additionalLine }">`;
            newAddressLine.innerHTML += `<label for="newStreetAddressLine${ this._additionalLine }">Address Line ${ this._additionalLine }</label>`;
            const newAddressInput = newAddressLine.querySelector('input');
            newAddressInput.addEventListener('blur', this.handleBlur);
            newAddressInput.addEventListener('focus', this.handleFocus);
            this._additionalAddressLineInputs.push(newAddressInput);
            this._additionalAddressLinesWrapper.appendChild(newAddressLine);
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

    private showAddressForm():void{
        this._addressCards.forEach((card)=>{
            card.classList.remove('is-selected');
        });
        this._additionalLine = 0;
        this._additionalAddressLinesWrapper.innerHTML = '';
        this._newAddressForm.classList.add('is-visible');
        this._newAddressForm.style.height = `auto`;
    }
}