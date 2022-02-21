import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ma-user-card-list',
  templateUrl: './ma-user-card-list.component.html',
  styleUrls: ['./ma-user-card-list.component.scss']
})
export class MaUserCardListComponent implements OnInit {
  @Input() users;
  @Input() roles
  @Output() onSelectOptionEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  onSelectOptionInItem(){
    this.onSelectOptionEvent.emit();
  }

}
