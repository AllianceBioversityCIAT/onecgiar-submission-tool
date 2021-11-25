import { Component, OnInit } from '@angular/core';
import { BudgetModel } from '../models/budget.model';
import { InitiativesService } from '../../../../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-activity-breakdown',
  templateUrl: './activity-breakdown.component.html',
  styleUrls: ['./activity-breakdown.component.scss']
})
export class ActivityBreakdownComponent implements OnInit {

  fixedData:BudgetModel;

  constructor(
    public _initiativesService:InitiativesService
  ) { 
    this.fixedData = new BudgetModel()
    this.fixedData.headerNames = ['USD','Year 1','Year 2','Year 3','Total'];
  }

  ngOnInit(): void {
    this.fixedData.pushItem({name:'Crosscutting across Work Packages',total:50,valuesList:[{value:25},{value:''}]})
    // this.fixedData.pushValuesListItem(0);
    this.fixedData.pushItem({name:'Innovation packages & Scaling Readiness',total:60,valuesList:[{value:40},{value:20}]})
    // this.fixedData.pushValuesListItem(1);

  }

  onSave(){
    // this.fixedData.list[0].value = 'as';

    //console.log(this.fixedData);
  }

}
