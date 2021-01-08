import { Component, OnInit } from '@angular/core';
import { RequestsService } from '@app/shared/services/requests.service';

@Component({
  selector: 'app-theory-of-change',
  templateUrl: './theory-of-change.component.html',
  styleUrls: ['./theory-of-change.component.scss']
})
export class TheoryOfChangeComponent implements OnInit {

  constructor(public _requests: RequestsService) { }

  ngOnInit(): void {
  }

  onSave(theoryOfChangeForm): void {
    console.log("GUARDANDO",theoryOfChangeForm.value);
  }

}
