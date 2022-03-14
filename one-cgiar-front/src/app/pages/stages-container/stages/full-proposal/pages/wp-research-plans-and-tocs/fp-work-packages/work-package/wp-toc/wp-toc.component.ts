import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../../../../../../environments/environment';
import { InitiativesService } from '../../../../../../../../../shared/services/initiatives.service';
import { WpDataControlService } from '../../services/wp-data-control.service';
declare var $
@Component({
  selector: 'app-wp-toc',
  templateUrl: './wp-toc.component.html',
  styleUrls: ['./wp-toc.component.scss']
})
export class WpTocComponent implements OnInit {
  toctxtData:string;
  linkIsgenerated=false;
  imageIsLoaded=false;
  txtIsLoaded=false;
  tocList = [];
  serviceIsConsumed = false;
  constructor(
    public _initiativesService: InitiativesService,
    private _wpDataControlService:WpDataControlService,
    public http: HttpClient
  ) { 
  }

  ngOnInit(): void {
    this.getWpById();
  }

  getWpById(){
    this.serviceIsConsumed = false;
    this._initiativesService.getWpById(this._wpDataControlService.wpId, 'proposal').pipe(map(res=> res.response.workpackage.toc)).subscribe((resp) => {
      
      this.tocList = resp;
      this.serviceIsConsumed = true;
      console.log( this.tocList)
    })
  }

  expandImage(htmlId){
    document.getElementById(htmlId).classList.toggle('expandImage')
  }

  saveSection(){

  }

  imageLoaded(htmlId){
    console.log("loaded");
    document.getElementById(htmlId).style.display = 'flex';
    this.imageIsLoaded=true;
  }

  imageError(){
    console.log("errorrer");
    this.imageIsLoaded=false;
  }

  checkExpandClass(htmlId){
    let elementById = document.getElementById(htmlId);
    if (!elementById) return false;
    
    // console.log(dsdsd)
    return elementById.classList.contains('expandImage') ? false : true;
  }

  getTocTxtDataByTocId(tocId){
    this.linkIsgenerated =  false;
    this.toctxtData = null;
    // return this.http.get(`https://dev-toc.s3.us-east-2.amazonaws.com/toc_SmBQ1GfEjD/SmBQ1GfEjD.txt`,{ responseType: 'text'});
    // return this.http.get(`/assets/test.txt`,{ responseType: 'text'});
    // return this.http.get(`https://www.w3.org/TR/PNG/iso_8859-1.txt`,{ responseType: 'text'});
    this._initiativesService.getTocTxtDataByTocId(tocId).subscribe(resp=>{
      this.toctxtData = resp.TocNarrative;
      if (this.toctxtData) {
        this.txtIsLoaded = true;
      }else{
        this.txtIsLoaded = false;
      }
    },err=>{
      console.log("error");
      this.txtIsLoaded = false;
      this.linkIsgenerated =  true;
    },()=>{
      console.log("ended");
      
      this.linkIsgenerated =  true;
    })



  }
  
}
