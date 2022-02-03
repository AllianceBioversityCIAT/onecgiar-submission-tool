import { Component, Input, OnInit } from '@angular/core';
import { NavigationStart, Router, Event as NavigationEvent } from '@angular/router';
import { DataControlService } from '../../../services/data-control.service';
import { Subscription } from 'rxjs';

interface SectionList {
  routeName: string
  url: string
  name: string
}
@Component({
  selector: 'app-section-breadcrumb',
  templateUrl: './section-breadcrumb.component.html',
  styleUrls: ['./section-breadcrumb.component.scss']
})
export class SectionBreadcrumbComponent implements OnInit {
  // @Input() 
  sectionsArray: any;
  sectionsList: SectionList[];
  routerEvents: Subscription = new Subscription();
  constructor(
    private router: Router,
    private _dataControlService: DataControlService
  ) { }

  ngOnInit(): void {
    this.sectionsArray = this.router.routerState.snapshot.url.substring(this.router.routerState.snapshot.url.indexOf('stages/')).split('/');
    this.mapList();
    this.routerEvents = this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart && event.url !== '/home') {
        this.sectionsArray = event.url.substring(event.url.indexOf('stages/')).split('/');
        this.mapList();
      }
    })


  }

  ngOnDestroy(): void {
    this.routerEvents.unsubscribe();
  }

  toFirstMayus(text) {
    if (text) {
      let mayus = text.substring(0, 1).toUpperCase();
      let resto = text.substring(1, text.length).toLowerCase();
      mayus.concat(resto.toString());
      return mayus.concat(resto.toString())
    }
  }

  mapList() {
    this.sectionsList = [];

    let stageName = this.sectionsArray[1].split('-');
    stageName = this.toFirstMayus(stageName[0]) + ' ' + this.toFirstMayus(stageName[1]);

    let getSectionName;
    let getSubSectionName;
    let getDynamicItemName;


    this.sectionsList.push({ routeName: this.sectionsArray[1], url: 'null', name: stageName });

    if (this.sectionsArray[2]) {
      getSectionName = this._dataControlService.userMenu[1].sections.find(item => item.description == this.sectionsArray[2]);
      this.sectionsList.push({ routeName: this.sectionsArray[2], url: 'null', name: getSectionName.display_name });
    }

    if (this.sectionsArray[3]) {
      getSubSectionName = getSectionName?.subsections.find(item => item.description == this.sectionsArray[3]);
      this.sectionsList.push({ routeName: this.sectionsArray[2], url: 'null', name: getSubSectionName?.display_name });
    }

    if (this.sectionsArray[4]) {
      this.sectionsList.push({ routeName: this.sectionsArray[2], url: 'null', name: this.sectionsArray[4] });
    }

    if (this.sectionsArray[5]) {
      getDynamicItemName = getSubSectionName?.dynamicList?.find(item => item.id == this.sectionsArray[5]);
      if (getDynamicItemName) this.sectionsList.push({ routeName: this.sectionsArray[2], url: 'null', name: getDynamicItemName.name });
    }

  }

}
