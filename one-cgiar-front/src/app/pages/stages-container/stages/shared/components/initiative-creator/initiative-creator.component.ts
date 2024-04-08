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
    type: null
  };

  constructor(private _initiativesService: InitiativesService, private _interactionsService: InteractionsService, public _dataControlService: DataControlService) {}

  ngOnInit(): void {
    this.getActionAreas();
  }

  showDialog() {
    this.renderDilog = true;
    this.display = true;
  }

  fieldsValidations() {
    const validateInit = !(this.createBody.name && this.createBody.acronym && this.createBody.action_area_id);
    const validatePlat = !(this.createBody.name && this.createBody.acronym);
    return this.createBody.type == 1 ? validateInit : validatePlat;
  }

  getActionAreas() {
    this._initiativesService.getActionAreas().subscribe(resp => {
      this.actionAreasList = resp;
    });
  }

  createInitiative() {
    !this.createBody.action_area_id && (this.createBody.action_area_id = null);
    this._initiativesService.createInitiative(this.createBody).subscribe(resp => {
      this._interactionsService.successMessage(`The ${this.createBody.type != 3 ? 'initiative' : 'platform'} ${resp?.response.generalInformation.name} was successfully created`);
      setTimeout(() => {
        location.reload();
      }, 3000);
    });

    //? CLEAN form
    this.createBody.name = '';
    this.createBody.acronym = '';
    this.createBody.action_area_description = '';
    this.createBody.action_area_id = null;
  }
}
