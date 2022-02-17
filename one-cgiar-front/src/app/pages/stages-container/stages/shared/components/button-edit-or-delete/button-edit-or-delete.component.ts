import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InteractionsService } from '../../../../../../shared/services/interactions.service';

@Component({
  selector: 'app-button-edit-or-delete',
  templateUrl: './button-edit-or-delete.component.html',
  styleUrls: ['./button-edit-or-delete.component.scss']
})
export class ButtonEditOrDeleteComponent implements OnInit {
  @Input() type;
  @Input() ngCustomStyle={};
  @Input() confirmDeleteModal = false;
  @Output() action = new EventEmitter;
  constructor(private _interactionsService : InteractionsService) { }

  ngOnInit(): void {
    if (!this.type) this.type = 'edit';
  }

  confirmDelete(){
    this._interactionsService.confirmationModal((decision)=>{
      if (!decision) return;
      this.action.emit()
    });
  }

}
