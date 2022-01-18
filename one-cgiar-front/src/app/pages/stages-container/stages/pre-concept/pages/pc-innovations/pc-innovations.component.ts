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
    }
  ];
  constructor() { }

  addInnovation(){
    console.log("addInnovation")
    if (this.innovationsList.length >= 5) return;
    this.innovationsList.push({value:''})
  }

  ngOnInit(): void {
  }

}
