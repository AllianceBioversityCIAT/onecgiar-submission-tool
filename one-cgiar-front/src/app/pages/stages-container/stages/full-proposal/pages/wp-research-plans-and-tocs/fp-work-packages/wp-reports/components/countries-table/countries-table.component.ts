import { Component, Input, OnInit } from '@angular/core';
import { Region } from '../../models/regionModel.interface';
import { Country } from '../../models/countryModel.interface';
import { ManageExcelService } from '../../../../../../services/manage-excel.service';

@Component({
  selector: 'app-countries-table',
  templateUrl: './countries-table.component.html',
  styleUrls: ['./countries-table.component.scss']
})
export class CountriesTableComponent implements OnInit {

  @Input() countries:Country[]=[];
  headerPreviewPartners = ['country_id', 'name', 'initvStgId'];


  constructor(
    private _manageExcelService:ManageExcelService
  ) { }

  ngOnInit(): void {
    console.log(this.countries);
  }

  exportBasicExcel(){
    this._manageExcelService.exportBasicExcel(this.countries,'Countries preview',[{wpx:90},{wpx:200},{wpx:90}])
  }

}
