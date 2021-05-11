import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { RequestsService } from '@app/shared/services/requests.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataControlService } from '../../../services/data-control.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { InitiativesService } from '../../../services/initiatives.service';
@Component({
  selector: 'app-add-partners-modal',
  templateUrl: './add-partners-modal.component.html',
  styleUrls: ['./add-partners-modal.component.scss']
})


export class AddPartnersModalComponent implements OnInit {
  x_position = 0;
  wordCount: any;
  keyPartnersForm: FormGroup;
  toDisableList=[];
  constructor(
    public _dataControlService:DataControlService,
    private spinnerService: NgxSpinnerService,
    public dialogRef: MatDialogRef<AddPartnersModalComponent>,
    public _initiativesService:InitiativesService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.keyPartnersForm = new FormGroup({
        key_partner_name: new FormControl(this.data.key_partner_name, Validators.required),
        description: new FormControl(this.data.description, Validators.required),
        key_partner_id:new FormControl(this.data.key_partner_id, Validators.required),
      });
     }

  ngOnInit(): void {
    this.spinnerService.show("institutions_spinner");
    this.toDisableList = this.data.toDisableList;
    console.log(this.toDisableList);
    for (let index = 0; index < this.toDisableList.length; index++) {
      if (this.toDisableList[index]==this.keyPartnersForm.value.key_partner_id) {
        this.toDisableList[index]=-1;
      }
      // this.toDisableList[index]=-1;
    }
    console.log(this.toDisableList);
  }

  OnClickNo(){
    this.dialogRef.close();
  }

  requestPartner(){
    this.x_position = -70;
    console.log("hrlloo");
  }

}
