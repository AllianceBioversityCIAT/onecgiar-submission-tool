import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataControlService } from '../../../../../../../../shared/services/data-control.service';
import { InitiativesService } from '../../../../../../../../shared/services/initiatives.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { InteractionsService } from '../../../../../../../../shared/services/interactions.service';

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
     private _activatedRoute: ActivatedRoute,
     private _interactionsService:InteractionsService,
     private router:Router
  ) { }




  ngOnInit(): void {


    this.getWpSubscription = this._activatedRoute.params.subscribe(params => {
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
    this._initiativesService.getWpById(wpId, 'pre-concept').pipe(map((resp:any)=>resp?.response?.workpackage)).subscribe(resp => {
      console.log(resp);
      let {acronym, name, pathway_content, is_global, id, active} = resp;

      this.workPackageBody ={
        acronym,
        name,
        pathway_content,
        is_global,
        id,
        active
      }
      
      console.log(this.workPackageBody)


    })
  }


  saveWpFp() {

    this._initiativesService.saveWpFp(this.workPackageBody, this._initiativesService.initiative.id).subscribe(resp => {

      console.log(resp)
    })

  }

  deleteCurrentWP() {

    let body = {
      id: Number(this.workPackageBody.id),
      active: false,
    }

    console.log(this.workPackageBody.id)
    console.log('addWorkPackage()')

    console.log(body)
    this._initiativesService.saveWpFp(body, this._initiativesService.initiative.id).subscribe(resp => {
      console.log(resp)
      this._interactionsService.successMessage('Work package has been removed')
      this.router.navigate([`/initiatives/${this._initiativesService.initiative.id}/stages/pre-concept/wp-and-geo-focus/work-packages-table`])
    })
    
  }



}
