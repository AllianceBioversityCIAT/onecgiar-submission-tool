import { Component, Input, OnInit } from '@angular/core';
import { EOIData } from '../../interfaces/EOIData.interface';
import { DataControlService } from '../../../../../../../../../shared/services/data-control.service';

@Component({
  selector: 'app-eoi-card',
  templateUrl: './eoi-card.component.html',
  styleUrls: ['./eoi-card.component.scss']
})
export class EoiCardComponent implements OnInit {
  @Input() eoiData:EOIData;
  constructor(public _dataControlService:DataControlService) { }

  expand = false;

  ngOnInit(): void {
  }



}