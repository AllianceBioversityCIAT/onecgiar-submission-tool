import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataControlService } from '../../../../../../../../shared/services/data-control.service';
import { InitiativesService } from '../../../../../../../../shared/services/initiatives.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pc-work-package',
  templateUrl: './pc-work-package.component.html',
  styleUrls: ['./pc-work-package.component.scss']
})
export class PcWorkPackageComponent implements OnInit {
 
  workPackageBody ={
    acronym: '',
    name: '',
    pathway_content: '',
    is_global: '',
    id: '',
    active: ''
  };

  getWpSubscription:Subscription;

  constructor(
     private _dataControlService:DataControlService,
     public _initiativesService:InitiativesService ,
     private _activatedRoute: ActivatedRoute
  ) { }




  ngOnInit(): void {


    this.getWpSubscription = this._activatedRoute.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id


      this.getWpById(params['id']);


      
    });

    this._dataControlService.showCountries = true;
    this._dataControlService.showRegions = true;
    // this.getWpById();

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.getWpSubscription.unsubscribe();
  }


  getWpById(wpId) {
    this._initiativesService.getWpById(wpId, 'pre-concept').subscribe(resp => {
      console.log(resp)
    })
  }


  saveWpFp() {

    let body;
    this._initiativesService.saveWpFp(body, this._initiativesService.initiative.id).subscribe(resp => {


    })

  }



}
