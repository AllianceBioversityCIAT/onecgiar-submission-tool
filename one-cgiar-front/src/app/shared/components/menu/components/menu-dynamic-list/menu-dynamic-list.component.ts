import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { InitiativesService } from '../../../../services/initiatives.service';
import { Router } from '@angular/router';

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
    private router : Router
  ) { }

  ngOnInit(): void {
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

}
