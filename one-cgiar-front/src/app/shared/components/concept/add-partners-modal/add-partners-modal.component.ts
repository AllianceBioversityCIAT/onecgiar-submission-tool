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
      id:"1"
    },
    {
      name:"IITA",
      id:"2"
    },
    {
      name:"CIAT",
      id:"3"
    },
    {
      name:"CIMMYT",
      id:"4"
    },
    {
      name:"ICRAF",
      id:"5"
    }
  ]
  example={
    nadame:"asas"
  }
  words: any;
  wordCounter() {
    console.log("object");
    console.log(this.data);
    // this.wordCount = this.text ? this.text.nativeElement.value.split(/\s+/) : 0;
    // this.words = this.wordCount ? this.wordCount.length : 0;
  }

  constructor(
    public dialogRef: MatDialogRef<AddPartnersModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.keyPartnersForm = new FormGroup({
        keyPartner: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
      });
     }

  ngOnInit(): void {
  }

  OnClickNo(){
    this.dialogRef.close();
  }

}
