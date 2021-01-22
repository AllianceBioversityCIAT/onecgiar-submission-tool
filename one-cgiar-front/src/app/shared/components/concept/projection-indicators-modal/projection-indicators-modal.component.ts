import { Component, OnInit } from '@angular/core';
import { RequestsService } from '@app/shared/services/requests.service';

@Component({
  selector: 'app-projection-indicators-modal',
  templateUrl: './projection-indicators-modal.component.html',
  styleUrls: ['./projection-indicators-modal.component.scss']
})
export class ProjectionIndicatorsModalComponent implements OnInit {

  constructor(public _requests: RequestsService) { }

  ngOnInit(): void {
  }

}
