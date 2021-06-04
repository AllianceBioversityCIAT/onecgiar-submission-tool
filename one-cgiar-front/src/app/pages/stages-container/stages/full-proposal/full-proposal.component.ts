import { Component, OnInit } from '@angular/core';
import { DataControlService } from '../../../../shared/services/data-control.service';

@Component({
  selector: 'app-full-proposal',
  templateUrl: './full-proposal.component.html',
  styleUrls: ['./full-proposal.component.scss']
})
export class FullProposalComponent implements OnInit {

  constructor(
    private _dataControlService:DataControlService
  ) { }

  ngOnInit(): void {
    this._dataControlService.loadMenu$.emit('full-proposal');
  }

}
