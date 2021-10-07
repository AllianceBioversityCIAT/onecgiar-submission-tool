import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { InteractionsService } from '@app/shared/services/interactions.service';
import { DataControlService } from '../../../../../../../shared/services/data-control.service';
import { DataValidatorsService } from '../../../../shared/data-validators.service';

@Component({
  selector: 'app-smpg-table',
  templateUrl: './smpg-table.component.html',
  styleUrls: ['./smpg-table.component.scss']
})
export class SmpgTableComponent implements OnInit {
  filesList:any[]=[];
  filesSavedList = [];
  showForm = false;
  data = {
    id : null,
    active : true,
    section : "management_gantt",
    updateFiles : []
  };

  constructor(
    public _initiativesService:InitiativesService,
    private _interactionsService:InteractionsService,
    public _dataControlService:DataControlService,
    public _dataValidatorsService:DataValidatorsService
  ) { 
  }

  ngOnInit(): void {
    this.getManagePlan();
  }

  getManagePlan(){
    this._initiativesService.getManagePlan(this._initiativesService.initiative.id,'management_gantt').subscribe(resp=>{
      console.log(resp);
      this.filesList = [];
      let mpara = resp.response.managePlanData;
      this.filesSavedList = mpara?.files?mpara.files:[];
      this.data.id = mpara?.id;
      console.log(mpara);
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

    formData.append('data', JSON.stringify(this.data));
    this._initiativesService.saveManagePlan(formData,this._initiativesService.initiative.id,'7.management-plan',3).subscribe(resp=>{
      console.log("management-plan");
      console.log(resp);
      this.getManagePlan();
      this._dataValidatorsService.validateFilesArray(this.filesList,this.filesSavedList)?
      this._interactionsService.successMessage('Summary management plan Gantt table has been saved'):
      this._interactionsService.warningMessage('Summary management plan Gantt table, but there are incomplete fields')
    })

  }

}
