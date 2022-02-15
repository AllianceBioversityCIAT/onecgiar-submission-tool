import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-narratives',
  templateUrl: './narratives.component.html',
  styleUrls: ['./narratives.component.scss']
})
export class NarrativesComponent implements OnInit {

  constructor(public _auth:AuthService) { }

  ngOnInit(): void {
  }

  onSave(narrativesForm): void {
    console.log("GUARDANDO",narrativesForm.value);
  }

}
