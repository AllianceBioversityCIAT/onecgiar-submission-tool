import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BudgetModel } from '../models/budget.model';
import { InitiativesService } from '../../../../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-geography-breakdown',
  templateUrl: './geography-breakdown.component.html',
  styleUrls: ['./geography-breakdown.component.scss']
})
export class GeographyBreakdownComponent implements OnInit {
  fixedData: BudgetModel;
  GEOSCOPE = []; REGIONS = []; COUNTRIES = [];
  COLUMNS = ['Global'];


  constructor(
    public _initiativesService: InitiativesService,
    private spinnerService: NgxSpinnerService,
    public currencyPipe: CurrencyPipe
  ) {
    this.fixedData = new BudgetModel()
    this.fixedData.headerNames = ['USD', '2022', '2023', '2024', 'Total'];
    this.fixedData.years = ['2022', '2023', '2024']
  }

  ngOnInit(): void {
    this.createMatrix();
  }

  onSave() {
    this.spinnerService.show('geographic-breakdown');
    console.log('financial resources', this.fixedData.list);
    this._initiativesService.saveFinancialResources(this.fixedData.list, this._initiativesService.initiative.id, 'activity_breakdown').subscribe(
      res => {
        console.log('financial resources response', res);
        this.getActivityBreakdown();
      },
      error => {
        console.log(error);
        this.spinnerService.hide('geographic-breakdown');
      }
    )
  }

  createMatrix() {
    this.spinnerService.show('geographic-breakdown');
    this._initiativesService.getSummary(this._initiativesService.initiative.id, 3).subscribe(resp => {
      this.REGIONS = resp.response.geoScope.regions;
      this.COUNTRIES = resp.response.geoScope.countries;
      this.COLUMNS = [...this.COLUMNS, ...this.REGIONS.map(r => r.name), ...this.COUNTRIES.map(c => c.name)]

      let initialMtrx = [
        { name: "Global", active: true, col_name: 'global', financial_type: 'geographic_breakdown', financial_type_id: null, table_name: 'financial_resources', id: null, total: 0, valuesList: {} },
      ]

      this.COLUMNS.forEach(col => {
        const colFound = initialMtrx.find(row => col == row.name);
        if (colFound) {
        } else {
          const region = this.REGIONS.find(r => r.name == col);
          const country = this.COUNTRIES.find(c => c.name == col);
          initialMtrx.push({ name: col, active: true, col_name: region ? 'region_id' : 'country_id', table_name: region ? 'clarisa_regions' : 'clarisa_countries', financial_type: "geographic_breakdown", financial_type_id: region ? region.region_id : country.country_id, id: null, total: 0, valuesList: {} })
        }
      })
      this.fixedData.list = initialMtrx;
      // console.log(initialMtrx)
      this.getActivityBreakdown()
    },
      error => {
        console.log(error);
        this.spinnerService.hide('geographic-breakdown');
      });
  }

  getActivityBreakdown() {

    this._initiativesService.getFinancialResources(this._initiativesService.initiative.id, "geographic_breakdown").subscribe(res => {
      const financialResourcesData = res.response.financialResourcesData;
      console.log(financialResourcesData);

      financialResourcesData.forEach(fRData => {
        const indxGlobal = this.fixedData.list.findIndex(fixD => fixD.table_name == fRData.table_name && (fixD.col_name == 'global' && fRData.col_name == 'global'));
        const indxRegion = this.fixedData.list.findIndex(fixD => fixD.financial_type_id != null && (fixD.financial_type_id == fRData.financial_type_id) && (fixD.col_name == 'country_id' && fRData.col_name == 'country_id'));
        const indxCountry = this.fixedData.list.findIndex(fixD => fixD.financial_type_id != null && (fixD.financial_type_id == fRData.financial_type_id) && (fixD.col_name == 'region_id' && fRData.col_name == 'region_id'));

        if (indxGlobal != -1) {
          this.fixedData.list[indxGlobal].id = fRData.id;
          this.fixedData.list[indxGlobal].col_name = fRData.col_name;
          this.fixedData.list[indxGlobal].table_name = fRData.table_name;
          this.fixedData.list[indxGlobal].financial_type_id = fRData.financial_type_id;
          this.fixedData.list[indxGlobal].financial_type = fRData.financial_type;
          const values = fRData.values_ != null ? fRData.values_.split(';') : [];
          if (values.length == 1) {
            this.fixedData.list[indxGlobal].valuesList = { [fRData.years]: fRData.values_ }
          } else {
            const years = fRData.years != null ? fRData.years.split(';') : [];
            years.forEach((year, i) => {
              Object.assign(this.fixedData.list[indxGlobal].valuesList, { [year]: values[i] });
            });

          }

        }
        if (indxRegion != -1) {
          this.fixedData.list[indxRegion].id = fRData.id;
          this.fixedData.list[indxRegion].col_name = fRData.col_name;
          this.fixedData.list[indxRegion].table_name = fRData.table_name;
          this.fixedData.list[indxRegion].financial_type_id = fRData.financial_type_id;
          this.fixedData.list[indxRegion].financial_type = fRData.financial_type;
          const values = fRData.values_ != null ? fRData.values_.split(';') : [];
          if (values.length == 1) {
            this.fixedData.list[indxRegion].valuesList = { [fRData.years]: fRData.values_ }
          } else {
            const years = fRData.years != null ? fRData.years.split(';') : [];
            years.forEach((year, i) => {
              Object.assign(this.fixedData.list[indxRegion].valuesList, { [year]: values[i] });
            });

          }

        }
        if (indxCountry != -1) {
          this.fixedData.list[indxCountry].id = fRData.id;
          this.fixedData.list[indxCountry].col_name = fRData.col_name;
          this.fixedData.list[indxCountry].table_name = fRData.table_name;
          this.fixedData.list[indxCountry].financial_type_id = fRData.financial_type_id;
          this.fixedData.list[indxCountry].financial_type = fRData.financial_type;
          const values = fRData.values_ != null ? fRData.values_.split(';') : [];
          if (values.length == 1) {
            this.fixedData.list[indxCountry].valuesList = { [fRData.years]: fRData.values_ }
          } else {
            const years = fRData.years != null ? fRData.years.split(';') : [];
            years.forEach((year, i) => {
              Object.assign(this.fixedData.list[indxCountry].valuesList, { [year]: values[i] });
            });

          }

        }
      });
      this.spinnerService.hide('geographic-breakdown');
    },
      error => {
        console.log(error);
        this.spinnerService.hide('geographic-breakdown');
      });
  }


  getTotal(item) {
    let total = 0;
    if (item.valuesList) {
      for (const key in item.valuesList) {
        if (Object.prototype.hasOwnProperty.call(item.valuesList, key)) {
          const ele = item.valuesList[key] ? item.valuesList[key] : 0;
          total += parseFloat(ele);
        }
      }
    }
    item.total = total;
    return total;
  }
}
