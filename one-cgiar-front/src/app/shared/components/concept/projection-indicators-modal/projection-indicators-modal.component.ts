import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestsService } from '@app/shared/services/requests.service';

@Component({
  selector: 'app-projection-indicators-modal',
  templateUrl: './projection-indicators-modal.component.html',
  styleUrls: ['./projection-indicators-modal.component.scss']
})
export class ProjectionIndicatorsModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _requests: RequestsService
    ) { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
