import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent implements OnInit {
  @Input() name:string = 'unnamed';
  constructor() { }

  ngOnInit(): void {
  }

}
