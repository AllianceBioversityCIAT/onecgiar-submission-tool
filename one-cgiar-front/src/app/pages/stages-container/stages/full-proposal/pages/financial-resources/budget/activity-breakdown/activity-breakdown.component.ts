import { Component, OnInit } from '@angular/core';
import { BudgetModel } from '../models/budget.model';
import { InitiativesService } from '../../../../../../../../shared/services/initiatives.service';

import { CurrencyPipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-activity-breakdown',
  templateUrl: './activity-breakdown.component.html',
  styleUrls: ['./activity-breakdown.component.scss']
})
export class ActivityBreakdownComponent implements OnInit {

  fixedData: BudgetModel;
  WP;
  COLUMNS = ['Crosscutting across Work Packages', 'Innovation packages & Scaling Readiness'];


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
    this.spinnerService.show('activity-breakdown');
    // console.log('financial resources', this.fixedData.list);
    this._initiativesService.saveFinancialResources(this.fixedData.list, this._initiativesService.initiative.id, 'activity_breakdown').subscribe(
        res => {
        this.spinnerService.hide('activity-breakdown');
            console.log('financial resources response', res);
        // this.getActivityBreakdown();
      },
      error => {
        console.log(error);
        this.spinnerService.hide('activity-breakdown');
      }
    )
  }
  createMatrix() {
    this.spinnerService.show('activity-breakdown');
    this._initiativesService.getWpsFpByInititative().subscribe(resp => {
      this.WP = resp.response.workpackage;
      this.COLUMNS = [...this.COLUMNS, ...this.WP.map(wp => wp.acronym)];
      let initialMtrx = [
        { name: "Crosscutting across Work Packages", active: true, col_name: 'crosscutting_wokpackages', financial_type: 'activity_breakdown', financial_type_id: null, table_name: 'financial_resources', id: null, total: 0, valuesList: {} },
        { name: "Innovation packages & Scaling Readiness", active: true, col_name: 'innovation_packages', financial_type: 'activity_breakdown', financial_type_id: null, table_name: 'financial_resources', id: null, total: 0, valuesList: {} },
      ]

      this.COLUMNS.forEach(col => {
        const colFound = initialMtrx.find(row => col == row.name);
        if (colFound) {
        } else {
          const wp = this.WP.find(wp => wp.acronym == col);
          initialMtrx.push({ name: col, active: true, col_name: 'id', table_name: 'work_packages', financial_type: 'activity_breakdown', financial_type_id: wp.id, id: "", total: 0, valuesList: {} })
        }
      })
      this.fixedData.list = initialMtrx;
      this.getActivityBreakdown()
    },
      error => {
        console.log(error);
        this.spinnerService.hide('activity-breakdown');
      });
  }
  getActivityBreakdown() {

    this._initiativesService.getFinancialResources(this._initiativesService.initiative.id, "activity_breakdown").subscribe(res => {
      const financialResourcesData = res.response.financialResourcesData;

      financialResourcesData.forEach(fRData => {
        const indxCross = this.fixedData.list.findIndex(fixD =>fixD.table_name == fRData.table_name && (fixD.col_name == 'crosscutting_wokpackages' && fRData.col_name == 'crosscutting_wokpackages' ) );
        const indxInno = this.fixedData.list.findIndex(fixD => fixD.table_name == fRData.table_name && (fixD.col_name == 'innovation_packages' && fRData.col_name == 'innovation_packages' ));
        const indxWP = this.fixedData.list.findIndex(fixD => fixD.financial_type_id != null  && (fixD.financial_type_id == fRData.financial_type_id));
        
        if (indxWP != -1) {
          this.fixedData.list[indxWP].id = fRData.id;
          this.fixedData.list[indxWP].col_name = fRData.col_name;
          this.fixedData.list[indxWP].table_name = fRData.table_name;
          this.fixedData.list[indxWP].financial_type_id = fRData.financial_type_id;
          this.fixedData.list[indxWP].financial_type = fRData.financial_type;
          const values = fRData.values_ != null ? fRData.values_.split(';') : [];
          if (values.length == 1) {
            this.fixedData.list[indxWP].valuesList = { [fRData.years]: fRData.values_ }
          } else {
            const years = fRData.years != null ? fRData.years.split(';') : [];
            years.forEach((year, i) => {
              Object.assign(this.fixedData.list[indxWP].valuesList, { [year]: values[i] });
            });

          }

        }
        if (indxCross != -1) {
          this.fixedData.list[indxCross].id = fRData.id;
          this.fixedData.list[indxCross].col_name = 'crosscutting_wokpackages';
          this.fixedData.list[indxCross].table_name = fRData.table_name;
          this.fixedData.list[indxCross].financial_type_id = fRData.financial_type_id;
          this.fixedData.list[indxCross].financial_type = fRData.financial_type;
          const values = fRData.values_ != null ? fRData.values_.split(';') : [];
          if (values.length == 1) {
            this.fixedData.list[indxCross].valuesList = { [fRData.years]: fRData.values_ }
          } else {
            const years = fRData.years != null ? fRData.years.split(';') : [];
            years.forEach((year, i) => {
              Object.assign(this.fixedData.list[indxCross].valuesList, { [year]: values[i] });
            });

          }
        }
        if (indxInno != -1) {
          this.fixedData.list[indxInno].id = fRData.id;
          this.fixedData.list[indxInno].col_name = 'innovation_packages';
          this.fixedData.list[indxInno].table_name = fRData.table_name;
          this.fixedData.list[indxInno].financial_type_id = fRData.financial_type_id;
          this.fixedData.list[indxInno].financial_type = fRData.financial_type;
          const values = fRData.values_ != null ? fRData.values_.split(';') : [];
          if (values.length == 1) {
            this.fixedData.list[indxInno].valuesList = { [fRData.years]: fRData.values_ }
          } else {
            const years = fRData.years != null ? fRData.years.split(';') : [];
            years.forEach((year, i) => {
              Object.assign(this.fixedData.list[indxInno].valuesList, { [year]: values[i] });
            });

          }
        }

      });
      this.spinnerService.hide('activity-breakdown');
    },
      error => {
        console.log(error);
        this.spinnerService.hide('activity-breakdown');
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
