import { Component, OnInit } from '@angular/core';
import { MenuSearchService } from './menu-search.service';

@Component({
  selector: 'app-menu-search',
  templateUrl: './menu-search.component.html',
  styleUrls: ['./menu-search.component.scss']
})
export class MenuSearchComponent implements OnInit {

  textSearch:string = '';

  constructor(
    public _menuSearchService:MenuSearchService
  ) { }

  ngOnInit(): void {
  }

}
