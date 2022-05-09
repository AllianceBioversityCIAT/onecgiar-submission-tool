import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { InitiativesService } from '../../../../../../../../../shared/services/initiatives.service';
import { WpDataControlService } from '../../services/wp-data-control.service';
declare var $
import Viewer from 'viewerjs';
import { UtilsService } from '../../../../../../../../../shared/services/utils.service';

@Component({
  selector: 'app-wp-toc',
  templateUrl: './wp-toc.component.html',
  styleUrls: ['./wp-toc.component.scss']
})
export class WpTocComponent implements OnInit {
  toctxtData:string;
  linkIsgenerated=false;
  // imageIsLoaded=false;
  txtIsLoaded=false;
  tocList = [];
  serviceIsConsumed = false;
  toc_id:number|string;
  constructor(
    public _initiativesService: InitiativesService,
    private _wpDataControlService:WpDataControlService,
    public http: HttpClient,
    public _utilsService:UtilsService
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
    })
  }

  expandImage(htmlId){
    document.getElementById(htmlId).classList.toggle('expandImage')
  }

  imageLoaded(htmlId,i){
    console.log("loaded");
    document.getElementById(htmlId).style.display = 'flex';
    document.getElementById('loading'+i).style.display = 'none'
    new Viewer(document.getElementById('image'+i), {
      toolbar: {
        zoomIn: 4,
        zoomOut: 4,
        reset: 4,
      },
      navbar: 0
    });
  }

  imageError(i){
    console.log("errorrer");
    document.getElementById('loading'+i).style.display = 'none'
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
