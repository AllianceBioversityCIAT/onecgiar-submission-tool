import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'section-sub-title',
  templateUrl: './section-sub-title.component.html',
  styleUrls: ['./section-sub-title.component.scss']
})
export class SectionSubTitleComponent implements OnInit {
  @Input() name:string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
