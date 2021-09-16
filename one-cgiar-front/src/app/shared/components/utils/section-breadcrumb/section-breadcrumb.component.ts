import { Component, Input, OnInit } from '@angular/core';
import { NavigationStart, Router,Event as NavigationEvent } from '@angular/router';

interface SectionList {
  routeName:string
  url:string
}
@Component({
  selector: 'app-section-breadcrumb',
  templateUrl: './section-breadcrumb.component.html',
  styleUrls: ['./section-breadcrumb.component.scss']
})
export class SectionBreadcrumbComponent implements OnInit {
  // @Input() 
  sectionsArray:any;
  sectionsList:SectionList[];
  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
    this.sectionsArray =  this.router.routerState.snapshot.url.substring(this.router.routerState.snapshot.url.indexOf('stages/')).split('/');
    this.mapList();
    this.router.events.subscribe((event: NavigationEvent)=>{
      if(event instanceof NavigationStart) {
        this.sectionsArray = event.url.substring(event.url.indexOf('stages/')).split('/');
        this.mapList();
      }
    })
    // this.sectionsList = this.sectionsList ? this.sectionsList : [{routeName:'test1 ',url:'null'},{routeName:'test2 ',url:'null'},{routeName:'test3 ',url:'null'}]

    
    // this.router.events.subscribe(resp=>{
    //   let baseUrl = this.router.routerState.snapshot.url.substring(this.router.routerState.snapshot.url.indexOf('stages/'));
    //   console.log(baseUrl);
    //   console.log(baseUrl.split('/'));
    //   baseUrl.split('/').map((resp,index)=>{
    //     if (index>0) {
    //       this.sectionsList.push({routeName:resp,url:'null'}); 
    //     }
        
    //   })
    //   console.log(this.sectionsList);
    // })
    
    // let stageParam = stage.toLowerCase().split(' ').join('-');  
  
    // console.log(stageParam);
  }

  mapList(){
    this.sectionsList = [];
    this.sectionsArray.map((resp,index)=>{
      if (index>0) {
        this.sectionsList.push({routeName:resp,url:'null'});
      }
    
    })
  }

}
