import { Component, Input, OnInit } from '@angular/core';
import { NavigationStart, Router, Event as NavigationEvent, ActivationEnd, ActivatedRoute } from '@angular/router';
import { DataControlService } from '../../../services/data-control.service';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { InitiativesService } from '../../../services/initiatives.service';

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
  sectionsData:sectionData[]= [];
  currentStage='';
  sectionsArray: any;
  sectionsList: SectionList[];
  routerEvents: Subscription;
  constructor(
    private router: Router,
    private _dataControlService:DataControlService
    // private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.mapToSectionData( this.router.routerState.snapshot.url);
    this.getRouteDataSubscription();
  }

  mapToSectionData(url:string){
    let urlBase = '';
    this.sectionsData = [];
    url.split('/').map((resp,i)=>{
      if (i>=1) {
        urlBase +='/'+resp;
      }
      if (i>=4) {
        this.sectionsData.push(
          {
            url:urlBase,
            name:resp
          }
        )
      }
    })
  }

  getRouteDataSubscription(){
    this.routerEvents = this.router.events.pipe(
      filter<any>(event => event instanceof ActivationEnd),
      filter((event:ActivationEnd)=> event.snapshot.firstChild === null),
      map((event:ActivationEnd)=>event.snapshot['_routerState']['url'])

    ).subscribe((data)=>{
      this.mapToSectionData(data)
      // this.titulo = titulo;
    })
  }

  ngOnDestroy(): void {
    this.routerEvents.unsubscribe();
  }

  // navigate(path:string){
  //   // console.log(path)
  //   // if (!path)return;
  //   // this.router.navigate([this.urlBase+path]);
  // }

}


interface sectionData{
  url:string,
  name:string
}