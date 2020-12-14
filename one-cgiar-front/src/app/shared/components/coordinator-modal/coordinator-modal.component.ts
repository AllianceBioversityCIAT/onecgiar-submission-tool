import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCoordinatorModalComponent } from '../add-coordinator-modal/add-coordinator-modal.component';

@Component({
  selector: 'app-coordinator-modal',
  templateUrl: './coordinator-modal.component.html',
  styleUrls: ['./coordinator-modal.component.scss']
})
export class CoordinatorModalComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(AddCoordinatorModalComponent, { panelClass: 'custom-dialog-container' });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
  }

}
