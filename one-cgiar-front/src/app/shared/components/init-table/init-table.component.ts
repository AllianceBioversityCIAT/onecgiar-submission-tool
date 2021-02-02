import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  action_area: string;
  current_stage: string;
}

/** Constants used to fill up our data base. */
const NAMES: string[] = [
  'Jaime Duque', 'Hector Tobón', 'Felipe Elvira', 'Yecksin Zuñiga', 'Claudia Castiblanco', 'Manuel Almanzar', 'Margarita Ramirez', 'Diego Perez', 'Kenji Tanaka', 'Santiago Galvez',
  'Donal Menzies', 'Porscha Stiger', 'Andres Rojas', 'Luis Becerra', 'Santiago Restrepo', 'Johanna Rojas', 'Jose Molina', 'Claudia Loucel', 'Susana Cardona'
];
const STATE: string[] = [
  'All fields complete', 'Editing', 'All fields complete', 'Editing', 'All fields complete', 'Editing', 'All fields complete', 'Editing', 'All fields complete', 'Editing',
  'Editing', 'All fields complete', 'Editing', 'All fields complete', 'Editing', 'All fields complete', 'Editing', 'All fields complete', 'Editing'
];
const ACTIONAREA: string[] = [
  'Systems Transformation', 'Genetic Gains', 'Sustainable production', 'Systems Transformation', 'Genetic Gains', 'Sustainable production', 'Systems Transformation', 'Sustainable production', 'Genetic Gains', 'Systems Transformation',
  'Genetic Gains', 'Sustainable production', 'Systems Transformation', 'Genetic Gains', 'Sustainable production'
];
const STAGE: string[] = [
  'Concept', 'Concept', 'Concept', 'Concept', 'Concept', 'Concept', 'Concept', 'Concept', 'Concept', 'Concept',
  'Concept', 'Concept', 'Concept', 'Concept', 'Concept'
];

@Component({
  selector: 'app-init-table',
  templateUrl: './init-table.component.html',
  styleUrls: ['./init-table.component.scss']
})
export class InitTableComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'progress', 'action_area', 'current_stage'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  const status = STATE[Math.round(Math.random() * (STATE.length - 1))];

  const actionarea = ACTIONAREA[Math.round(Math.random() * (ACTIONAREA.length - 1))];

  const currentstage = STAGE[Math.round(Math.random() * (STAGE.length - 1))];

  return {
    id: id.toString(),
    name: name,
    progress: status,
    action_area: actionarea,
    current_stage: currentstage
  };
}
