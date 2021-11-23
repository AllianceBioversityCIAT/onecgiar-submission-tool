import { Component, OnInit, Input } from '@angular/core';
import { Region } from '../../models/regionModel.interface';

@Component({
  selector: 'app-regions-table',
  templateUrl: './regions-table.component.html',
  styleUrls: ['./regions-table.component.scss']
})
export class RegionsTableComponent implements OnInit {
  @Input() regions:Region[]=[];
  headerPreviewPartners = ['region_id', 'name', 'initvStgId'];

  constructor() { }

  ngOnInit(): void {
    console.log(this.regions);
  }

}
