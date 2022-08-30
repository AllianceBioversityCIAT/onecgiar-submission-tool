import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AttributesListConfiguration } from '../../../../../../../shared/components/compact-information-table-view/CompactInformationTableView.interface';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';
import { MeliaStudiesAndActivities } from './interfaces/melia-studies-and-activities.interface';
import { DataControlService } from '../../../../../../../shared/services/data-control.service';
import { InteractionsService } from '@app/shared/services/interactions.service';
import { FormControl, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-melia-studies-and-activities',
  templateUrl: './melia-studies-and-activities.component.html',
  styleUrls: ['./melia-studies-and-activities.component.scss']
})
export class MeliaStudiesAndActivitiesComponent implements OnInit {
  list: MeliaStudiesAndActivities[] = [];
  attr_list_config: AttributesListConfiguration[] = [
    {
      attribute: 'id',
      name: "ID",
    },
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
    {
      attribute: 'geographic_scope',
      name: "Geographic Scope"
    },
    {
      attribute: 'resultsHtml',
      name: "TOC EIO Outcomes, WP Outcomes, WP Outputs this MELIA study/activity contribute to"
    },
  ]
  showTableViewVariable = true;
  meliaStudyTypes = [];
  geographicScopes: FormGroup[] = [];
  years: [];
  htmlTextMeliaAlert = `If there is no item in the list  in the (TOC EIO Outcomes, WP Outcomes, WP Outputs this MELIA study/activity contribute to) field, it is probably because information is missing in the TOC, please go to (table c) section and add information.`;
  constructor(
    public _initiativesService: InitiativesService,
    public _dataControlService: DataControlService,
    private _interactionsService: InteractionsService,
  ) {
    this.getmeliaStudActiByInitId();

  }

  ngOnInit(): void {
    this._initiativesService.setTitle('Melia studies and activities');
    this._initiativesService.getMeliaStudyTypes().subscribe(respMeliaStudyTypes => {

      this.meliaStudyTypes = respMeliaStudyTypes.response.meliaStudyTypes;
      console.log(this.meliaStudyTypes);
    });
    this._initiativesService.getYears().subscribe( res => {
      this.years = res.response.years;
      // console.log('Years', this.years);
    })
  }

  getTabIndex(e) {
    this.showTableViewVariable = e;
  }

  getItemToExpand(item) {
    console.log(this.list.find(meliaItem => meliaItem?.id == item?.id)['collapse'] = false)
  }

  addItem() {
    this.list.push(
      {
        id: null,
        type_melia: null,
        type_melia_id: null,
        other_melia: null,
        result_title: null,
        anticipated_year_completion: null,
        co_delivery: null,
        management_decisions_learning: null,
        active: true,
        is_global: null,
        countries: [],
        regions: [],
        initiatives: [],
        selectResults: []
      }
    )
    this.geographicScopes.push(new FormGroup({ is_global: new FormControl(this.list[this.list.length - 1].is_global) }));

    this.list.map((el: any) => { el.collapse = true })
    this.list[this.list.length - 1]['collapse'] = false;

    // Go to editable view
    this.showTableViewVariable = false;
    console.log(this.list);
  }

  deleteItem(item, i?) {
    if (item?.id) {
      console.log("logic remove")
      item.active = false;
    } else {
      console.log("remove from array")
      this.list.splice(i, 1);
    }
  }

  checkActives(list){
    return list.some(item=>item.active == true)
   }

   resultToHtml(){
    this.list.map((listItem:any)=>{
      let resultsHtml = "";
      listItem.selectResults.map(resultItem=>{
        resultsHtml+='<p>'+resultItem?.fullResultTitle+'</p>';
      })

      listItem.resultsHtml = resultsHtml;
     
    })
   }

  getmeliaStudActiByInitId() {
    this._initiativesService.getmeliaStudActiByInitId().subscribe((resp: any) => {
      const resultsByMeliaList:ResultsByMelia[] = resp?.response?.resultsByMelia;
      resultsByMeliaList.map(resultItem=>{
        resultItem.id = null;
      })
      this.list = resp?.response?.meliaStudiesActivities;
      this.list.forEach(melia => {
        melia.resultsByMeliaList = JSON.parse(JSON.stringify(resultsByMeliaList))
        this.geographicScopes.push(new FormGroup({
          is_global: new FormControl(melia.is_global),
        })
        );
      });

      this.resultToHtml()

      forkJoin({
        initiatives: this._initiativesService.getInitiativesList(),
        regions: this._initiativesService.getCLARISARegions(''),
        countries: this._initiativesService.getCLARISACountries()
      }).subscribe(({initiatives, regions, countries}) => {


        //Map Initiatives
        this.list.map((melia: any) => {
          melia.initiatives.map(mapInit => {
            initiatives.response.initiatives.forEach(initItem => {
              if (initItem.initiativeId == mapInit.initiativeId) {
                mapInit.name = initItem.name;
                mapInit.displayName = initItem.displayName
              } 
            })
          })
          // this._dataControlService.showinitiatives = true;
        });


        //Map Regions
        this.list.map((melia: any) => {
          melia.regions.map(mapReg => {
            regions.response.regions.forEach(regionItem => {
              if (regionItem.region_id == mapReg.region_id) mapReg.name = regionItem.name;
            })
          })
          // this._dataControlService.showRegions = true;
        });


        //Map Countries
        this.list.map((melia: any) => {
          melia.countries.map(mapCoun => {
            countries.response.countries.forEach(countryItem => {
              if (countryItem.code == mapCoun.country_id) mapCoun.name = countryItem.name;
            })

          })
        });
        

        this.formatGeographicScope(this.list);

      });



    });
  }

  saveSection() {
    console.log(this.list)

    //Update is global from formControl to body
    for (let i = 0; i < this.list.length; i++) {
      const element = this.list[i];
      element.is_global = this.geographicScopes[i].controls['is_global'].value;
    }

    //Add meliaStudyId to countries and regions
    for (const melia of this.list) {
      melia.regions.map((reg: any) => reg.meliaStudyId = Number(melia.id));
      melia.countries.map((coun: any) => coun.meliaStudyId = Number(melia.id));
      melia.initiatives.map((init: any) => init.meliaStudyId = Number(melia.id));
    }
    console.log(this.list)
    this._initiativesService.patchmeliaStudActiByInitId(this.list).subscribe(resp => {
      console.log(resp);
      this._interactionsService.successMessage('MELIA studies and activities has been saved');
      // this._interactionsService.warningMessage('MELIA studies and activities has been saved, but there are incomplete fields');
      this.getmeliaStudActiByInitId();
      this.showTableViewVariable = true;
    })

  }

  formatGeographicScope(arrayMelias: MeliaStudiesAndActivities[]) {
    for (const melia of arrayMelias) {
      melia['geographic_scope'] = melia.is_global == undefined ? 
      null :
      `<p><strong>Global scope: </strong>${melia.is_global == true ? 'Yes' : 'No'}</p>
      ${melia.regions.length ? `<p><strong>Regions: </strong>${melia.regions.map((coun: any) => coun.name).join(', ')}</p>` : ''}
      ${melia.countries.length ? `<p><strong>Countries: </strong>${melia.countries.map((coun: any) => coun.name).join(', ')}</p>` : ''}
      `
    }
  }

}

interface ResultsByMelia {
  id: number;
  resultTitle: string;
  typeId: number;
  typeName: string;
  wpAcronym?: string;
  wpName?: string;
  wpId?: number;
  resultsHtml?:string
}