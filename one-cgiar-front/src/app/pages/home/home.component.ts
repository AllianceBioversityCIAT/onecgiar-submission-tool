import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { CreateInitiativeModalComponent } from '@app/shared/components/concept/create-initiative-modal/create-initiative-modal.component';
import { AuthService } from '@shared/services/auth.service';
import { InitiativesService } from '../../shared/services/initiatives.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public isUser: boolean = false;
  public user: any = null;
  public data: any = [];
  public role: string = null;

  constructor(public dialog: MatDialog, public authSvc: AuthService, public initiativesSvc: InitiativesService, private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.authSvc.user$.subscribe((user) => {
      console.log('OnInit', user);
      this.isUser = true;
      this.user = user;
      let roles = this.user.roles.find(role => role.acronym);
      this.role = roles.acronym;
      this.getInitiatives();
      this.spinner();
    })
  }

  spinner(): void {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
    }, 1500);
  }

  getInitiatives() {
    if (this.user) {
      if (this.user.roles?.find(role => role.acronym == 'ADM')) {
        this.initiativesSvc.getAllInitiatives().subscribe(data => {
          this.data = data.data;
          console.log('getInitiatives', this.data);
        });
      } else {
        this.initiativesSvc.getInitiativesByUser().subscribe(data => {
          this.data = data.data;
          console.log('getInitiativesByUser', this.data);
        });
      }
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateInitiativeModalComponent, { panelClass: 'custom-dialog-container' });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}