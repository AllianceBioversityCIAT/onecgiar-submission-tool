import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { InitiativesService } from '../../../../services/initiatives.service';
import { Router } from '@angular/router';
import { InteractionsService } from '../../../../services/interactions.service';

@Component({
  selector: 'app-menu-dynamic-list',
  templateUrl: './menu-dynamic-list.component.html',
  styleUrls: ['./menu-dynamic-list.component.scss']
})
export class MenuDynamicListComponent implements OnInit {
  @Input() subSection;
  @Input() section;
  @Input() stage;
  constructor(
    public _menuService : MenuService,
    private _initiativesService:InitiativesService,
    private router : Router,
    private _interactionsService : InteractionsService
  ) { }

  ngOnInit(): void {
  }

  addWorkPackage(){
    console.log('addWorkPackage()')
    let body = {active:true,id:null}
    this._initiativesService.saveWpFp(body,this._initiativesService.initiative.id).subscribe(resp=>{
      console.log(resp.response.workpackage.id)
      this.router.navigate([`/initiatives/${this._initiativesService.initiative.id}/stages/full-proposal/work-package-research-plans-and-tocs/work-packages/work-package/${resp.response.workpackage.id}/wp-general-info`])

      this._interactionsService.successMessage('Work package has been created')
    })
  }

  partnersNotRelatedRoute() {
    return `/initiatives/${this._initiativesService.initiative.id}/stages/full-proposal/impact-statements/impact-areas/partners-no-impact-area`
  }

  dynamicListNavigation(itemID, stage: string, section: string, subsection?: string | []) {
    let baseUrl = this.router.routerState.snapshot.url.substring(0, this.router.routerState.snapshot.url.indexOf('stages/')) + 'stages/';
    let stageParam = stage.toLowerCase().split(' ').join('-');
    itemID =  itemID == undefined ? "" : itemID;
    this.router.navigate([baseUrl + stageParam + '/' + section + subsection + itemID]);
    // this.router.navigate([baseUrl, stageParam, section, subsection, itemID]);
  }

  dynamicListSubSectionNavigation(stage: string, section: string, subsection?: string | []) {
    let baseUrl = this.router.routerState.snapshot.url.substring(0, this.router.routerState.snapshot.url.indexOf('stages/')) + 'stages/';
    let stageParam = stage.toLowerCase().split(' ').join('-');
    // console.log(baseUrl+ stageParam+'/'+ section + subsection + itemID);
    return baseUrl + stageParam + '/' + section + subsection;
    // this.router.navigate([baseUrl, stageParam, section, subsection, itemID]);
  }

  validateIfShowAddWp(){
    return (this.subSection.subSectionId === 12 || this.subSection.subSectionId === 28) && !this._initiativesService.initiative.readonly;
  }

}
