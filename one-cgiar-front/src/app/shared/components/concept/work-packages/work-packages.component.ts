import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { StagesMenuService } from '@app/shared/services/stages-menu.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { InteractionsService } from '../../../services/interactions.service';
@Component({
  selector: 'app-work-packages',
  templateUrl: './work-packages.component.html',
  styleUrls: ['./work-packages.component.scss']
})
export class WorkPackagesComponent implements OnInit {

  workPackagesList=[];
  initvStgId=null;
  noWp = false;
  regionsList=[];
  constructor(
    public activatedRoute: ActivatedRoute,
    public initiativesSvc: InitiativesService,
    private spinnerService: NgxSpinnerService,
    public stgMenuSvc: StagesMenuService, 
   ) {
  }

  ngOnInit(): void {
    let cont=0;
    this.initiativesSvc.getCLARISARegionsByPage(1).subscribe(resp=>{
      console.log('%cCLARISA regions','background: #222; color: #ffff00');
      console.log(resp);
      this.regionsList = resp.response.regions;
    })
    this.activatedRoute.params.subscribe(resp => {
      this.initvStgId = resp['id'];
      this.getAllIWorkPackages();
    })
  }

  getAllIWorkPackages(){
    this.spinnerService.show('work-packages');
    let suscrip = this.initiativesSvc.getAllIWorkPackages(this.initvStgId).subscribe(resp => {
      this.workPackagesList = resp.response.workPackages;
    },
    err=>{
      this.noWp  = true;     
      this.spinnerService.hide('work-packages');
      suscrip.unsubscribe();
    },
    ()=>{
      this.spinnerService.hide('work-packages');
      suscrip.unsubscribe();
    })
      this.validateWorkPackages();
  }

  addWorkPackage(){
    this.initiativesSvc.createWorkPackage({"initvStgId": this.initvStgId}).subscribe(resp=>{
      console.log(resp);
      this.noWp  = false;
      this.getAllIWorkPackages();
    })
    
  }

  validateWorkPackages(){
    let formValid = true;
    for (const workPackage of this.workPackagesList) {
      if(workPackage.formValid == false){
        formValid = false;
      }
    }
    this.stgMenuSvc.setFormStageStatus('concept', 'work_packages', formValid?'VALID':'INVALID', this.initvStgId);
  }

}
