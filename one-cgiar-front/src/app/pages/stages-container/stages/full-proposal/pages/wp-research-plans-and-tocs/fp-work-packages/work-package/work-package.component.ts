import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WpDataControlService } from '../services/wp-data-control.service';
import { DataControlService } from '../../../../../../../../shared/services/data-control.service';
import { InitiativesService } from '../../../../../../../../shared/services/initiatives.service';
import { InteractionsService } from '../../../../../../../../shared/services/interactions.service';
import { AuthService } from '../../../../../../../../shared/services/auth.service';


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
    public _initiativesService:InitiativesService,
    private _interactionsService : InteractionsService,
    public _authService: AuthService
  ){

  }

  ngOnInit(){
    this._initiativesService.setTitle('Work package')
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
    this.router.navigate([`/initiatives/${this._initiativesService.initiative.id}/stages/${this._initiativesService.initiative.exactStageName}/work-package-research-plans-and-tocs/work-packages`])
    setTimeout(() => {
      this.router.navigate([currentRoute])
    }, 100);
    
  }

  ngOnDestroy(): void {
   this.wpColorselected(3, 5, 12,-1)
  }

  ngDoCheck(): void {
    if (this._wpDataControlService.wpId && this._dataControlService.userMenu.length) {
      this.wpColorselected(3, 5, 12, this._wpDataControlService.wpId);
    } 
  }

  deleteCurrentWP() {

    let body = {
      id: Number(this._wpDataControlService.wpId),
      active: false,
    }

    console.log(this._wpDataControlService.wpId)




    console.log('addWorkPackage()')
    // let body = {active:false,id:this._wpDataControlService.wpId}
    console.log(body)
    this._initiativesService.saveWpFp(body).subscribe(resp => {
      console.log(resp)
      this._interactionsService.successMessage('Work package has been removed')
      this.router.navigate([`/initiatives/${this._initiativesService.initiative.id}/stages/${this._initiativesService.initiative.exactStageName}/work-package-research-plans-and-tocs/work-packages`])
    })
    
  }

  wpColorselected(stageId, sectionId, subSectionId, wpId){
    // select all wp 

    // return true;

    try {
      let allWp = this._dataControlService.userMenu?.find((menuItem) => menuItem.stageId == stageId)
      .sections?.find((section) => section.sectionId == sectionId)
      .subsections?.find((subSection) => subSection.subSectionId == subSectionId)
      .dynamicList
      // clean wp activeSection attribute
  
      if (allWp) {
        allWp.map(wp=>wp.activeSection = false)
      }
     
      // select current wp
      if (wpId != -1 && allWp) {
        let sectionFinded = allWp.find((wp) => wp.id == wpId);
        if (sectionFinded) sectionFinded.activeSection = true;
      }
    } catch (error) {
      console.log(error)
    }

     
  }


}
