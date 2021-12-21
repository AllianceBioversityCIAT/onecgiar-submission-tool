import { Component, OnInit, Input } from '@angular/core';
import { Region } from '../../models/regionModel.interface';
import { ManageExcelService } from '../../../../../../services/manage-excel.service';

@Component({
  selector: 'app-regions-table',
  templateUrl: './regions-table.component.html',
  styleUrls: ['./regions-table.component.scss']
})
export class RegionsTableComponent implements OnInit {
  @Input() regions:Region[]=[];
  headerPreview= ['code', 'name','acronym'];
  constructor(
    private _manageExcelService:ManageExcelService
  ) { }

  ngOnInit(): void {
    this.regions.map((item:any)=>delete item.official_code);
    console.log(this.regions)
  }

  exportBasicExcel(){
    this._manageExcelService.exportBasicExcel(this.regions,'Countries preview',[{wpx:90},{wpx:200},{wpx:90}])
  }

}
