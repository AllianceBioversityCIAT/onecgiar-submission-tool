import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InitiativesService } from '@app/shared/services/initiatives.service';
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
  constructor(
    public activatedRoute: ActivatedRoute,
    public initiativesSvc: InitiativesService,
    private spinnerService: NgxSpinnerService
   ) {
  }

  ngOnInit(): void {
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
  }

  addWorkPackage(){
    this.initiativesSvc.createWorkPackage({"initvStgId": this.initvStgId}).subscribe(resp=>{
      console.log(resp);
      this.noWp  = false;
      this.getAllIWorkPackages();
    })
    
  }

}
