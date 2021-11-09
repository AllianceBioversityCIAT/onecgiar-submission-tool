import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-is-resports',
  templateUrl: './is-resports.component.html',
  styleUrls: ['./is-resports.component.scss']
})
export class IsResportsComponent implements OnInit {
  previewPartners = [];
  notArePreviewPartners = false;
  headerAndBodyData = [
    {
      headerName:'Partner Name',
      attributeName:'partner_name',
    },
    // {
    //   headerName:'Full Partner Name Clarisa',
    //   attributeName:'none'
    // },
    {
      headerName:'URL',
      attributeName:'url'
    },
    {
      headerName:'Acronym Clarisa',
      attributeName:'acronym'
    },
    {
      headerName:'initiative_id',
      attributeName:'initiative_id'
    },
    {
      headerName:'Action Area Code',
      attributeName:'action_area'
    },
    {
      headerName:'Partner_ID',
      attributeName:'partner_id'
    },
    {
      headerName:'Location (Country as indicated in Initiative)',
      attributeName:'location'
    },
    {
      headerName:'Organization type IATI',
      attributeName:'organization_type_IATI'
    },
    {
      headerName:'Network Mapping Codes',
      attributeName:'network_mapping_codes'
    },
    {
      headerName:'Organization Type Clarisa',
      attributeName:'organization_type_clarisa'
    },
    {
      headerName:'Clarisa ID',
      attributeName:'clarisa_id'
    },
    {
      headerName:'Demand',
      attributeName:'none'
    },
    {
      headerName:'Innovation',
      attributeName:'none'
    },
    {
      headerName:'Scaling',
      attributeName:'none'
    },
    {
      headerName:'HQ Location Clarisa',
      attributeName:'hq_location_clarisa'
    },
    {
      headerName:'Impact Area',
      attributeName:'impact_area_id'
    },
    {
      headerName:'Source',
      attributeName:'Source'
    }
  ]
  constructor(
    private _initiativesService: InitiativesService
  ) { }

  ngOnInit(): void {
    this.getPreviewPartnersDataByInitiativeId();
  }

  getPreviewPartnersDataByInitiativeId(){
    this._initiativesService.getPreviewPartnersDataByInitiativeId(this._initiativesService.initiative.id).subscribe(resp=>{
      console.log(resp);
      console.log(resp.response.previewPartners);
      this.previewPartners = resp.response.previewPartners
      if (!this.previewPartners.length) this.notArePreviewPartners = true;
      console.log(this.previewPartners);
    })
  }

  saveAsExcelFile(buffer: any, fileName: string = "test"): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.previewPartners);
      var wscols = [
        {wpx:300},
        {wpx:250},
        {wpx:100},
        {wpx:80},
        {wpx:150},
        {wpx:100},
        {wpx:100},
        {wpx:100},
        {wpx:100},
        {wpx:250},
        {wpx:100},
        {wpx:50},
        {wpx:70},
        {wpx:50},
        {wpx:100},
        {wpx:100},
        {wpx:150},
        // {wpx:10},
        // {wpx:20}
    ];
    
    worksheet['!cols'] = wscols;
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });

      this.saveAsExcelFile(excelBuffer, "partners");
    });
  }

}
