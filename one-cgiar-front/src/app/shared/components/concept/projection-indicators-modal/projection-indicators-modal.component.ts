import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InitiativesService } from '../../../services/initiatives.service';

@Component({
  selector: 'app-projection-indicators-modal',
  templateUrl: './projection-indicators-modal.component.html',
  styleUrls: ['./projection-indicators-modal.component.scss']
})
export class ProjectionIndicatorsModalComponent implements OnInit {
  timeFrames = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _initiativesService:InitiativesService
    ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.getPOBenefitsTimetimeframes();
  }

  getPOBenefitsTimetimeframes(){
    
      this._initiativesService.getPOBenefitsTimetimeframes(17).subscribe(resp=>{
        console.log("time frames -----------");
        console.log('%c^^^^^^^^^^^^^^^^^^^^^^^^^^','background: #222; color: #37ff73');
        console.log(resp.response.timeFrames);
        this.timeFrames = resp.response.timeFrames
      },
      err=>{
        console.log(err);
      })
    
  }

}
