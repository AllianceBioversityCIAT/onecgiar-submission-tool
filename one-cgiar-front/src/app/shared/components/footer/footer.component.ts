import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  showModal = false;
  constructor() { }

  ngOnInit(): void {
  }

  setModalStatus(){
    this.showModal = !this.showModal;
    console.log("first")
  }

  closeModal(){
    this.showModal = false
  }

}
