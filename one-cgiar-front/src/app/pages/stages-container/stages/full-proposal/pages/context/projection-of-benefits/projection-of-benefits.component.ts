import { Component, OnInit } from '@angular/core';
import { DataControlService } from '../../../../../../../shared/services/data-control.service';

@Component({
  selector: 'app-projection-of-benefits',
  templateUrl: './projection-of-benefits.component.html',
  styleUrls: ['./projection-of-benefits.component.scss']
})
export class ProjectionOfBenefitsComponent implements OnInit {
  cols: any[];
  impactAreas = [];
  constructor(
    public _dataControlService:DataControlService
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'active', header: 'Status' },
    ];
  }

}
