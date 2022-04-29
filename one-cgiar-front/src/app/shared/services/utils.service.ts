import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { InitiativesService } from './initiatives.service';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
@Injectable()
export class UtilsService {
  private sidebarOpened = new BehaviorSubject<boolean>(false);
  sidebarOpened$ = this.sidebarOpened.asObservable();

  constructor(
    private router:Router, 
    private _initiativesService:InitiativesService,
    private _authService:AuthService
    
    ){

  }

  openSidebar(value: boolean): void {
    this.sidebarOpened.next(value);
  }

  convertToKebabCase(text:string){
    return text.split(' ').join('-').toLowerCase();
  }

  goToEditToc(toc_id){
    this._initiativesService.authTocToken(this._authService?.lsUserRoles?.id).subscribe(token=>{
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

  validateCurrrentSection(route){    
    if (!this.router.url.includes(route)) return false;
    return true
  }

  navigate(route:string){
    this.router.navigate([route])
  }

}
