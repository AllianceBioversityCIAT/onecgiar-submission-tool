import { Component, OnInit } from '@angular/core';
import { DataControlService } from '../../../../../../shared/services/data-control.service';
import { InitiativesService } from '../../../../../../shared/services/initiatives.service';
import { InteractionsService } from '../../../../../../shared/services/interactions.service';

@Component({
  selector: 'app-initiative-creator',
  templateUrl: './initiative-creator.component.html',
  styleUrls: ['./initiative-creator.component.scss']
})
export class InitiativeCreatorComponent implements OnInit {
  private user = JSON.parse(localStorage.getItem('user')) || null;
  renderDilog: boolean = false;
  display: boolean = false;
  isAdmin: boolean = false;
  actionAreasList = [];
  createBody: any = {
    name: '',
    acronym: '',
    action_area_description: '',
    action_area_id: '',
    active: true,
    generalInformationId: null,
  }

  constructor(
    private _initiativesService:InitiativesService,
    private _interactionsService:InteractionsService
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.user.roles[0]?.acronym == 'ADM' ? true : false;
    this.getActionAreas();
  }

  showDialog() {
    this.renderDilog = true;
    this.display = true;
  }

  fieldsValidations(){
    console.log(this.createBody.name);
    console.log(this.createBody.acronym);
    console.log(this.createBody.action_area_id);
    console.log(this.createBody.name && this.createBody.acronym &&  this.createBody.action_area_id);
    return !(this.createBody.name && this.createBody.acronym &&  this.createBody.action_area_id);
  }

  getActionAreas(){
    this._initiativesService.getActionAreas().subscribe(resp=>{
      // console.log(resp);
      this.actionAreasList = resp;
    })
  }

  createInitiative() {

      console.log("createInitiative");
      this._initiativesService.createInitiative(this.createBody).subscribe(resp => {
        this._interactionsService.successMessage('The initiative "'+resp?.response.generalInformation.name+'" was successfully created')
        setTimeout(() => {
          location.reload();
        }, 3000);
      })


      this._interactionsService.successMessage('Measurable three-year outcomes has been saved')

      //? CLEAN form
      this.createBody.name = '';
      this.createBody.acronym = '';
      this.createBody.action_area_description = '';
      this.createBody.action_area_id = null;

   

  }

}
