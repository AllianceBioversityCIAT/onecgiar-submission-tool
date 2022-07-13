import { Component, OnInit } from '@angular/core';
import { MenuSearchService } from './menu-search.service';
import { DataControlService } from '../../services/data-control.service';
// import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-menu-search',
  templateUrl: './menu-search.component.html',
  styleUrls: ['./menu-search.component.scss']
})
export class MenuSearchComponent implements OnInit {
  sectionsList = [];
  textSearch:string = '';

  constructor(
    public _menuSearchService:MenuSearchService,
    private _dataControlService:DataControlService,
  ) { }

  ngOnInit(): void {
  }

}
