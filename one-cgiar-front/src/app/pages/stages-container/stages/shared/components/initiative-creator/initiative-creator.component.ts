import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../shared/services/initiatives.service';
import { DataControlService } from '../../../../../../shared/services/data-control.service';

@Component({
  selector: 'app-initiative-creator',
  templateUrl: './initiative-creator.component.html',
  styleUrls: ['./initiative-creator.component.scss']
})
export class InitiativeCreatorComponent implements OnInit {
  renderDilog: boolean = false;
  display: boolean = false;


  constructor(
    private _initiativesService:InitiativesService,
    private _dataControlService:DataControlService
  ) { }

  ngOnInit(): void {
  }

  showDialog() {
      this.renderDilog = true;
      this.display = true;
  }

  createInitiative(){
    
    let body = {
      name:'Hola mundo',
      action_area_description:'Action area',
      action_area_id: 1,
      active: true,
      acronym: 'acronym',
      generalInformationId: null
    }

    console.log(body);

    this._initiativesService.patchGeneralInformation(41, this._dataControlService.getStageRouteByStageId(2).ownPath, body).subscribe(resp=>{
      console.log(resp);
    })

  }

}
