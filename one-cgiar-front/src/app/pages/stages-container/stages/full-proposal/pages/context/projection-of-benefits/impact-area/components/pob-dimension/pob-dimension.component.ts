import { Component, Input, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-pob-dimension',
  templateUrl: './pob-dimension.component.html',
  styleUrls: ['./pob-dimension.component.scss']
})
export class PobDimensionComponent implements OnInit {
  @Input() dimensionsList;
  @Input() depthDescriptionsList;
  @Input() indicatorsList;
  @Input() indicatorsListPOBSavediItem;
  constructor(
    public _initiativesService: InitiativesService
  ) { }

  ngOnInit(): void {
    console.log(this.dimensionsList);
    console.log(this.depthDescriptionsList);
  }

  addDimension(){
    let item = new Object();
    item['name'] = "";
    item['id'] = null;
    this.dimensionsList.push(item);
  }

  getIndicatorMetaData(indicatorId){
    return this.indicatorsList.find(item=>item.impactAreaIndicator == indicatorId);
  }

  removeDimension(index,object,itemLink:HTMLElement){
    itemLink.classList.remove('animate__animated', 'animate__fadeInRight', 'animate__faster');
    itemLink.classList.add('animate__animated', 'animate__bounceOutLeft');
    itemLink.addEventListener('animationend', () => {
      itemLink.style.maxHeight = '0px';
      if (object.descriptionID) {
        object.edited = true;
        object.active = false;
        setTimeout(() => {
          itemLink.style.display = 'none';
        }, 300);
      }else{
        setTimeout(() => {
          this.dimensionsList.splice(index,1);
        }, 300);
     
      }

    });
  }

}
