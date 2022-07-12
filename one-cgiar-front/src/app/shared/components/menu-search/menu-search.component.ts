import { Component, OnInit } from '@angular/core';
import { MenuSearchService } from './menu-search.service';
import { DataControlService } from '../../services/data-control.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-menu-search',
  templateUrl: './menu-search.component.html',
  styleUrls: ['./menu-search.component.scss']
})
export class MenuSearchComponent implements OnInit {
  sectionsList = [];
  textSearch:string = '';

  constructor(
    public _menuSearchService:MenuSearchService,
    private _dataControlService:DataControlService,
    private _utilsService:UtilsService
  ) { }

  ngOnInit(): void {
    this.convertToList();
  }

  convertToList(){
    this.sectionsList = [];
    let stage = this._dataControlService.userMenu.find(stageItem=>stageItem.active);
    let sections = stage.sections;
    let utlBase = this._utilsService.stageBaseRoute+this._utilsService.convertToKebabCase(stage?.description)+'/';
    sections.map(sectionItem=>{
      this.sectionsList.push({...sectionItem,lvl:1, disabled: !!sectionItem.subsections.length, router:utlBase+sectionItem.description})
      sectionItem.subsections.map(subsectionITem=>{
        this.sectionsList.push({...subsectionITem,lvl:2, disabled: !!subsectionITem.dynamicList?.length,router:utlBase+sectionItem.description+'/'+subsectionITem.description})
        if(!subsectionITem.dynamicList?.length)return;
        subsectionITem?.dynamicList.map(dynamicListITem=>{
          this.sectionsList.push({...dynamicListITem,display_name: dynamicListITem.showName,lvl:3,router:utlBase+sectionItem.description+'/'+subsectionITem.description+'/'+dynamicListITem.frontRoute+dynamicListITem.id})
        })
      })
    })
    console.log(this.sectionsList)
  }

}
