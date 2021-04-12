import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InitiativesService } from '@app/shared/services/initiatives.service';

@Component({
  selector: 'app-edit-rol-user',
  templateUrl: './edit-rol-user.component.html',
  styleUrls: ['./edit-rol-user.component.scss']
})
export class EditRolUserComponent implements OnInit {
  @Input() user:any;
  @Input() roles;
  @Output() reload = new EventEmitter();
  activeExpansion=false;
  public userRolForm: FormGroup;
  constructor(
    public _initiativesService:InitiativesService,
  ) { 
    this.userRolForm = new FormGroup({
      userId: new FormControl(''),
      roleId: new FormControl(''),
    });
  }

  ngOnInit(): void {
    if (this.user.roleId) {
      this.userRolForm.controls.roleId.setValue(this.user.roleId);
    }
    
  }

  removeUserToInitiative(){
    this.activeExpansion = true;
    console.log("function()");
  }

  assignUserToInitiative(){
    console.log("assignUserToInitiative");
    console.log(this.user);
    this.userRolForm.controls.userId.setValue(this.user.userId);
    console.log(this.userRolForm.value);
    this._initiativesService.assignUserToInitiative(this.userRolForm.value,this._initiativesService.initvStgId).subscribe(resp=>{
      console.log(resp);
      this.reload.emit();
    });
  }

}
