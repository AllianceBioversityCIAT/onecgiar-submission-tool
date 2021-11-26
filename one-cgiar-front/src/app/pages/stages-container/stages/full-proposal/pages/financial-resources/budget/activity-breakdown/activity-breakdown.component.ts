import { Component, OnInit } from '@angular/core';
import { BudgetModel } from '../models/budget.model';
import { InitiativesService } from '../../../../../../../../shared/services/initiatives.service';
import { forkJoin } from 'rxjs';

import { CurrencyPipe } from '@angular/common';

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

    console.log(this.fixedData.list)

    this._initiativesService.saveFinancialResources(this.fixedData.list, this._initiativesService.initiative.id).subscribe(
      res => {
        console.log('financial resources response', res)
      }
    )

  }

  addActivity() {
    this.fixedData.pushItem({ name: null, valuesList: [] })
  }

  createMatrix() {
    this._initiativesService.getWpsFpByInititative(this._initiativesService.initiative.id).subscribe(resp => {
      this.WP = resp.response.workpackage;
      this.COLUMNS = [...this.COLUMNS, ...this.WP.map(wp => wp.acronym)];
      let initialMtrx = [
        { name: "Crosscutting across Work Packages", active: true, col_name: 'crosscutting_wokpackages', financial_type: '', financial_type_id: '', table_name: 'financial_resources', id: '', total: 0, valuesList: {} },
        { name: "Innovation packages & Scaling Readiness", active: true, col_name: 'innovation_packages', financial_type: '', financial_type_id: '', table_name: 'financial_resources', id: '', total: 0, valuesList: {} },
      ]

      this.COLUMNS.forEach(col => {
        const colFound = initialMtrx.find(row => col == row.name);
        if (colFound) {
        } else {
          const wp = this.WP.find(wp => wp.acronym == col);
          initialMtrx.push({ name: col, active: true, col_name: 'id', table_name: 'work_packages', financial_type: '', financial_type_id: wp.id, id: "", total: 0, valuesList: {} })
        }
      })
      this.fixedData.list = initialMtrx;
      this.getActivityBreakdown()
    })



  }
  getActivityBreakdown() {
    // this.createMatrix();

    this._initiativesService.getFinancialResources(this._initiativesService.initiative.id, "activity_breakdown").subscribe(res => {
      const financialResourcesData = res.response.financialResourcesData;

      financialResourcesData.forEach(fRData => {
        const indxWP = this.fixedData.list.findIndex(fixD => fixD.financial_type_id !== "" && fixD.financial_type_id == fRData.financial_type_id);
        const indxCross = this.fixedData.list.findIndex(fixD => fixD.financial_type_id == "" && fixD.col_name == 'crosscutting_wokpackages' && fRData.col_name == 'crosscutting_wokpackages');
        const indxInno = this.fixedData.list.findIndex(fixD => fixD.financial_type_id == "" && fixD.col_name == 'innovation_packages' && fRData.col_name == 'innovation_packages');
        if (indxWP != -1) {
          this.fixedData.list[indxWP].id = fRData.id;
          this.fixedData.list[indxWP].col_name = fRData.col_name;
          this.fixedData.list[indxWP].table_name = fRData.table_name;
          this.fixedData.list[indxWP].financial_type_id = fRData.financial_type_id;
          this.fixedData.list[indxWP].financial_type = fRData.financial_type;
          const values = fRData.values_.split(';')
          if (values.length == 1) {
            this.fixedData.list[indxWP].valuesList = { [fRData.years]: fRData.values_ }
          } else {
            const years = fRData.years.split(';');
            years.forEach((year, i) => {
              Object.assign(this.fixedData.list[indxCross].valuesList, { [year]: values[i] });
            });

          }

        }
        if (indxCross != -1) {
          this.fixedData.list[indxCross].id = fRData.id;
          this.fixedData.list[indxCross].col_name = fRData.col_name;
          this.fixedData.list[indxCross].table_name = fRData.table_name;
          this.fixedData.list[indxCross].financial_type_id = fRData.financial_type_id;
          this.fixedData.list[indxCross].financial_type = fRData.financial_type;
          const values = fRData.values_.split(';')
          if (values.length == 1) {
            this.fixedData.list[indxCross].valuesList = { [fRData.years]: fRData.values_ }
          } else {
            const years = fRData.years.split(';');
            years.forEach((year, i) => {
              Object.assign(this.fixedData.list[indxCross].valuesList, { [year]: values[i] });
            });

          }
        }
        if (indxInno != -1) {
          this.fixedData.list[indxInno].id = fRData.id;
          this.fixedData.list[indxInno].col_name = fRData.col_name;
          this.fixedData.list[indxInno].table_name = fRData.table_name;
          this.fixedData.list[indxInno].financial_type_id = fRData.financial_type_id;
          this.fixedData.list[indxInno].financial_type = fRData.financial_type;
          const values = fRData.values_.split(';')
          if (values.length == 1) {
            this.fixedData.list[indxInno].valuesList = { [fRData.years]: fRData.values_ }
          } else {
            const years = fRData.years.split(';');
            years.forEach((year, i) => {
              Object.assign(this.fixedData.list[indxInno].valuesList, { [year]: values[i] });
            });

          }
        }

      });
    });
  }




  getCellValue(year, valueList) {
    if (valueList.year) {
      const valIndex = valueList.year.findIndex(x => x == year);
      return parseFloat(valueList.value[valIndex]).toFixed(2);
    }
  }

  
  getColumns() {

  }

  parseFloat_($event) {
    return parseFloat($event)
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
