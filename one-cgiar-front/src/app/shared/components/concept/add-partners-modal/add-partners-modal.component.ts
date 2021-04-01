import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { RequestsService } from '@app/shared/services/requests.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-partners-modal',
  templateUrl: './add-partners-modal.component.html',
  styleUrls: ['./add-partners-modal.component.scss']
})


export class AddPartnersModalComponent implements OnInit {

  wordCount: any;
  keyPartnersForm: FormGroup;
  keyPartnersListExample=[
    {
      name:"IRRI",
      id: 1
    },
    {
      name:"IITA",
      id: 2
    },
    {
      name:"CIAT",
      id: 3
    },
    {
      name:"CIMMYT",
      id: 4 
    },
    {
      name:"ICRAF",
      id: 5
    }
  ]

  constructor(
    public dialogRef: MatDialogRef<AddPartnersModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.keyPartnersForm = new FormGroup({
        // key_partner_name: new FormControl(null, Validators.required),
        description: new FormControl(this.data.description, Validators.required),
        key_partner_id:new FormControl(this.data.key_partner_id, Validators.required),
      });
     }

  ngOnInit(): void {
    console.log(this.data);
    console.log(this.keyPartnersForm.value);
    // this.keyPartnersForm.controls['description'].setValue(this.data.description);
    // this.keyPartnersForm.controls['key_partner_id'].setValue(this.data.key_partner_id);
  }

  OnClickNo(){
    this.dialogRef.close();
  }

}
