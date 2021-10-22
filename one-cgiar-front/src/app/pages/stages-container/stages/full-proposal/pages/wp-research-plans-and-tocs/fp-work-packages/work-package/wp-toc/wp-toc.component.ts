import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataControlService } from '@app/shared/services/data-control.service';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { InteractionsService } from '@app/shared/services/interactions.service';
import { environment } from '../../../../../../../../../../environments/environment';
declare var $
@Component({
  selector: 'app-wp-toc',
  templateUrl: './wp-toc.component.html',
  styleUrls: ['./wp-toc.component.scss']
})
export class WpTocComponent implements OnInit {
  wpTocForm: FormGroup;
  toctxtData:string;
  linkIsgenerated=false;
  constructor(
    public _initiativesService: InitiativesService,
    public http: HttpClient
  ) { 
    this.wpTocForm = new FormGroup({
      TocId: new FormControl('SmBQ1GfEjD'),
      imageUrl: new FormControl(null),
    });
  }

  ngOnInit(): void {}


  generateUrl(){
    this.wpTocForm.controls['imageUrl'].setValue(`${environment.tocBaseUrl}${this.wpTocForm.value['TocId']}/${this.wpTocForm.value['TocId']}`);

    console.log("get txt");
    this.getTocTxtDataByTocId(this.wpTocForm.value['TocId'])
    this.linkIsgenerated =  true;
  }

  saveSection(){

  }

  getTocTxtDataByTocId(tocId){
    // return this.http.get(`https://dev-toc.s3.us-east-2.amazonaws.com/toc_SmBQ1GfEjD/SmBQ1GfEjD.txt`,{ responseType: 'text'});
    // return this.http.get(`/assets/test.txt`,{ responseType: 'text'});
    // return this.http.get(`https://www.w3.org/TR/PNG/iso_8859-1.txt`,{ responseType: 'text'});
    this._initiativesService.getTocTxtDataByTocId(tocId).subscribe(resp=>{
      console.log(resp.TocNarrative);
      this.toctxtData = resp.TocNarrative;
    })
  }
  
}
