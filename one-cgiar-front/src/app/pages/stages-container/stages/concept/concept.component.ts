import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.scss']
})
export class ConceptComponent implements OnInit {

  constructor(
    private _initiativesService:InitiativesService,
  ) { }

  ngOnInit(): void {
    this.getRolefromInitiativeById();
  }

  getRolefromInitiativeById(){
    this._initiativesService.getRolefromInitiativeById(this._initiativesService.initvStgId).subscribe(resp=>{
      console.log(resp);
      this._initiativesService.initiative.roleId = resp.response.roles[0].roleId;
      console.log(resp.response.roles[0].roleId);
      // accessToWrite
      const rol = this._initiativesService.initiative.roleId
      this._initiativesService.initiative.accessToWrite = ( rol== 1||rol== 2||rol== 3||rol== 5)?true:false;
      console.log(this._initiativesService.initiative.roleId == 5 ?true:false);
    });
  }

}
