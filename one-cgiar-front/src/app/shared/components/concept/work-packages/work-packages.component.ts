import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { StagesMenuService } from '@app/shared/services/stages-menu.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { InteractionsService } from '../../../services/interactions.service';
import { DataControlService } from '../../../services/data-control.service';
@Component({
  selector: 'app-work-packages',
  templateUrl: './work-packages.component.html',
  styleUrls: ['./work-packages.component.scss']
})
export class WorkPackagesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name','validateGeneralInformation','validateGeographicScope','validateProjectionBenefits'];
  workPackagesList=[];
  noWp = true;
  constructor(
    public _initiativesService: InitiativesService,
    private spinnerService: NgxSpinnerService,
    public stgMenuSvc: StagesMenuService, 
    public _interactionsService:InteractionsService,
    public _dataControlService:DataControlService
   ) {
  }

  ngOnInit(): void {
      this.getAllIWorkPackages();
  }

  getAllIWorkPackages(){
    let suscrip = this._initiativesService.getAllIWorkPackages(this._initiativesService.initvStgId).subscribe(resp => {
      this.workPackagesList = resp.response.workPackages;
      this.noWp  = this.workPackagesList.length ? false : true;  
    },
    err=>{
      this.noWp  = true;     
      suscrip.unsubscribe();
    },
    ()=>{
      suscrip.unsubscribe();
    })
      this.validateWorkPackages();
  }

  addWorkPackage(){
    this.spinnerService.show('work-packages');
    this._initiativesService.createWorkPackage({"initvStgId": this._initiativesService.initvStgId}).subscribe(resp=>{
      // console.log(resp);
      this.noWp  = false;
      this.getAllIWorkPackages();
      this._interactionsService.successMessage("Work package successfully added");
      this._dataControlService.menuChange$.emit();
    },
    err=>{
      this._interactionsService.errorMessage("Error");
    },
    ()=>{
      this.spinnerService.hide('work-packages');
    })
    
  }

  validateWorkPackages(){
    let formValid = true;
    for (const workPackage of this.workPackagesList) {
      if(workPackage.formValid == false){
        formValid = false;
      }
    }
  }

}
