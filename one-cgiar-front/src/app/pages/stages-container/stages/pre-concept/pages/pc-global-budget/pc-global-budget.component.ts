import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../shared/services/initiatives.service';
import { DataControlService } from '../../../../../../shared/services/data-control.service';

@Component({
  selector: 'app-pc-global-budget',
  templateUrl: './pc-global-budget.component.html',
  styleUrls: ['./pc-global-budget.component.scss']
})
export class PcGlobalBudgetComponent implements OnInit {

  constructor(
    public _initiativesService: InitiativesService,
    public _dataControlService: DataControlService
  ) { }

  ngOnInit(): void {
    this.getInformation();
  }

  getInformation(){

  }

  updateObject(){

  }

  saveSection() {
    console.log("saveSection")
  }

}
