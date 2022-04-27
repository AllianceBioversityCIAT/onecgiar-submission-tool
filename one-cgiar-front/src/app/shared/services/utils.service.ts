import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { InitiativesService } from './initiatives.service';
import { environment } from '../../../environments/environment';
@Injectable()
export class UtilsService {
  private sidebarOpened = new BehaviorSubject<boolean>(false);
  sidebarOpened$ = this.sidebarOpened.asObservable();

  constructor(private router:Router, private _initiativesService:InitiativesService){

  }

  openSidebar(value: boolean): void {
    this.sidebarOpened.next(value);
  }

  convertToKebabCase(text:string){
    return text.split(' ').join('-').toLowerCase();
  }

  goToEditToc(toc_id){
    this._initiativesService.authTocToken(104).subscribe(token=>{
      console.log(token)
      window.open(`${environment.tocUrl}?token=${token}&toc_id=${toc_id}`,"_blank");
    },err=>{
      console.log(err)
    })
  }

  get stageBaseRoute(){
    return this.router.url.substring(0,this.router.url.lastIndexOf('stages')+7)
  }

  htmlToString(html:HTMLElement){
    // console.log(html);
    // return html.outerHTML
  }

}
