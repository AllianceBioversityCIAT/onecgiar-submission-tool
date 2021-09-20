import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';
import { InteractionsService } from '../../../../../../../shared/services/interactions.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  filesList:any[]=[];
  filesSavedList = [];
  showForm = false;
  data = {
    id : null,
    // detailed_budget : "algo no tan implicito",
    active : true,
    section : "budget",
    updateFiles : []
  };
  constructor(
    public _initiativesService: InitiativesService,
    private _interactionsService:InteractionsService
  ) { }

  ngOnInit(): void {
    this.getFinancialResources();
  }

  getFinancialResources(){
    this._initiativesService.getFinancialResources(this._initiativesService.initiative.id,'budget').subscribe(resp=>{
      console.log(resp);
      this.filesList = [];
      let financialResources = resp.response.financialResourcesData;
      this.filesSavedList = financialResources?.files?financialResources.files:[];
      this.data.id = financialResources?.id;
      console.log(financialResources);
      console.log(this.filesSavedList);
    },
    err=>{console.log(err);}
    ,()=>{
      this.showForm = true;
    })
  }
  
  saveSection(){

    const formData = new FormData();

    if (this.filesList.length) {
      for  (var i =  0; i <  this.filesList.length; i++)  {  
        this.filesList[i].atributo = "si funciona"
       formData.append("file",  this.filesList[i]);
      } 
    }

    if (this.filesSavedList.length) {
      for  (var i =  0; i <  this.filesSavedList.length; i++)  {  
        if (this.filesSavedList[i].show === false) {
          let item = {
            id: this.filesSavedList[i].id,
            active: false
          }
          this.data.updateFiles.push(item);
        }
      } 
    }

    this.data.id = this.data.id == undefined ? null : this.data.id;
    formData.get('file')
    formData.append('data', JSON.stringify(this.data));
    this._initiativesService.saveFinancialResources(formData,this._initiativesService.initiative.id,'10.financial-resources',3).subscribe(resp=>{
      console.log("saveFinancialResources");
      console.log(resp);
      this.filesSavedList.length || this.filesList.length?
      this._interactionsService.successMessage('Financial Resources has been saved'):
      this._interactionsService.warningMessage('Financial Resources has been saved, but there are incomplete fields')
      this.getFinancialResources();
    })

    
  }

}
