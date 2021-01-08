import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RequestsService } from '../../services/requests.service';
@Component({
  selector: 'app-add-coordinator-modal',
  templateUrl: './add-coordinator-modal.component.html',
  styleUrls: ['./add-coordinator-modal.component.scss']
})
export class AddCoordinatorModalComponent implements OnInit {

  constructor( public _requests: RequestsService) { }

  coordinator = '';

  myControl = new FormControl();

  ngOnInit() {
  }
}
