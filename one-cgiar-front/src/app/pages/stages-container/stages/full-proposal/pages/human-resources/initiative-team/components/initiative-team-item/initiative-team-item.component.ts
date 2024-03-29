import { Component, Input, OnInit } from '@angular/core';
import { InitiativeTeamList } from '../../models/initiativeTeamList.interface';
import { InitiativesService } from '../../../../../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-initiative-team-item',
  templateUrl: './initiative-team-item.component.html',
  styleUrls: ['./initiative-team-item.component.scss']
})
export class InitiativeTeamItemComponent implements OnInit {
  @Input() initiativeTeamItem : InitiativeTeamList;
  @Input() index : number;
  constructor(
    public _initiativesService:InitiativesService
  ) { }

  ngOnInit(): void {
  }

  deleteCurrentInitiativeTeamItem(){
    console.log(this.initiativeTeamItem);
    this.initiativeTeamItem.active = false;
    this.initiativeTeamItem['test'] = false;
  }

}
