import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-edit-or-delete',
  templateUrl: './button-edit-or-delete.component.html',
  styleUrls: ['./button-edit-or-delete.component.scss']
})
export class ButtonEditOrDeleteComponent implements OnInit {
  @Input() type;
  @Output() action = new EventEmitter;
  constructor() { }

  ngOnInit(): void {
    if (!this.type) this.type = 'edit';
  }

}
