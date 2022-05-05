import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { InitiativesService } from './initiatives.service';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
@Injectable()
export class UtilsService {
  private sidebarOpened = new BehaviorSubject<boolean>(false);
  sidebarOpened$ = this.sidebarOpened.asObservable();

  constructor(
    private router:Router, 
    private _initiativesService:InitiativesService,
    private _authService:AuthService
  ){}

  openSidebar(value: boolean): void {
    this.sidebarOpened.next(value);
  }

  convertToKebabCase(text:string){
    return text.split(' ').join('-').toLowerCase();
  }

  goToEditToc(){

    this._initiativesService.getProposalTocByInitiativeId().pipe(map(res=> res?.response?.fullInitiativeToc?.toc_id)).subscribe((toc_id) => {
      console.log(toc_id)
      console.log(this._authService?.userValue?.id)
      this._initiativesService.authTocToken(this._authService?.userValue?.id).subscribe(token=>{
        // window.open(`${environment.tocUrl}?token=${token}&toc_id=${toc_id}`,"_blank");
        var w = window.innerWidth - window.innerWidth/3;
        var h = window.innerHeight - window.innerHeight/3;
        window.open(`${environment.tocUrl}?token=${token}&toc_id=${toc_id}`,'winname',`directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=${w},height=${h}`);
      },err=>{
        console.log(err)
      })


    })


  }

  get stageBaseRoute(){
    return this.router.url.substring(0,this.router.url.lastIndexOf('stages')+7)
  }

  validateCurrrentSection(route){    
    if (!this.router.url.includes(route)) return false;
    return true
  }

  navigate(route:string){
    this.router.navigate([route])
  }

}
