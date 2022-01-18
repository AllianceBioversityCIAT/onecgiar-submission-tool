import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pc-innovations',
  templateUrl: './pc-innovations.component.html',
  styleUrls: ['./pc-innovations.component.scss']
})
export class PcInnovationsComponent implements OnInit {
  innovationsList = [
    {
      value:'test'
    },
    {
      value:'test'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
