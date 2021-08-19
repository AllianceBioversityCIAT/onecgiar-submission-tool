import { AfterViewInit, Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { CreateInitiativeModalComponent } from '@shared/components/create-initiative-modal/create-initiative-modal.component';
import { map } from 'rxjs/operators';
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
export class InitTableComponent implements AfterViewInit {
  @Input() data: any;

  displayedColumns: string[] = ['id', 'initiativeName','stages', 'initvStageStatus', 'action_area_description', 'currentStage'];
  dataSource: MatTableDataSource<TableData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.data);
  }

  constructor(public dialog: MatDialog, public initiativesSvc: InitiativesService) {
  
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

  ngAfterViewInit() {
  }

  parseCurrentStageColor(description:string){
    if (description.indexOf('1')>-1) {
      return '#3d85c6ff';
    }
    if (description.indexOf('2')>-1) {
      return '#6aa84fff';
    }
    if (description.indexOf('3')>-1) {
      return '#a64d79ff';
    }
    return 'gray'
  }

  parseStageLink(description: string) {
    switch (description) {
      case 'Stage 2: Concept':
        return 'concept' ;
        case 'Stage 3: Full Proposal':
          return 'full-proposal' ;
      default:
        return '';
    }
    // if (stageName == null) return '';
    // return stageName.split(' ').join('-').toLowerCase();
  }

  parseInitiativeId(){
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(CreateInitiativeModalComponent, { panelClass: 'custom-dialog-container' });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}