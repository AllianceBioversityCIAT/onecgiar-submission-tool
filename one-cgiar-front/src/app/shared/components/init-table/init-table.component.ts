import { AfterViewInit, Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CreateInitiativeModalComponent } from '@shared/components/create-initiative-modal/create-initiative-modal.component';

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

  displayedColumns: string[] = ['initvStgId', 'initiativeName', 'initvStageStatus', 'action_area_description', 'currentStage'];
  dataSource: MatTableDataSource<TableData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;



  constructor(public dialog: MatDialog, private activeRoute: ActivatedRoute) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource = new MatTableDataSource(changes.data.currentValue)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.matSort;
  }

  ngAfterViewInit() {
  }

  parseStageLink(stageName: string) {
    return stageName.split(' ').join('-').toLowerCase();
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