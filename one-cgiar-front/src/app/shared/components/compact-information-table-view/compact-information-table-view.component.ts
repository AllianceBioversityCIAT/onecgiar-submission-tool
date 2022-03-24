import { Component, OnInit, Input } from '@angular/core';
import { AttributesListConfiguration } from './CompactInformationTableView.interface';
import { InitiativesService } from '../../services/initiatives.service';

@Component({
  selector: 'app-compact-information-table-view',
  templateUrl: './compact-information-table-view.component.html',
  styleUrls: ['./compact-information-table-view.component.scss']
})
export class CompactInformationTableViewComponent implements OnInit {
  @Input() list: [] = []; //? list
  @Input() attr_list_config:AttributesListConfiguration[] = []; //? attribute omission list
  constructor() { }

  ngOnInit(): void {
    console.log(this.list)
    console.log(this.attr_list_config)
  }

}

