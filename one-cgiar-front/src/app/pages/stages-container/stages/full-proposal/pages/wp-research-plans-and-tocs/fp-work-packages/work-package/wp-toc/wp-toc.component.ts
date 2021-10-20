import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataControlService } from '@app/shared/services/data-control.service';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { InteractionsService } from '@app/shared/services/interactions.service';

@Component({
  selector: 'app-wp-toc',
  templateUrl: './wp-toc.component.html',
  styleUrls: ['./wp-toc.component.scss']
})
export class WpTocComponent implements OnInit {

  constructor(
    public _initiativesService: InitiativesService,
    private activatedRoute: ActivatedRoute,
    private _dataControlService:DataControlService,
    private _interactionsService: InteractionsService
  ) { }

  ngOnInit(): void {
  }

}
