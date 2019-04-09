export class Checkout{

    private _inputs: Array<HTMLInputElement>;
    
    private _addressCards:  Array<HTMLElement>;
    private _newAddressCard:    HTMLElement;
    private _newAddressInput:   HTMLElement;
    private _cancelNewAddressButton:    HTMLButtonElement;
    private _addNewAddressButton:       HTMLButtonElement;
    private _addNewAddressLineButton:   HTMLButtonElement;
    private _additionalAddressLine:     number;
    private _additionalAddressLinesWrapper: HTMLElement;

    constructor(){

        this._inputs    = Array.from(document.body.querySelectorAll('input'));

        this._addressCards  = Array.from(document.body.querySelectorAll('.js-address-card'));
        this._newAddressCard    = document.body.querySelector('.js-new-address-card');
        this._newAddressInput   = document.body.querySelector('.js-new-address-form');
        this._cancelNewAddressButton    = document.body.querySelector('.js-cancel-new-address');
        this._addNewAddressButton       = document.body.querySelector('.js-add-new-address');
        this._addNewAddressLineButton   = document.body.querySelector('.js-add-new-address-line');
        this._additionalAddressLine     = 0;
        this._additionalAddressLinesWrapper = document.body.querySelector('.js-additional-address-lines');

        this.init();
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
    }

    /**
     * Called with an `HTMLInputElement` elements `focus` event is fired.
     */
    private handleFocus:EventListener = (e:Event)=>{
        const target = <HTMLInputElement>e.currentTarget;
        target.parentElement.classList.add('has-focus');
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

    /**
     * Called when the class has be created.
     */
    private init():void{
        this._inputs.forEach((input)=>{
            input.addEventListener('focus', this.handleFocus);
            input.addEventListener('blur', this.handleBlur);
        });

        // Address
        this._addressCards.forEach((card)=>{
            card.addEventListener('click', this.toggleAddressCard);
        });
        this._newAddressCard.addEventListener('click', this.showNewAddressForm);
        this._cancelNewAddressButton.addEventListener('click', this.hideNewAddressForm);
        this._addNewAddressButton.addEventListener('click', this.submitNewAddressForm);
        this._addNewAddressLineButton.addEventListener('click', this.addNewAddressLine);
    }
}

/**
 * IIFE for launching the Checkout prototype.
 */
(()=>{
    new Checkout();
})();
