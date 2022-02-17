import { Component, OnInit } from '@angular/core';
import { PcInitialTheoryOfChangeBody } from './interfaces/pc-initial-theory-of-change.interface';
import { InitiativesService } from '../../../../../../shared/services/initiatives.service';
import { DataControlService } from '../../../../../../shared/services/data-control.service';

@Component({
  selector: 'app-pc-initial-theory-of-change',
  templateUrl: './pc-initial-theory-of-change.component.html',
  styleUrls: ['./pc-initial-theory-of-change.component.scss']
})
export class PcInitialTheoryOfChangeComponent implements OnInit {

  pcInitialTheoryOfChangeBody : PcInitialTheoryOfChangeBody = {
    section : 'pcinitialtoc',
    narrative: '',
    active: true,
    id:null,
  } 

  filesList:any[]=[];
  filesSavedList:any[] = [];
  constructor(
    public _initiativesService: InitiativesService,
    public _dataControlService: DataControlService
  ) { }

  ngOnInit(): void {
    this.getPcInitialToc();
  }

  getPcInitialToc(){
    this._initiativesService.getPcInitialToc(this._initiativesService.initiative.id,this.pcInitialTheoryOfChangeBody.section).subscribe(resp=>{
     
      console.log(resp)
      this.updateObject(resp.response.initialToc)

      // console.log(resp.response.initialToc)
      // console.log(this.pcInitialTheoryOfChangeBody)
    })
  }

  updateObject(initialToc:PcInitialTheoryOfChangeBody){
    this.pcInitialTheoryOfChangeBody.narrative = initialToc?.narrative;
    this.pcInitialTheoryOfChangeBody.id = initialToc?.id || null;
    this.filesSavedList = initialToc?.files || [];
  }

  saveSection() {


    const formData = new FormData();

    formData.append("file",  this.filesList[0]);
    formData.append('data', JSON.stringify(this.pcInitialTheoryOfChangeBody));
    console.log(this.filesList[0]);
    console.log(this.pcInitialTheoryOfChangeBody);
  
    this._initiativesService.patchPcInitialToc(this._initiativesService.initiative.id,this.pcInitialTheoryOfChangeBody.section,2,formData).subscribe(resp => {
      console.log(resp)
    })

  }

}
