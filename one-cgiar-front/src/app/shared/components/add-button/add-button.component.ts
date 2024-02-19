import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent implements OnInit {
  @Input() name:string = 'unnamed';
  @Input() color:'primary' | 'secondary' = 'secondary';
  constructor() { }

  ngOnInit(): void {
  }

}
