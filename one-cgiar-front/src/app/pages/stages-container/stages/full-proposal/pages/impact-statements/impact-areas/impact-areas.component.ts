import { Component, OnInit } from '@angular/core';
import { DataControlService } from '../../../../../../../shared/services/data-control.service';

@Component({
  selector: 'app-impact-areas',
  templateUrl: './impact-areas.component.html',
  styleUrls: ['./impact-areas.component.scss']
})
export class ImpactAreasComponent implements OnInit {

  constructor(
    public _dataControlService:DataControlService
  ) { }

  ngOnInit(): void {
    
  }

}
