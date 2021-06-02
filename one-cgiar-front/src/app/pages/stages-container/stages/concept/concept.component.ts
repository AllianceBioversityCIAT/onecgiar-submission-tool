import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../shared/services/initiatives.service';
import { StagesMenuService } from '../../../../shared/services/stages-menu.service';

@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.scss']
})
export class ConceptComponent implements OnInit {
  private user = JSON.parse(localStorage.getItem('user')) || null;
  constructor(
    private _initiativesService:InitiativesService,
    private _StagesMenuService:StagesMenuService
  ) { }

  ngOnInit(): void {
    this.getRolefromInitiativeById();
    this._initiativesService.getGreenCheckStatus(this._initiativesService.initvStgId).subscribe(resp=>{
      this._StagesMenuService.validateAllSectionsStatus('concept',resp.response?.validatedSections,this._initiativesService.initvStgId);
    })
  }

  getRolefromInitiativeById(){
    this._initiativesService.getRolefromInitiativeById(this._initiativesService.initvStgId).subscribe(resp=>{
      if ( resp.response.roles[0]?.roleId) {
        this._initiativesService.initiative.roleId = resp.response.roles[0].roleId;
        const rol = this._initiativesService.initiative.roleId
        this._initiativesService.initiative.readonly = ( rol=== 1||rol=== 2||rol=== 3||rol=== 5||this.user?.roles[0].id === 1)?false:true;
      }else{
        this._initiativesService.initiative.readonly = true;
        this._initiativesService.initiative.readonly =this.user?.roles[0].id === 1?false:true;
      }

    });
  }

}
