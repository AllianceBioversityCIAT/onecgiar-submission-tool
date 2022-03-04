import { Component, Input, OnInit } from '@angular/core';
import { InitiativesService } from '../../services/initiatives.service';

@Component({
  selector: 'app-ia-visual-reference',
  templateUrl: './ia-visual-reference.component.html',
  styleUrls: ['./ia-visual-reference.component.scss']
})
export class IaVisualReferenceComponent implements OnInit {
  @Input() impactAreId:number = 0;
  impacAreasList = [];
  colors = ['#f07e27','#055f6b','#eb5b47','#00a772','#74b959']
  constructor(
    private _initiativesService:InitiativesService
  ) { }

  ngOnInit(): void {
    this.getImpacAreasList();
  }

  getImpactAreDataById(){
    let impactArea = this.impacAreasList?.find(impactArea=>impactArea?.id == this.impactAreId);
    // console.log(impactArea)
    return impactArea?.name;
  }



  getImpacAreasList() {
    this._initiativesService.getImpactAreas().subscribe(impacAreas => {
      console.log(impacAreas.response.impactAreasRequested);
      this.impacAreasList = impacAreas.response.impactAreasRequested;
    }, (err) => {
      console.log(err);

    })
  }

}
