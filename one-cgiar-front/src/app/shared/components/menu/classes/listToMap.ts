import { map } from 'rxjs/operators';
export class ListToMap{
    //? impact area list
    impactAreas:any = [];
    //? data for routing
    frontRoute = '';
    subSectionName = '';
    sort = '';
    showNameAttributeName = '';
    //?
    
    constructor(impactAreas:any[], frontRoute : string, subSectionName : string, sort : string, showNameAttributeName : string ){
        // break array instance
        this.impactAreas = this.breakArrayInstance(impactAreas);
        this.frontRoute = frontRoute;
        this.subSectionName = subSectionName; 
        this.showNameAttributeName = showNameAttributeName;
        this.sort = sort;
        this.addAttributes();
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

    private breakArrayInstance(impactAreas){
        return  JSON.parse(JSON.stringify(impactAreas))
    } 

}