import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { InteractionsService } from '../../../../../../../shared/services/interactions.service';
import { DataControlService } from '../../../../../../../shared/services/data-control.service';
import { DataValidatorsService } from '../../../../shared/data-validators.service';
import { environment } from '../../../../../../../../environments/environment';
import { managementPlan } from './models/management-plan.interface';
import { Risk } from './models/risk.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-risk-assessment',
  templateUrl: './risk-assessment.component.html',
  styleUrls: ['./risk-assessment.component.scss']
})
export class RiskAssessmentComponent implements OnInit {
  stepNumber = 0;
  riskListIsLoaded = false;
  managementPlan: managementPlan={
    id:null,
    active: true,
    section: "risk_assessment",
    updateFiles: []
  };
  //   {
//     "id": null,
//     "management_plan": "new plan",
//     "active": true,
//     "section": "management_plan",
//     "updateFiles": [],
//     "riskassessment": [
//         {
//             "id": null,
//             "risks_achieving_impact": "TEST TEST TEST",
//             "description_risk": "TEST TEST",
//             "likelihood": 5,
//             "impact": 1,
//             "risk_score": 4,
//             "active": true,
//             "manage_plan_risk_id": null,
//             "opportinities": [
//                 {
//                     "id": null,
//                     "opportunities_description": "s",
//                     "risk_assessment_id": 1
//                 }
//             ]
//         }
//     ]
// }
  risksList:Risk[]=[];
  showForm = false;
  riskDataLoaded = false;
  constructor(
    public _initiativesService: InitiativesService,
    private _interactionsService: InteractionsService,
    public _dataControlService: DataControlService,
    public _dataValidatorsService: DataValidatorsService,
    private router:Router
  ) {

  }

  ngOnInit(): void {
    this.getManagePlan();
    this.getRisksList();
  }

  getRisksList(){
    this._initiativesService.getRisksList().subscribe(resp=>{
      let response:Risk[] = resp.response.risks;
      response.map((res:any)=>{
        res.risks_achieving_impact = res.generic_risks
        res.idBd = res.id;
        res.id = null;
      })
      this.risksList = response;
      this.riskListIsLoaded = true;
    })
  }

  reloadComponent(){
    let currentRoute = this.router.routerState.snapshot.url;
    this.router.navigate([`/initiatives/${this._initiativesService.initiative.id}/stages/full-proposal/mpara/management-plan`])
    setTimeout(() => {
      this.router.navigate([currentRoute])
    }, 10);
    
    console.log("Reload");
  }



  steperValidation(response){
    this.stepNumber = 1;
    if (!response) return;
    this.stepNumber = 2;
  }


  getManagePlan() {
    this._initiativesService.getManagePlan(this._initiativesService.initiative.id, 'risk_assessment').subscribe(resp => {
      let response: managementPlan = resp.response.managePlanData;
      this.steperValidation(response);
      if (response) this.managementPlan = response;
      if (!response) this.managementPlan.riskassessment = []
      console.log("getManagePlan()");
      console.log(this.managementPlan);

    },
      err => { console.log(err); }
      , () => {
        this.showForm = true;
      })
  }

  saveSection() {
    console.log(this.managementPlan);
    let formData = new FormData();
    console.log('-------------- response ---------------------');
    // this.managementPlan.riskassessment.map(ra=>{
    //   ra.opportinities = [];     
    // })
    formData.append('data', JSON.stringify(this.managementPlan));
    // console.log(formData.get('data'));
    console.log(this.managementPlan);
    console.log("_____________________________________________");
    this._initiativesService.saveManagePlan(formData, this._initiativesService.initiative.id, '7.management-plan', 3).subscribe(resp => {
      console.log("management-plan");
      console.log(resp);
      // this.reloadComponent();
      this.getManagePlan();
      this.managementPlan.riskassessment.length?
      this._interactionsService.successMessage('Risk assessment plan has been saved'):
      this._interactionsService.warningMessage('Risk assessment plan has been saved, but there are incomplete fields')
    })

  }






  // templatesUrlBase = environment.templatesUrlBase;
  // filesList:any[]=[];
  // filesSavedList = [];
  // showForm = false;
  // data = {
  //   id : null,
  //   active : true,
  //   section : "risk_assessment",
  //   updateFiles : []
  // };

  // constructor(
  //   public _initiativesService:InitiativesService,
  //   private _interactionsService:InteractionsService,
  //   public _dataControlService:DataControlService,
  //   public _dataValidatorsService:DataValidatorsService
  // ) { 
  // }

  // ngOnInit(): void {
  //   this.getManagePlan();
  // }

  // getManagePlan(){
  //   this._initiativesService.getManagePlan(this._initiativesService.initiative.id,'risk_assessment').subscribe(resp=>{
  //     // console.log(resp);
  //     this.filesList = [];
  //     let mpara = resp.response.managePlanData;
  //     this.filesSavedList = mpara?.files?mpara.files:[];
  //     this.data.id = mpara?.id;
  //     // console.log(mpara);
  //     // console.log(this.filesSavedList);
  //   },
  //   err=>{console.log(err);}
  //   ,()=>{
  //     this.showForm = true;
  //   })
  // }
  // saveSection(){

  //   const formData = new FormData();

  //   if (this.filesList.length) {
  //     for  (var i =  0; i <  this.filesList.length; i++)  {  
  //       this.filesList[i].atributo = "si funciona"
  //      formData.append("file",  this.filesList[i]);
  //     } 
  //   }

  //   if (this.filesSavedList.length) {
  //     for  (var i =  0; i <  this.filesSavedList.length; i++)  {  
  //       if (this.filesSavedList[i].show === false) {
  //         let item = {
  //           id: this.filesSavedList[i].id,
  //           active: false
  //         }
  //         this.data.updateFiles.push(item);
  //       }
  //     } 
  //   }


  //   this.data.id = this.data.id == undefined ? null : this.data.id;

  //   formData.append('data', JSON.stringify(this.data));
  //   this._initiativesService.saveManagePlan(formData,this._initiativesService.initiative.id,'7.management-plan',3).subscribe(resp=>{
  //     console.log("management-plan");
  //     console.log(resp);
  //     this.getManagePlan();
  //     this._dataValidatorsService.validateFilesArray(this.filesList,this.filesSavedList)?
  //     this._interactionsService.successMessage('Risk assessment plan has been saved'):
  //     this._interactionsService.warningMessage('Risk assessment plan has been saved, but there are incomplete fields')
  //   })

  // }

}
