import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AttributesListConfiguration } from '../../../../../../../shared/components/compact-information-table-view/CompactInformationTableView.interface';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';
import { MeliaStudiesAndActivities } from './interfaces/melia-studies-and-activities.interface';
import { DataControlService } from '../../../../../../../shared/services/data-control.service';
import { InteractionsService } from '@app/shared/services/interactions.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-melia-studies-and-activities',
  templateUrl: './melia-studies-and-activities.component.html',
  styleUrls: ['./melia-studies-and-activities.component.scss']
})
export class MeliaStudiesAndActivitiesComponent implements OnInit {
  list: MeliaStudiesAndActivities[] = [];

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
    {
      attribute: 'geographic_scope',
      name: "Geographic Scope"
    },
  ]
  showTableViewVariable = true;
  meliaStudyTypes = [];
  geographicScopes: FormGroup[] = [];

  constructor(
    public _initiativesService: InitiativesService,
    public _dataControlService: DataControlService,
    private _interactionsService: InteractionsService,
  ) {
    this.getmeliaStudActiByInitId();
  }

  ngOnInit(): void {
    this._initiativesService.getMeliaStudyTypes().subscribe(respMeliaStudyTypes => {

      this.meliaStudyTypes = respMeliaStudyTypes.response.meliaStudyTypes;
      console.log(this.meliaStudyTypes);
    });
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
        regions: []
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

  getmeliaStudActiByInitId() {
    console.log(this._initiativesService.initiative.id)
    this._initiativesService.getmeliaStudActiByInitId().pipe(map(res => res?.response?.meliaStudiesActivities)).subscribe((resp: MeliaStudiesAndActivities[]) => {
      console.log(resp)
      this.list = resp;

      this.list.forEach(melia => {
        this.geographicScopes.push(new FormGroup({
          is_global: new FormControl(melia.is_global),
        })
        );
      });

      console.log(this.geographicScopes);


      //MAP REGIONS
      this._initiativesService.getCLARISARegions('').subscribe(regions => {
        this.list.map((melia: any) => {
          melia.regions.map(mapReg => {
            regions.response.regions.forEach(regionItem => {
              if (regionItem.id == mapReg.region_id) mapReg.name = regionItem.name;
            })
          })
          // this._dataControlService.showRegions = true;
        })
      });

      //MAP COUNTRIES
      this._initiativesService.getCLARISACountries().subscribe(countries => {
        this.list.map((melia: any) => {
          melia.countries.map(mapCoun => {
            countries.response.countries.forEach(countryItem => {
              if (countryItem.code == mapCoun.country_id) mapCoun.name = countryItem.name;
            })

          })
        });

        this.formatGeographicScope(this.list);
        // this._dataControlService.showCountries = true;
      })
        ;
    })
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
    }
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
      melia['geographic_scope'] = `
      <p><strong>Global scope: </strong>${melia.is_global ? 'Yes' : 'No'}</p>
      ${melia.regions.length ? `<p><strong>Regions: </strong>${melia.regions.map((coun: any) => coun.name).join(', ')}</p>` : ''}
      ${melia.countries.length ? `<p><strong>Countries: </strong>${melia.countries.map((coun: any) => coun.name).join(', ')}</p>` : ''}
      `
    }
  }

}
