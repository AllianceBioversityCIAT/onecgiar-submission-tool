import { Component, Input, OnInit } from '@angular/core';
import { EOIData } from '../../interfaces/EOIData.interface';

@Component({
  selector: 'app-eoi-card',
  templateUrl: './eoi-card.component.html',
  styleUrls: ['./eoi-card.component.scss']
})
export class EoiCardComponent implements OnInit {
  @Input() eoiData:EOIData;
  constructor() { }

  colors = [];
  expand = false;

  ngOnInit(): void {
    this.initColors();
  }

  initColors(){
    this.colors['WP'] = '#ed553b';
    this.colors[1] = '#a21942';
    this.colors[2] = '#27bde2';
    this.colors[3] = '#3caea3';
  }


}