export class Checkout{

    constructor(){
        this.init();
    }

    /**
     * Called when the class has be created.
     */
    private init():void{
        console.log('Checkout started');
    }
}

/**
 * IIFE for launching the Checkout prototype.
 */
(()=>{
    new Checkout();
})();
