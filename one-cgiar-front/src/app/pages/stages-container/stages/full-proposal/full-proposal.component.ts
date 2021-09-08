import { Component, OnInit } from '@angular/core';
import { DataControlService } from '../../../../shared/services/data-control.service';
import { InitiativesService } from '../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-full-proposal',
  templateUrl: './full-proposal.component.html',
  styleUrls: ['./full-proposal.component.scss']
})
export class FullProposalComponent implements OnInit {
  private user = JSON.parse(localStorage.getItem('user')) || null;
  constructor(
    private _dataControlService:DataControlService,
    private _initiativesService:InitiativesService
  ) { }

  ngOnInit(): void {
    this.validateAllSections();
    this._dataControlService.loadMenu$.emit('full-proposal');
    this.getRolefromInitiativeById();
  }

  validateAllSections(){
    this._initiativesService.getSectionsValidation(this._initiativesService.initiative.id,3).subscribe(resp=>{

      resp.response.validationGI.map(item=>{
        console.log(item);
        this.validateSection(3,2,item.ValidateGI);
      })

    })
  }

  validateSection(stageId,sectionId,ValidateGI){
    console.log("menu");
    console.log(this._dataControlService.userMenu);
    let result = this._dataControlService.userMenu.find(item=>item.stageId == stageId)
                  .sections.find(item=>item.sectionId == sectionId)
    console.log(result);
    result.fieldsCompleted = ValidateGI;
    console.log(this._dataControlService.userMenu);
  }

  getRolefromInitiativeById(){
    this._initiativesService.getRolefromInitiativeById(this._initiativesService.initvStgId).subscribe(resp=>{
      if ( resp.response.roles[0]?.roleId) {
        this._initiativesService.initiative.roleId = resp.response.roles[0].roleId;
        const rol = this._initiativesService.initiative.roleId
        // this._initiativesService.initiative.readonly = ( rol=== 1||rol=== 2||rol=== 3||rol=== 5||this.user?.roles[0].id === 1)?false:true;
        this._initiativesService.initiative.readonly = false;
      }else{
        this._initiativesService.initiative.readonly = false;
        // this._initiativesService.initiative.readonly =this.user?.roles[0].id === 1?false:true;
      }

    });
  }

}
