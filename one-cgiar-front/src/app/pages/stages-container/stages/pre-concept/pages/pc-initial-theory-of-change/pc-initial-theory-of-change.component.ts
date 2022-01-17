import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pc-initial-theory-of-change',
  templateUrl: './pc-initial-theory-of-change.component.html',
  styleUrls: ['./pc-initial-theory-of-change.component.scss']
})
export class PcInitialTheoryOfChangeComponent implements OnInit {
  body = {
    theory_of_Change_Statement : '' 
  } 
  constructor() { }

  ngOnInit(): void {
  }

}
