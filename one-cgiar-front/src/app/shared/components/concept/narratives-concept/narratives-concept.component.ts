import { Component, OnInit } from '@angular/core';
import { RequestsService } from '@app/shared/services/requests.service';

@Component({
  selector: 'app-narratives-concept',
  templateUrl: './narratives-concept.component.html',
  styleUrls: ['./narratives-concept.component.scss']
})
export class NarrativesConceptComponent implements OnInit {

  constructor(public _requests: RequestsService) { }

  ngOnInit(): void {
  }

  onSave(narrativesForm): void {
    console.log("GUARDANDO",narrativesForm.value);
  }

}
