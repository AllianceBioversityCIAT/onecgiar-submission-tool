import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';
import { InteractionsService } from '../../../../../../../shared/services/interactions.service';
import { DataValidatorsService } from '../../../../shared/data-validators.service';
import { DataControlService } from '../../../../../../../shared/services/data-control.service';

@Component({
  selector: 'app-result-framework',
  templateUrl: './result-framework.component.html',
  styleUrls: ['./result-framework.component.scss']
})
export class ResultFrameworkComponent implements OnInit {

  filesList:any[]=[];
  filesSavedList = [];
  showForm = false;
  data = {
    id : null,
    // melia_plan : "algo no tan implicito",
    active : true,
    section : "result_framework",
    updateFiles : []
  };
  constructor(
    public _initiativesService: InitiativesService,
    private _interactionsService:InteractionsService,
    public _dataValidatorsService:DataValidatorsService,
    public _dataControlService:DataControlService
  ) { }

  ngOnInit(): void {
    this.getMelia();
  }

  getMelia(){
    this._initiativesService.getMelia('result_framework').subscribe(resp=>{
      // console.log(resp);
      this.filesList = [];
      let melia = resp.response.meliaData;
      this.filesSavedList = melia?.files?melia.files:[];
      this.data.id = melia?.id;
      // console.log(melia);
      // console.log(this.filesSavedList);
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
    this._initiativesService.saveMelia(formData).subscribe(resp=>{
      console.log("saveMelia");
      console.log(resp);
      this._dataValidatorsService.validateFilesArray(this.filesList,this.filesSavedList)?
      this._interactionsService.successMessage('Result Framework has been saved'):
      this._interactionsService.warningMessage('Result Framework has been saved, but there are incomplete fields')
      this.getMelia();
    })

    
  }

}
