import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { InteractionsService } from '../../../services/interactions.service';
@Component({
  selector: 'app-work-packages',
  templateUrl: './work-packages.component.html',
  styleUrls: ['./work-packages.component.scss']
})
export class WorkPackagesComponent implements OnInit {

  workPackagesList=[];
  initvStgId=null;
  constructor(
    public activatedRoute: ActivatedRoute,
    public initiativesSvc: InitiativesService,
    public _interactionsService: InteractionsService
   ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(resp => {
      this.initvStgId = resp['id'];
      this.getAllIWorkPackages();
    })
  }

  getAllIWorkPackages(){
    let suscrip = this.initiativesSvc.getAllIWorkPackages(this.initvStgId).subscribe(resp => {
      this.workPackagesList = resp.response.workPackages;
      suscrip.unsubscribe();
    },
    err=>{
      this._interactionsService.noWp = true;
    })
  }

  addWorkPackage(){
    this.initiativesSvc.createWorkPackage({"initvStgId": this.initvStgId}).subscribe(resp=>{
      console.log(resp);
      this._interactionsService.noWp = false;
      this.getAllIWorkPackages();
    })
    
  }

}
