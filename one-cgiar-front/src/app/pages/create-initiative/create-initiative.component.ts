import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-create-initiative',
  templateUrl: './create-initiative.component.html',
  styleUrls: ['./create-initiative.component.scss']
})
export class CreateInitiativeComponent implements OnInit {

  constructor(public _auth:AuthService) { }

  ngOnInit(): void {
  }

  onSave(generalInformationForm): void {
    console.log("GUARDANDO",generalInformationForm.value);
  }

}
