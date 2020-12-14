import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CoordinatorModalComponent } from '@app/shared/components/coordinator-modal/coordinator-modal.component';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-create-initiative',
  templateUrl: './create-initiative.component.html',
  styleUrls: ['./create-initiative.component.scss']
})
export class CreateInitiativeComponent implements OnInit {

  constructor(public _auth: AuthService, public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(CoordinatorModalComponent, { panelClass: 'custom-dialog-container' });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
  }

  onSave(generalInformationForm): void {
    console.log("GUARDANDO", generalInformationForm.value);
  }

}
