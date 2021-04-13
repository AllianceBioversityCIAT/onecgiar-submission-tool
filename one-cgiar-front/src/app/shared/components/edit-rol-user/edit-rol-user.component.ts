import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { InteractionsService } from '../../services/interactions.service';

@Component({
  selector: 'app-edit-rol-user',
  templateUrl: './edit-rol-user.component.html',
  styleUrls: ['./edit-rol-user.component.scss']
})
export class EditRolUserComponent implements OnInit {
  @Input() user:any;
  @Input() roles;
  // @Input() selectedUsers;
  @Output() reload = new EventEmitter();
  colorChip="primary";
  activeExpand=-1;
  activeExpansion=false;
  CurrentRolChipName;
  public userRolForm: FormGroup;
  constructor(
    public _initiativesService:InitiativesService,
    public dialog: MatDialog,
    public _interactions: InteractionsService
  ) { 
    this.userRolForm = new FormGroup({
      userId: new FormControl(''),
      roleId: new FormControl(''),
    });
  }

  ngOnInit(): void {
    console.log(this.user);
    if (this.user.roleId) {
      this.userRolForm.controls.roleId.setValue(this.user.roleId);
      this.getLocalRolById(this.user.roleId);
    }
    this.userRolForm.controls.userId.setValue(this.user.userId);
    this.userRolForm.valueChanges.subscribe(resp=>{
      this.getLocalRolById(resp.roleId);
      if (resp.roleId != this.user.roleId) {
       this._interactions.currentUserIdOnlyExpand=-1;
       this.colorChip="warn";
      }else{
       this.colorChip="primary";
       this._interactions.currentUserIdOnlyExpand=this.user.userId;
      }
    })

    setTimeout(() => {
      this.activeExpand = this._interactions.expandWithUserId;

    }, 500);
    
  }

  removeUserToInitiative(){
    if (!this.user.new) {
      let body={
        userId:this.user.userId,
        active:0,
        roleId:this.user.roleId
      }
      console.log(body);
      this._initiativesService.assignUserToInitiative(body,this._initiativesService.initvStgId).subscribe(resp=>{
        console.log(resp);
        this.reload.emit();
      });
    }else{
      this.user.active = false;
      this.reload.emit();
    }

  }

  assignUserToInitiative(){
    console.log("assignUserToInitiative");
    console.log(this.user);
    this.userRolForm.controls.userId.setValue(this.user.userId);
    console.log(this.userRolForm.value);
    let body =  this.userRolForm.value;
    body.active = true;
    this._initiativesService.assignUserToInitiative(body,this._initiativesService.initvStgId).subscribe(resp=>{
      console.log(resp);
      this._interactions.expandWithUserId=-1;
      this.reload.emit();
      this._interactions.disableAllExpandBool = false;
    });
  }

  getLocalRolById(id){
    for (const rol of this.roles) {
      if (rol.id == id) {
        this.CurrentRolChipName = rol.name;
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.removeUserToInitiative();
      }
      console.log('The dialog was closed');
    });
  }

}
