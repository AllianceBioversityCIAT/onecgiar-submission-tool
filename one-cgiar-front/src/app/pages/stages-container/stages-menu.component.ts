import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CoordinatorModalComponent } from '@shared/components/coordinator-modal/coordinator-modal.component';
import { InitiativesService } from '@shared/services/initiatives.service';
import { RequestsService } from '@shared/services/requests.service';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-stages-menu',
  templateUrl: './stages-menu.component.html',
  styleUrls: ['./stages-menu.component.scss']
})
export class StagesMenuComponent implements OnInit {

  constructor(public _auth: AuthService, public _requests: RequestsService, public initiativesSvc: InitiativesService, public dialog: MatDialog) { }

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
