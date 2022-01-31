import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/shared/services/auth.service';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { InteractionsService } from '@app/shared/services/interactions.service';
import { MenuService } from '../../services/menu.service';
import { DataControlService } from '../../../../services/data-control.service';


@Component({
  selector: 'app-menu-stage',
  templateUrl: './menu-stage.component.html',
  styleUrls: ['./menu-stage.component.scss'],
  animations: [
    trigger('expandable', [
      state('expand', style({ height: '*' })),
      state('collapse', style({ height: '0' })),
      transition('collapse => expand', animate('.3s ease-in')),
      transition('expand => collapse', animate('.3s ease-out')),
    ]),
  ],
})
export class MenuStageComponent implements OnInit {
  @Input() userMenu;

  @Output() onAssessSubmission = new EventEmitter<boolean>();



  currentUser;
  usrAvailableSubm: boolean;
  constructor(
    private router: Router,
    private auth: AuthService,
    public _menuService: MenuService,
    private _interactionsService: InteractionsService,
    public initiativeService: InitiativesService
  ) { }

  ngOnInit(): void {
    this.initiativeService.getUsersByInitiative(this.initiativeService.initiative.id).subscribe(
      resp => {
        const userByInitiative = resp.response.users;
        this.currentUser = this.auth.userValue

        const foundInInitiativeUser = userByInitiative.find(initvUsr => initvUsr.userId == this.currentUser.id)
        if (foundInInitiativeUser) {
          this.usrAvailableSubm = true;
        } else {
          this.usrAvailableSubm = false;
        }
      },
      err => {
        this._interactionsService.errorMessage(err.error?.description, 2000);
      })
  }

  /** submission process
   * 
   */
  onSubmitt() {
    this._interactionsService.customConfirmationModal(
      {
        title: 'Are you sure of submitting?',
        text: 'By confirming, your initiative will remain in a read-only mode while being assessed.',
        icon: 'warning',
        cancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: '#37474F',
        confirmText: 'Submit Initiative'
      },
      (decision) => {
        if (!decision) return;
        this.initiativeService.submitInitiative(this.initiativeService.initiative.id, this.initiativeService.initiative.stageId).subscribe(
          resp => {
            const submissionRsp = resp.response.submittedStatus[0].submission;
            if (submissionRsp.complete == 1) {
              this._interactionsService.successMessage('Initiative submitted sucessfully', 2000)
            } else {
              this._interactionsService.warningMessage(`Initiative submitted but missing sections: ${submissionRsp.missing.replace(/\s+$/, '').slice(0, -1)}`)
            }
          },
          err => {
            this._interactionsService.errorMessage(err.error?.description, 2000);
          }
        )
      })
  }

  onAssess() {

  }

  showDialogSubStasModal() {
    this.onAssessSubmission.emit(true);
    // this.display = true;
  }



}
