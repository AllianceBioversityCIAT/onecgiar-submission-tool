import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { InitiativesService } from '../../../../services/initiatives.service';
import { InteractionsService } from '../../../../services/interactions.service';
import { AuthService } from '../../../../services/auth.service';



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
  usrAssessSubm: boolean;
  constructor(
    private router: Router,
    private auth: AuthService,
    public _menuService: MenuService,
    private _interactionsService: InteractionsService,
    public initiativeService: InitiativesService
  ) { }

  ngOnInit(): void {
    // console.log(this.userMenu)
    this.initiativeService.getUsersByInitiative(this.initiativeService.initiative.id).subscribe(
      resp => {
        const userByInitiative = resp.response.users;
        this.currentUser = this.auth.userValue

        const foundInInitiativeUser = userByInitiative.find(initvUsr => initvUsr.userId == this.currentUser.id);
        this.validateSubmitButton(foundInInitiativeUser);
        this.validateAssessButton();
      },
      err => {
        this._interactionsService.errorMessage(err.error?.description, 2000);
      })
  }

  /** submission process
   * 
   */

  validateSubmitButton(userInInitiative) {

    if (this.initiativeService.initiative.submission) {
      this.usrAvailableSubm = false;
      return;
    }

    if (this.currentUser.roles.find(r => r.acronym == 'ADM')) {
      this.usrAvailableSubm = true;
      return;
    }
    if (this.currentUser.roles.find(r => r.acronym == 'SGD') || this.currentUser.roles.find(r => r.acronym == 'PI')) {
      const userInInitiative = this.initiativeService.initiative.users.find(usr => usr.userId == this.currentUser.id);
      console.log(userInInitiative)
      this.usrAvailableSubm = userInInitiative == null ? false : (userInInitiative.role_acronym == 'PI' || userInInitiative.role_acronym == 'SGD') ? true : false;
      return;
    }
    if (this.initiativeService.initiative.status == null || this.initiativeService.initiative.status == 'On hold') {
      switch (userInInitiative.role_acronym) {
        case "SGD":
          this.usrAvailableSubm = true;
          break;
        case "PI":
          this.usrAvailableSubm = true;
          break;
        default:
          this.usrAvailableSubm = false;
          break;
      }
    }
  }
  validateAssessButton() {
    if (this.currentUser.roles.find(r => r.acronym == 'ADM') || this.currentUser.roles.find(r => r.acronym == 'ASSESS')) {
      this.usrAssessSubm = true;
      // this.usrAssessSubm = isEmpty(this.initiativeService.initiative.submission) ? false : true;
    }
    // if (this.initiativeService.initiative.status == null || this.initiativeService.initiative.status == 'On hold') {
    //   switch (userInInitiative.role_acronym) {
    //     case "SGD":
    //       this.usrAssessSubm = true;
    //       break;
    //     case "PI":
    //       this.usrAssessSubm = true;
    //       break;
    //     default:
    //       this.usrAssessSubm = false;
    //       break;
    //   }
    // }
  }


  onAssess() {
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
            console.log(resp.response)
            if (submissionRsp.active == 1) {
              this._interactionsService.successMessage('Initiative submitted sucessfully', 2000);
              this.router.navigateByUrl(this.router.url)
            } else {
              this._interactionsService.warningMessage(`Initiative submission needs validation. Please contact support`)
              // this._interactionsService.warningMessage(`Initiative submitted but missing sections: ${submissionRsp.missing.replace(/\s+$/, '').slice(0, -1)}`)
            }
          },
          err => {
            this._interactionsService.errorMessage(err.error?.description, 2000);
          }
        )
      })
  }

   /** submission process
   * 
   */

  showDialogSubStasModal() {
    this.onAssessSubmission.emit(true);
    // this.display = true;
  }



}
