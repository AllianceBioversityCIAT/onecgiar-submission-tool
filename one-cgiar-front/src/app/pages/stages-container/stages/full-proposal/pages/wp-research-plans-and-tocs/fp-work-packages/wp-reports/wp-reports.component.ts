import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../../../shared/services/initiatives.service';
import { ManageExcelService } from '../../../../services/manage-excel.service';
import { UtilsService } from '../../../../../../../../shared/services/utils.service';
import { GeoScope } from './models/geoScopeModel.interface';

@Component({
  selector: 'app-wp-reports',
  templateUrl: './wp-reports.component.html',
  styleUrls: ['./wp-reports.component.scss']
})
export class WpReportsComponent implements OnInit {

  geoScope: GeoScope = {
    countries: [],
    regions:[]
  };
  showTables = false;
  constructor(
    private _initiativesService: InitiativesService,
    private _manageExcelService: ManageExcelService,
    public _utilsService:UtilsService
  ) { }

  ngOnInit(): void {
    this.getPreviewPartners();
  }

  getPreviewPartners(){
    this._initiativesService.getPreviewGeographicScopeData(this._initiativesService.initiative.id,3).subscribe(resp=>{
      this.geoScope.regions
      this.geoScope = resp.response.previewGeographicScope.GeoScope;
      this.showTables = true;
      console.log(this.geoScope);
    })
  }

  exportExcel() {
    import("xlsx").then(xlsx => {


      const worksheet = xlsx.utils.json_to_sheet(this.geoScope.regions);
      var wscols = [
        {wpx:100},
        {wpx:100},
        {wpx:250},
        {wpx:80},
        {wpx:250},
        {wpx:200},
        {wpx:100},
        {wpx:100},
        {wpx:100},
        {wpx:250},
    ];
    
    worksheet['!cols'] = wscols;
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });


      this._manageExcelService.saveAsExcelFile(excelBuffer, "partners");
    });
  }

}
