import { Component, OnInit, Input } from '@angular/core';
import { DataControlService } from '../../../services/data-control.service';
import { InitiativesService } from '../../../services/initiatives.service';

@Component({
  selector: 'app-section-alerts-pack',
  templateUrl: './section-alerts-pack.component.html',
  styleUrls: ['./section-alerts-pack.component.scss']
})
export class SectionAlertsPackComponent implements OnInit {
  @Input() sectionForm;
  @Input() extraValidation;
  constructor(
    public _dataControlService:DataControlService,
    public _initiativesService:InitiativesService
  ) { }

  ngOnInit(): void {
    if (this.extraValidation == undefined) this.extraValidation = true;
  }

}
