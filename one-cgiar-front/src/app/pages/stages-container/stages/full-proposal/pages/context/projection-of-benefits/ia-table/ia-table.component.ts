import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ia-table',
  templateUrl: './ia-table.component.html',
  styleUrls: ['./ia-table.component.scss']
})
export class IaTableComponent implements OnInit {
  cols: any[];
  impactAreas = [];
  constructor() { }

  ngOnInit(): void {
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'active', header: 'Status' },
    ];
  }

}
