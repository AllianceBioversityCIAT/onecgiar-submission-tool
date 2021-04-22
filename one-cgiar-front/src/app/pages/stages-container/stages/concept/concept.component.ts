import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.scss']
})
export class ConceptComponent implements OnInit {
  private user = JSON.parse(localStorage.getItem('user')) || null;
  constructor(
    private _initiativesService:InitiativesService,
  ) { }

  ngOnInit(): void {
    this.getRolefromInitiativeById();
    // console.log('%c'+this.user?.roles[0].id,'background: #222; color: #ffff00');
    // console.log(this.user?.roles[0].id);
  }

  getRolefromInitiativeById(){
    this._initiativesService.getRolefromInitiativeById(this._initiativesService.initvStgId).subscribe(resp=>{
      // console.log('%cGet access','background: #222; color: #ffff00');
      // console.log(resp);
      
      if ( resp.response.roles[0]?.roleId) {
        this._initiativesService.initiative.roleId = resp.response.roles[0].roleId;
        // console.log(resp.response.roles[0].roleId);
        // accessToWrite
        const rol = this._initiativesService.initiative.roleId
        this._initiativesService.initiative.readonly = ( rol=== 1||rol=== 2||rol=== 3||rol=== 5||this.user?.roles[0].id === 1)?false:true;
        // console.log('%cAccess?','background: #222; color: #37ff73');
        // console.log(this._initiativesService.initiative.roleId == 5 ?true:false);
      }else{
        // console.log( resp.response.roles[0]?.roleId);
        this._initiativesService.initiative.readonly = true;
        this._initiativesService.initiative.readonly =this.user?.roles[0].id === 1?false:true;
      }

    });
  }

}
