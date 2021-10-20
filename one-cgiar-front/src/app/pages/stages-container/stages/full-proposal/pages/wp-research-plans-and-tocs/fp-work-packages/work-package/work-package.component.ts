import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WpDataControlService } from '../services/wp-data-control.service';
import { DataControlService } from '../../../../../../../../shared/services/data-control.service';
import { InitiativesService } from '../../../../../../../../shared/services/initiatives.service';


@Component({
  selector: 'app-work-package',
  templateUrl: './work-package.component.html',
  styleUrls: ['./work-package.component.scss']
})
export class WorkPackageComponent implements OnInit {
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private _wpDataControlService:WpDataControlService,
    private _dataControlService:DataControlService,
    private router:Router,
    private _initiativesService:InitiativesService
  ){

  }

  ngOnInit(){
    let reload = false;
    this.activatedRoute.params.subscribe((routeResp: any) => {
      // console.log(routeResp);
      this._wpDataControlService.wpId = routeResp.wpID;
      if (reload){
        this.reloadComponent();
      }
      reload = true;
    });

  }

  reloadComponent(){
    let currentRoute = this.router.routerState.snapshot.url;
    this.router.navigate([`/initiatives/${this._initiativesService.initiative.id}/stages/full-proposal/work-package-research-plans-and-tocs/work-packages`])
    setTimeout(() => {
      this.router.navigate([currentRoute])
    }, 10);
    
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
   this.wpColorselected(3, 5, 12,-1)
  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    // console.log(this.iaID);
    // console.log(this._dataControlService.userMenu);
    // console.log("--------------------");
    // console.log(this._wpDataControlService.wpId);
    // console.log(this._dataControlService.userMenu.length);
    if (this._wpDataControlService.wpId && this._dataControlService.userMenu.length) {
      this.wpColorselected(3, 5, 12, this._wpDataControlService.wpId);
    }
    
  }

  wpColorselected(stageId, sectionId, subSectionId, wpId){
    // select all wp 
    let allWp = this._dataControlService.userMenu.find((menuItem) => menuItem.stageId == stageId)
    .sections.find((section) => section.sectionId == sectionId)
    .subsections.find((subSection) => subSection.subSectionId == subSectionId)
    .dynamicList
    // clean wp activeSection attribute

    if (allWp) {
      allWp.map(wp=>wp.activeSection = false)
    }
   
    // select current wp
    if (wpId != -1 && allWp) {
      let sectionFinded = allWp.find((wp) => wp.id == wpId).activeSection = true;
      // console.log(sectionFinded);
    }
    // console.log(allWp);
     
  }


}
