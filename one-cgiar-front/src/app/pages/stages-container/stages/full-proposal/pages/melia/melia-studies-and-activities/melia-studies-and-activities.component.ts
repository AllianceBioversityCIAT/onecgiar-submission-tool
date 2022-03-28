import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AttributesListConfiguration } from '../../../../../../../shared/components/compact-information-table-view/CompactInformationTableView.interface';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';
import { MeliaStudiesAndActivities } from './interfaces/melia-studies-and-activities.interface';
import { DataControlService } from '../../../../../../../shared/services/data-control.service';


@Component({
  selector: 'app-melia-studies-and-activities',
  templateUrl: './melia-studies-and-activities.component.html',
  styleUrls: ['./melia-studies-and-activities.component.scss']
})
export class MeliaStudiesAndActivitiesComponent implements OnInit {
  list:MeliaStudiesAndActivities[] = [];

  attr_list_config: AttributesListConfiguration[] = [
    {
      attribute: 'type_melia',
      name: "Type of MELIA study or activity",
    },
    {
      attribute: 'result_title',
      name: "Result or indicator title that the MELIA study or activity will contribute to.",
    },
    {
      attribute: 'anticipated_year_completion',
      name: "Anticipated year of completion (based on 2022-24 Initiative timeline)",
    },
    {
      attribute: 'co_delivery',
      name: "Co-delivery of planned MELIA study with other Initiatives",
    },
    {
      attribute: 'management_decisions_learning',
      name: "How the MELIA study or activity will inform management decisions and contribute to internal learning"
    },
  ]

  showTableViewVariable = true;

  constructor(
    public _initiativesService:InitiativesService,
    public _dataControlService:DataControlService
    ){
    this.getmeliaStudActiByInitId();
  }

  ngOnInit(): void {
  }

  getdasd(e){
    console.log("event")
    console.log(e)
    this.showTableViewVariable = e;
  }

  getItemToExpand(item){
    console.log(this.list.find(meliaItem=>meliaItem?.id == item?.id)['collapse'] = false)
  }

  getmeliaStudActiByInitId(){
    console.log(this._initiativesService.initiative.id)
    this._initiativesService.getmeliaStudActiByInitId(this._initiativesService.initiative.id).pipe(map(res=>res?.response?.meliaStudiesActivities)).subscribe((resp:MeliaStudiesAndActivities[])=>{
      console.log(resp)
      this.list = resp;
    })
  }

  saveSection(){
    console.log(this.list)
    this._initiativesService.patchmeliaStudActiByInitId(this._initiativesService.initiative.id,this.list).subscribe(resp=>{
      console.log(resp)
      this.getmeliaStudActiByInitId();
    })

  }
 

}
