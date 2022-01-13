import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';
import { environment } from '../../../../../../../../environments/environment.prod';

@Component({
  selector: 'app-full-initiative-toc',
  templateUrl: './full-initiative-toc.component.html',
  styleUrls: ['./full-initiative-toc.component.scss']
})
export class FullInitiativeTocComponent implements OnInit {
  wpTocForm: FormGroup;
  toctxtData:string;
  linkIsgenerated=false;
  imageIsLoaded=false;
  txtIsLoaded=false;
  constructor(
    public _initiativesService: InitiativesService,
    public http: HttpClient
  ) { 
    this.wpTocForm = new FormGroup({
      TocId: new FormControl(null),
      imageUrl: new FormControl(null),
    });
  }

  ngOnInit(): void {}


  generateUrl(){
    this.wpTocForm.controls['imageUrl'].setValue(`${environment.tocBaseUrl}${this.wpTocForm.value['TocId']}/${this.wpTocForm.value['TocId']}`);
    console.log(`${environment.tocBaseUrl}${this.wpTocForm.value['TocId']}/${this.wpTocForm.value['TocId']}`);
    console.log("get txt");
    this.getTocTxtDataByTocId(this.wpTocForm.value['TocId'])
    
  }

  saveSection(){

  }

  imageLoaded(){
    console.log("loaded");
    this.imageIsLoaded=true;
  }

  imageError(){
    console.log("errorrer");
    this.imageIsLoaded=false;
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
