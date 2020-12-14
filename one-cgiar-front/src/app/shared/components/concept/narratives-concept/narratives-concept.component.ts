import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/pages/auth/auth.service';

@Component({
  selector: 'app-narratives-concept',
  templateUrl: './narratives-concept.component.html',
  styleUrls: ['./narratives-concept.component.scss']
})
export class NarrativesConceptComponent implements OnInit {

  constructor(public _auth:AuthService) { }

  ngOnInit(): void {
  }

  onSave(narrativesForm): void {
    console.log("GUARDANDO",narrativesForm.value);
  }

}
