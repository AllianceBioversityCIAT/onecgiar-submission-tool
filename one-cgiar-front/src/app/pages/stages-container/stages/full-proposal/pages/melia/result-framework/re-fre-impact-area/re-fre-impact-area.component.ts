import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-re-fre-impact-area',
  templateUrl: './re-fre-impact-area.component.html',
  styleUrls: ['./re-fre-impact-area.component.scss']
})
export class ReFreImpactAreaComponent implements OnInit {
  routes= [
    {
      route:'table-a',
      title:'Table A',
      complete:true
    },   
    {
      route:'table-b',
      title:'Table B',
      complete:false
    },   
    {
      route:'table-c',
      title:'Table C',
      complete:false
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
