import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-add-element',
  templateUrl: './button-add-element.component.html',
  styleUrls: ['./button-add-element.component.scss']
})
export class ButtonAddElementComponent implements OnInit {
  @Input() title:string;

  
  constructor() { }

  ngOnInit(): void {
  }

}
