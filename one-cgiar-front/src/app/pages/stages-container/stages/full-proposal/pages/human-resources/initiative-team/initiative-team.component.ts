import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';
import { InteractionsService } from '../../../../../../../shared/services/interactions.service';
import { DataControlService } from '../../../../../../../shared/services/data-control.service';
import { DataValidatorsService } from '@app/pages/stages-container/stages/shared/data-validators.service';
import { environment } from '../../../../../../../../environments/environment';
import { InitiativeTeamList } from './models/initiativeTeamList.interface';
import { InitiativeTeamData } from './models/initiativeTeamData.interface';

@Component({
  selector: 'app-initiative-team',
  templateUrl: './initiative-team.component.html',
  styleUrls: ['./initiative-team.component.scss']
})
export class InitiativeTeamComponent implements OnInit {

  // initiativeTeamList : InitiativeTeamList [] = [];
  initiativeTeamData : InitiativeTeamData;

  dataLoaded = false;
  constructor(
    public _initiativesService: InitiativesService,
    private _interactionsService:InteractionsService,
    public _dataControlService:DataControlService,
    public _dataValidatorsService:DataValidatorsService
  ) { }

  ngOnInit(): void {
    this.getHumanResources();
  }

  addInitiativeTeamItem(){
    this.initiativeTeamData?.initvTeam.push({active:true, area_expertise:'', category: '', id:null, key_accountabilities:''})
  }


  getHumanResources(){
    this._initiativesService.getHumanResources(this._initiativesService.initiative.id,'initiative_team').subscribe(resp=>{

      this.initiativeTeamData = resp.response.humanResourcesData;
      console.log(this.initiativeTeamData);
      console.log(this.initiativeTeamData?.initvTeam);
      if (!this.initiativeTeamData) this.initiativeTeamData = {active:true,capacity_development:'',id:null,gender_diversity_inclusion:'',initvTeam:[],section:'9.human-resources',updateFiles:[]};
      this.initiativeTeamData.updateFiles = [];
      this.dataLoaded = true;
    },
    err=>{console.log(err);}
    ,()=>{
      // this.showForm = true;
    })
  }

  saveSection() {
    console.log("saveSection");

    const formData = new FormData();

    console.log(this.initiativeTeamData);

    formData.append('data', JSON.stringify(this.initiativeTeamData));
    this._initiativesService.saveHumanResources(formData, this._initiativesService.initiative.id, '9.human-resources', 3).subscribe(resp => {
      console.log("saveHumanResources");
      console.log(resp);
      true?
      this._interactionsService.successMessage('Human resources has been saved'):
      this._interactionsService.warningMessage('Human resources and activities has been saved, but there are incomplete fields')
      this.getHumanResources();
    })

  }


  // templatesUrlBase = environment.templatesUrlBase;
  // filesList:any[]=[];
  // filesSavedList = [];
  // showForm = false;
  // data = {
  //   id : null,
  //   active : true,
  //   section : "initiative_team",
  //   updateFiles : []
  // };
  // constructor(
  //   public _initiativesService: InitiativesService,
  //   private _interactionsService:InteractionsService,
  //   public _dataControlService:DataControlService,
  //   public _dataValidatorsService:DataValidatorsService
  // ) { }

  // ngOnInit(): void {
  //   this.getHumanResources();
  // }

  // getHumanResources(){
  //   this._initiativesService.getHumanResources(this._initiativesService.initiative.id,'initiative_team').subscribe(resp=>{
  //     console.log(resp);
  //     this.filesList = [];
  //     let humanResourcesData = resp.response.humanResourcesData;
  //     this.filesSavedList = humanResourcesData?.files?humanResourcesData.files:[];
  //     this.data.id = humanResourcesData?.id;
  //     console.log(humanResourcesData);
  //     console.log(this.filesSavedList);
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
  //   this._initiativesService.saveHumanResources(formData,this._initiativesService.initiative.id,'9.human-resources',3).subscribe(resp=>{
  //     console.log("saveHumanResources");
  //     console.log(resp);
  //     this._dataValidatorsService.validateFilesArray(this.filesList,this.filesSavedList)?
  //     this._interactionsService.successMessage('Human resources has been saved'):
  //     this._interactionsService.warningMessage('Human resources and activities has been saved, but there are incomplete fields')
  //     this.getHumanResources();
  //   })

    
  // }

}
