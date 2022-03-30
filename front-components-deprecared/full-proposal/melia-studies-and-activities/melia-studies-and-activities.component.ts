import { Component, OnInit } from '@angular/core';
import { InteractionsService } from '../../../../../../../shared/services/interactions.service';
import { DataControlService } from '../../../../../../../shared/services/data-control.service';
import { DataValidatorsService } from '../../../../shared/data-validators.service';
import { environment } from '../../../../../../../../environments/environment';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-melia-studies-and-activities',
  templateUrl: './melia-studies-and-activities.component.html',
  styleUrls: ['./melia-studies-and-activities.component.scss']
})
export class MeliaStudiesAndActivitiesComponent implements OnInit {
  templatesUrlBase = environment.templatesUrlBase;
  filesList:any[]=[];
  filesSavedList = [];
  showForm = false;
  data = {
    id : null,
    // melia_plan : "algo no tan implicito",
    active : true,
    section : "melia",
    updateFiles : []
  };
  constructor(
    public _initiativesService: InitiativesService,
    private _interactionsService:InteractionsService,
    public _dataControlService:DataControlService,
    public _dataValidatorsService:DataValidatorsService
  ) { }

  ngOnInit(): void {
    this.getMelia();
  }

  getMelia(){
    this._initiativesService.getMelia(this._initiativesService.initiative.id,'melia').subscribe(resp=>{
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
    this._initiativesService.saveMelia(formData,this._initiativesService.initiative.id,'6.melia',3).subscribe(resp=>{
      console.log("saveMelia");
      // console.log(resp);
      this._dataValidatorsService.validateFilesArray(this.filesList,this.filesSavedList)?
      this._interactionsService.successMessage('Melia studies and activities has been saved'):
      this._interactionsService.warningMessage('Melia studies and activities has been saved, but there are incomplete fields')
      this.getMelia();
    })

    
  }

}
