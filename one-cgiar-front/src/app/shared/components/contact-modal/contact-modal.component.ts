import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss']
})
export class ContactModalComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Output() close = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onclose(){
    this.close.emit()
  }

  setModalStatus(){
    this.showModal = !this.showModal;
    console.log(this.showModal)
  }

}
