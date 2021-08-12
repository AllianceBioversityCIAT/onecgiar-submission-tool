import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-section-breadcrumb',
  templateUrl: './section-breadcrumb.component.html',
  styleUrls: ['./section-breadcrumb.component.scss']
})
export class SectionBreadcrumbComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
    let baseUrl = this.router.routerState.snapshot.url.substring(this.router.routerState.snapshot.url.indexOf('stages/'));
    // let stageParam = stage.toLowerCase().split(' ').join('-');  
    console.log(baseUrl);
    console.log(baseUrl.split('/'));
    // console.log(stageParam);
  }

}
