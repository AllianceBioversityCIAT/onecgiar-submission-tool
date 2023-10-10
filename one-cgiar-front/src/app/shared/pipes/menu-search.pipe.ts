import { Pipe, PipeTransform } from '@angular/core';
import { UtilsService } from '../services/utils.service';

@Pipe({
  name: 'menuSearch'
})
export class MenuSearchPipe implements PipeTransform {

  constructor(private _utilsService:UtilsService){

  }

  transform(menuList:any,word:string): any {
    // console.log(menuList)
    const stage = menuList.find(stageItem=>stageItem.active);
    let sections = stage.sections;
    let utlBase = this._utilsService.stageBaseRoute+this._utilsService.convertToKebabCase(stage?.description)+'/';
    let result=[];

    sections.map(sectionItem=>{
      const {display_name} = sectionItem;
      let subsections = []
        sectionItem.subsections.map(subsectionItem=>{
          const {display_name} = subsectionItem;
          let dynamicList = [];
          if (subsectionItem.dynamicList?.length){
            subsectionItem.dynamicList.map(dynamicListItem=>{
              if (dynamicListItem.showName?.toUpperCase().indexOf(word?.toUpperCase())>-1)dynamicList.push({display_name: dynamicListItem.showName,router:utlBase+sectionItem.description+'/'+subsectionItem.description+'/'+dynamicListItem.frontRoute+dynamicListItem.id});
            })
          }
          if (subsectionItem.display_name?.toUpperCase().indexOf(word?.toUpperCase())>-1 || dynamicList?.length) subsections.push({disabled: !!subsectionItem.dynamicList?.length,router:utlBase+sectionItem.description+'/'+subsectionItem.description,display_name,dynamicList})
        })
        if (sectionItem.display_name?.toUpperCase().indexOf(word?.toUpperCase())>-1 || subsections?.length) result.push({disabled: !!sectionItem.subsections.length,router:utlBase+sectionItem.description,display_name,subsections}
        )
    })
    return result;
  }

}


    // if (word == '' ) return list;
    // if (list) {
    //   for (const item of list) {
    //     if (item[attributeName].toUpperCase().indexOf(word?.toUpperCase())>-1) {
    //       array.push(item);
    //     }
        
    //   } 
    // }