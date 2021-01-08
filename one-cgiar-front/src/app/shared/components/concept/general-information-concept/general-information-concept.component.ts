import { Component, OnInit } from '@angular/core';
import { RequestsService } from '@app/shared/services/requests.service';

@Component({
  selector: 'app-general-information-concept',
  templateUrl: './general-information-concept.component.html',
  styleUrls: ['./general-information-concept.component.scss']
})
export class GeneralInformationConceptComponent implements OnInit {

  constructor(public _requests: RequestsService) { }

  ngOnInit(): void {
  }

  onSave(generalInformationForm): void {
    console.log("GUARDANDO",generalInformationForm.value);
  }

}
