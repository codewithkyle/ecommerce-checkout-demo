export class Checkout{

    private _inputs: Array<HTMLInputElement>;

    constructor(){

        this._inputs    = Array.from(document.body.querySelectorAll('input'));

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

    /**
     * Called when the class has be created.
     */
    private init():void{
        this._inputs.forEach((input)=>{
            input.addEventListener('focus', this.handleFocus);
            input.addEventListener('blur', this.handleBlur);
        });
    }
}

/**
 * IIFE for launching the Checkout prototype.
 */
(()=>{
    new Checkout();
})();
