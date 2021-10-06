import { Component, OnInit, Input } from '@angular/core';
import { DataControlService } from '../../../services/data-control.service';

@Component({
  selector: 'app-section-alerts-pack',
  templateUrl: './section-alerts-pack.component.html',
  styleUrls: ['./section-alerts-pack.component.scss']
})
export class SectionAlertsPackComponent implements OnInit {
  @Input( ) sectionForm;
  constructor(
    public _dataControlService:DataControlService
  ) { }

  ngOnInit(): void {
  }

}
