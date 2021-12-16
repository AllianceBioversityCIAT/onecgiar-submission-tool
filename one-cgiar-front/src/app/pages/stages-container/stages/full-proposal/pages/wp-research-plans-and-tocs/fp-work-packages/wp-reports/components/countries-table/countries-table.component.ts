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
  headerPreviewPartners = ['code', 'isoAlpha2', 'name'];
  headerPreviewTitles= ['code', 'ISO Alpha2','acronym'];

  constructor(
    private _manageExcelService:ManageExcelService
  ) { }

  ngOnInit(): void {
    this.countries.map((item:any)=>delete item.official_code);
    console.log(this.countries)
  }

  exportBasicExcel(){
    this._manageExcelService.exportBasicExcel(this.countries,'Countries preview',[{wpx:90},{wpx:200},{wpx:90}])
  }

  //! Other library to add styles in xlx
  // exampleasa(){
  //   // import { saveAs } from 'file-saver';

  //   import("file-saver").then(saveAs => {
  //     var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
  //     saveAs(blob, "hello world.txt");
  //   });

  // }

}
