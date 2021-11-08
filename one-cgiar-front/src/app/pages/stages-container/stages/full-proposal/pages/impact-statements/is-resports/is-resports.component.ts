import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-is-resports',
  templateUrl: './is-resports.component.html',
  styleUrls: ['./is-resports.component.scss']
})
export class IsResportsComponent implements OnInit {
  previewPartners = [];
  headerAndBodyData = [
    {
      headerName:'Partner Name',
      attributeName:'partner_name'
    },
    {
      headerName:'Full Partner Name Clarisa',
      attributeName:'none'
    },
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
    this.getPreviewPartnersData();
  }

  getPreviewPartnersData(){
    this._initiativesService.getPreviewPartnersData().subscribe(resp=>{
      console.log(resp.response.previewPartners);
      this.previewPartners = resp.response.previewPartners
    })
  }

}
