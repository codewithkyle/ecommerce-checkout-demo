export class Checkout{

    private _inputs: Array<HTMLInputElement>;
    
    private _addressCards:  Array<HTMLElement>;

    constructor(){

        this._inputs    = Array.from(document.body.querySelectorAll('input'));

        this._addressCards  = Array.from(document.body.querySelectorAll('.js-address-card'));

        this.init();
    }

    private handleBlur:EventListener = (e:Event)=>{
        const target = <HTMLInputElement>e.currentTarget;
        target.parentElement.classList.remove('has-focus');

        if(target.value !== ''){
            target.parentElement.classList.add('has-value');
        }else{
            target.parentElement.classList.remove('has-value');
        }
    }

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
     * Called when the class has be created.
     */
    private init():void{
        this._inputs.forEach((input)=>{
            input.addEventListener('focus', this.handleFocus);
            input.addEventListener('blur', this.handleBlur);
        });

        this._addressCards.forEach((card)=>{
            card.addEventListener('click', this.toggleAddressCard);
        });
    }
}

/**
 * IIFE for launching the Checkout prototype.
 */
(()=>{
    new Checkout();
})();
