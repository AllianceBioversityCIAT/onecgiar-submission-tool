import { Component, OnInit } from '@angular/core';
import { InteractionsService } from '../../../../../../shared/services/interactions.service';

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
    private _interactionsService:InteractionsService
  ) { }

  addInnovation(){
    console.log("addInnovation")
    if (this.innovationsList.length >= 5) return;
    this.innovationsList.push({value:''})
  }

  ngOnInit(): void {
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

}
