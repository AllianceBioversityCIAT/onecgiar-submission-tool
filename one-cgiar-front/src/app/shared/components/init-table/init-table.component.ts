import { AfterViewInit, Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataControlService } from '../../services/data-control.service';
import { InitiativesService } from '../../services/initiatives.service';
export interface TableData {
  initvStgId: string;
  initiativeName: string;
  initvStageStatus: string;
  action_area_description: string;
  currentStage: string;
}

@Component({
  selector: 'app-init-table',
  templateUrl: './init-table.component.html',
  styleUrls: ['./init-table.component.scss']
})
export class InitTableComponent {
  @Input() data: any;

  displayedColumns: string[] = ['official_code', 'initiativeName', 'initvStageStatus', 'action_area_description', 'currentStage'];
  dataSource: MatTableDataSource<TableData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // console.log(this.data);
  }

  constructor(
    public initiativesSvc: InitiativesService,
    public _dataControlService: DataControlService
    ) {
  
  }

  parseStages(stages){
    let arrStages = [
      {
        buttonName:'Open Stage 1',
        route:'',
        stageId:1,
        enabled:false,
        color:'#3d85c6ff',
        stageName:'pre-concept'
      },
      {
        buttonName:'Open Stage 2',
        route:'',
        stageId:2,
        enabled:false,
        color:'#6aa84fff',
        stageName:'concept'
      },
      {
        buttonName:'Open Stage 3',
        route:'',
        stageId:3,
        enabled:false,
        color:'#a64d79ff',
        stageName:'full-proposal'
      }
    ]
    arrStages.map(localButonsSatages=>{
      let auxStage = stages.find(itemStage=>itemStage.stageId == localButonsSatages.stageId);
      if (auxStage) {
        localButonsSatages.enabled = true 
      }
    })
    return arrStages;
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(this.data);
    this.dataSource = new MatTableDataSource(changes.data.currentValue)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.matSort;
  }

  parseCurrentStageColor(stageId:string | number){
    if (stageId == 4) {
      return '#3d85c6ff';
    }
    if (stageId == 2) {
      return '#6aa84fff';
    }
    if (stageId == 3) {
      return '#a64d79ff';
    }
    return 'gray'
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}