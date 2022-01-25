
import { environment } from '../../../environments/environment';

export class DevConsole {

    textStyles = [
        'color: green',
        'background: yellow',
        'font-size: 30px',
        'padding: 7px',
    ].join(';');

    objectStyles = [
        'color: black',
        'background: white',
        'font-size: 20px',
        'padding: 4px 10px',
        'border-radius: 5px',
        'margin-bottom: 10px',
        'width:100%',
        'font-weight: 600',
    ].join(';');


    private isProduction = environment.production;
    constructor() {
        
    }

    log(text:string,object?:Object){
        if (this.isProduction) return;
        text && object ? console.log('%c'+text, this.objectStyles,object) : console.log('%c'+text, this.textStyles);
        console.log('%c ', 'padding: 1px 100% 1px 0px; background: white; border-radius: 100px,')
    }

    

}