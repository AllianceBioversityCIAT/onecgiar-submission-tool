import { Component, OnInit } from '@angular/core';
import { DataControlService } from '../../../../../../shared/services/data-control.service';

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



  constructor(
    private _dataControlService:DataControlService
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.user.roles[0]?.acronym == 'ADM' ? true : false;
  }

  showDialog() {
    this.renderDilog = true;
    this.display = true;
  }

  createInitiative(){
    this._dataControlService.createInitiative$.emit(true);
  }

}
