import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AttributesListConfiguration } from '../../../../../../../shared/components/compact-information-table-view/CompactInformationTableView.interface';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';
import { MeliaStudiesAndActivities } from './interfaces/melia-studies-and-activities.interface';
import { DataControlService } from '../../../../../../../shared/services/data-control.service';
import { InteractionsService } from '@app/shared/services/interactions.service';


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
  meliaStudyTypes = [];
  constructor(
    public _initiativesService:InitiativesService,
    public _dataControlService:DataControlService,
    private _interactionsService:InteractionsService,
    ){
    this.getmeliaStudActiByInitId();
  }

  ngOnInit(): void {
    this._initiativesService.getMeliaStudyTypes().subscribe(respMeliaStudyTypes => {
      
      this.meliaStudyTypes = respMeliaStudyTypes.response.meliaStudyTypes;
      console.log(this.meliaStudyTypes);
    });
  }

  getTabIndex(e){
    this.showTableViewVariable = e;
  }

  getItemToExpand(item){
    console.log(this.list.find(meliaItem=>meliaItem?.id == item?.id)['collapse'] = false)
  }

  addItem(){
    this.list.push(
      {

        id: null,
        type_melia: '',
        type_melia_id: '',
        result_title: '',
        anticipated_year_completion: '',
        co_delivery: '',
        management_decisions_learning: '',
        active: true,
        countries: [],
        regions: []
      }
    )
    console.log(this.list)
  }

  deleteItem(item,i?){
    if (item?.id){
      console.log("logic remove")
      item.active = false;
    }else{
      console.log("remove from array")
      this.list.splice(i,1);
    }
  }

  getmeliaStudActiByInitId(){
    console.log(this._initiativesService.initiative.id)
    this._initiativesService.getmeliaStudActiByInitId().pipe(map(res=>res?.response?.meliaStudiesActivities)).subscribe((resp:MeliaStudiesAndActivities[])=>{
      console.log(resp)
      this.list = resp;

      //MAP REGIONS
      this._initiativesService.getCLARISARegions('').subscribe(regions=>{
        this.list.map((melia:any) => {
          melia.regions.map(mapReg=>{
            regions.response.regions.forEach(regionItem=>{
              if (regionItem.id == mapReg.region_id) mapReg.name = regionItem.name;
            })
          })
          this._dataControlService.showRegions = true;
        })
      });

      //MAP COUNTRIES
      this._initiativesService.getCLARISACountries().subscribe(countries=>{   
        this.list.map((melia:any) => {    
        melia.countries.map(mapCoun=>{
          countries.response.countries.forEach(countryItem=>{
            if (countryItem.code == mapCoun.country_id) mapCoun.name = countryItem.name;
          })
          
        })
      });

        this._dataControlService.showCountries = true;
      })
      ;
    })
  }

  saveSection(){
    console.log(this.list)
    this._initiativesService.patchmeliaStudActiByInitId(this.list).subscribe(resp=>{
      console.log(resp);
      this._interactionsService.successMessage('MELIA studies and activities has been saved');
      // this._interactionsService.warningMessage('MELIA studies and activities has been saved, but there are incomplete fields');
      this.getmeliaStudActiByInitId();
    })

  }
 

}
