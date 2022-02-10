import { Component, OnInit } from '@angular/core';
import { InteractionsService } from '../../../../../../shared/services/interactions.service';
import { InitiativesService } from '../../../../../../shared/services/initiatives.service';
import { DataControlService } from '../../../../../../shared/services/data-control.service';

@Component({
  selector: 'app-pc-innovations',
  templateUrl: './pc-innovations.component.html',
  styleUrls: ['./pc-innovations.component.scss']
})
export class PcInnovationsComponent implements OnInit {
  innovationsList = [
    {
      value:'test'
    }
  ];
  constructor(
    public _initiativesService: InitiativesService,
    public _dataControlService: DataControlService,
    public _interactionsService:InteractionsService
  ) { }

  ngOnInit(): void {
    this.getInformation();
  }

  addInnovation(){
    console.log("addInnovation")
    if (this.innovationsList.length >= 5) return;
    this.innovationsList.push({value:''})
  }

  removeInnovation(innovation){
    this._interactionsService.confirmationModal((decision)=>{
      if (!decision) return;
      let array = [{...innovation}];
      for (const key in array) {
        console.log("hola");
        this.innovationsList.splice(Number(key), 1);
        return;
      }
    });

  }

  getInformation(){

  }

  updateObject(){

  }

  saveSection() {
    console.log("saveSection")
  }







}
