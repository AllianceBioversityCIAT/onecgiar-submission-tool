import { map } from 'rxjs/operators';
export class ListToMap{
    impactAreas:any = [];
    // data for routing

    frontRoute = '';
    subSectionName = '';
    sort = '';
    //
    showNameAttributeName = '';


    constructor(impactAreas, frontRoute : string, subSectionName : string, sort : string, showNameAttributeName : string ){
        this.impactAreas = impactAreas;
        this.frontRoute = frontRoute;
        this.subSectionName = subSectionName; 
        this.showNameAttributeName = showNameAttributeName;
        this.sort = sort;
        this.addAttributes();
    }

    public log(text,color){
        console.log('%c'+text, 'background: #222; color: '+color);
        console.log("helloo");
    }

    public getList(){
        return this.impactAreas;
    }

    private addAttributes(){
        this.impactAreas.map(item=>{
            item.showName = item[this.showNameAttributeName];  
            item.frontRoute = this.frontRoute;
            item.subSectionName =  this.subSectionName;
            item.sort = this.sort;
        })
    }


    


}