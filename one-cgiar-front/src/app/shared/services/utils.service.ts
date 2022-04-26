import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable()
export class UtilsService {
  private sidebarOpened = new BehaviorSubject<boolean>(false);
  sidebarOpened$ = this.sidebarOpened.asObservable();

  constructor(private router:Router){

  }

  openSidebar(value: boolean): void {
    this.sidebarOpened.next(value);
  }

  convertToKebabCase(text:string){
    return text.split(' ').join('-').toLowerCase();
  }

  get stageBaseRoute(){
    return this.router.url.substring(0,this.router.url.lastIndexOf('stages')+7)
  }

  htmlToString(html:HTMLElement){
    // console.log(html);
    // return html.outerHTML
  }

}
