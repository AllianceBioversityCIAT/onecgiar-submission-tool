import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';
import { environment } from '../../../../../../../../environments/environment';
import { map } from 'rxjs/operators';
import Viewer from 'viewerjs';

@Component({
  selector: 'app-full-initiative-toc',
  templateUrl: './full-initiative-toc.component.html',
  styleUrls: ['./full-initiative-toc.component.scss']
})
export class FullInitiativeTocComponent implements OnInit {
  toctxtData:string;
  linkIsgenerated=false;
  imageIsLoaded=false;
  txtIsLoaded=false;
  tocitem = null;
  serviceIsConsumed = false;
  constructor(
    public _initiativesService: InitiativesService,
    public http: HttpClient
  ) { 
  }

  ngOnInit(): void {
    this.getProposalTocByInitiativeId();
  }

  getProposalTocByInitiativeId(){
    this.serviceIsConsumed = false;
    console.log(this._initiativesService.initiative.id)
    this._initiativesService.getProposalTocByInitiativeId(this._initiativesService.initiative.id).pipe(map(res=> res.response.fullInitiativeToc)).subscribe((resp) => {
      console.log(resp)
      this.tocitem = resp;
      this.serviceIsConsumed = true;
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
    document.getElementById('loading').style.display = 'none'
    new Viewer(document.getElementById('image'), {
      toolbar: {
        zoomIn: 4,
        zoomOut: 4,
        reset: 4,
      },
      navbar: 0
    });
    this.imageIsLoaded=true;
  }

  imageError(){
    console.log("errorrer");
    document.getElementById('loading').style.display = 'none';
    this.imageIsLoaded=false;
  }

  checkExpandClass(htmlId){
    let elementById = document.getElementById(htmlId);
    if (!elementById) return false;
    
    // console.log(dsdsd)
    return elementById.classList.contains('expandImage') ? false : true;
  }

  

}
