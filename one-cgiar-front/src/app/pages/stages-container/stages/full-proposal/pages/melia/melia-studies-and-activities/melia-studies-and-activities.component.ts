import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '@app/shared/services/initiatives.service';

@Component({
  selector: 'app-melia-studies-and-activities',
  templateUrl: './melia-studies-and-activities.component.html',
  styleUrls: ['./melia-studies-and-activities.component.scss']
})
export class MeliaStudiesAndActivitiesComponent implements OnInit {

  constructor(
    public _initiativesService: InitiativesService
  ) { }

  ngOnInit(): void {
  }

}
