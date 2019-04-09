export class Address{

    public el:  HTMLElement;
    public checkout: Checkout;

    private _addressCards:  Array<HTMLElement>;
    private _newAddressCard:    HTMLElement;
    private _newAddressInput:   HTMLElement;
    private _cancelNewAddressButton:    HTMLButtonElement;
    private _addNewAddressButton:       HTMLButtonElement;
    private _addNewAddressLineButton:   HTMLButtonElement;
    private _additionalAddressLine:     number;
    private _additionalAddressLinesWrapper: HTMLElement;

    constructor(modal:HTMLElement, checkout:Checkout){

        this.el = modal;
        this.checkout = checkout;

        this._addressCards              = Array.from(this.el.querySelectorAll('.js-address-card'));
        this._newAddressCard            = this.el.querySelector('.js-new-address-card');
        this._newAddressInput           = this.el.querySelector('.js-new-address-form');
        this._cancelNewAddressButton    = this.el.querySelector('.js-cancel-new-address');
        this._addNewAddressButton       = this.el.querySelector('.js-add-new-address');
        this._addNewAddressLineButton   = this.el.querySelector('.js-add-new-address-line');
        this._additionalAddressLine     = 0;
        this._additionalAddressLinesWrapper = this.el.querySelector('.js-additional-address-lines');
    }

    public init():void{
        // Address
        this._addressCards.forEach((card)=>{
            card.addEventListener('click', this.toggleAddressCard);
        });
        this._newAddressCard.addEventListener('click', this.showNewAddressForm);
        this._cancelNewAddressButton.addEventListener('click', this.hideNewAddressForm);
        this._addNewAddressButton.addEventListener('click', this.submitNewAddressForm);
        this._addNewAddressLineButton.addEventListener('click', this.addNewAddressLine);
    }

    private toggleAddressCard:EventListener = (e:Event)=>{
        const target = <HTMLElement>e.currentTarget;
        
        this._addressCards.forEach((card)=>{
            card.classList.remove('is-selected');
        });

        target.classList.add('is-selected');
    }

    /**
     * Called when the New Address card is clicked.
     */
    private showNewAddressForm:EventListener = (e:Event)=>{
        this._addressCards.forEach((card)=>{
            card.classList.remove('is-selected');
        });
        this._additionalAddressLine = 0;
        this._additionalAddressLinesWrapper.innerHTML = '';
        this._newAddressInput.classList.add('is-visible');
        this._newAddressInput.style.height = `${ this._newAddressInput.scrollHeight }px`;
    }

    private hideNewAddressForm:EventListener = (e:Event)=>{
        this._newAddressInput.classList.remove('is-visible');
        this._newAddressInput.style.height = '0px';

        const newAddressInputs = Array.from(this._newAddressInput.querySelectorAll('input'));
        newAddressInputs.forEach((input)=>{
            input.value = '';
            input.parentElement.classList.remove('has-focus', 'has-value');
        });
    }

    private submitNewAddressForm:EventListener = (e:Event)=>{
        e.preventDefault();
        console.warn('Missing form submission logic');
    }

    private addNewAddressLine:EventListener = (e:Event)=>{
        e.preventDefault();
        this._additionalAddressLine++;

        const newAddressLine = document.createElement('div');
        newAddressLine.dataset.lineNumber = this._additionalAddressLine.toString();
        newAddressLine.classList.add('o-checkout-input');
        newAddressLine.innerHTML = `<input type="text" name="newStreetAddressLine${ this._additionalAddressLine }" id="newStreetAddressLine${ this._additionalAddressLine }">`;
        newAddressLine.innerHTML += `<label for="newStreetAddressLine${ this._additionalAddressLine }">Address Line ${ this._additionalAddressLine }</label>`;
        this._additionalAddressLinesWrapper.appendChild(newAddressLine);
        this._newAddressInput.style.height = `${ this._newAddressInput.scrollHeight }px`;
    }
}