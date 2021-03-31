import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RequestsService } from '@app/shared/services/requests.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPartnersModalComponent } from '../add-partners-modal/add-partners-modal.component';

@Component({
  selector: 'app-key-partners-concept',
  templateUrl: './key-partners-concept.component.html',
  styleUrls: ['./key-partners-concept.component.scss']
})
export class KeyPartnersConceptComponent implements OnInit {

  keyPartners = [
    {
      key:"1",
      description: "lorem"
    },
    {
      key:"2",
      description: "lorem"
    },
    {
      key:"3",
      description: "lorem"
    }
  ]
  wordCount: any;

  @ViewChild("text") text: ElementRef;
  words: any;
  wordCounter() {
    this.wordCount = this.text ? this.text.nativeElement.value.split(/\s+/) : 0;
    this.words = this.wordCount ? this.wordCount.length : 0;
  }

  constructor(public _requests: RequestsService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(i,data) {
    const dialogRef = this.dialog.open(AddPartnersModalComponent, 
      { panelClass: 'custom-dialog-container',
      data
       });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('%cresult','background: #222; color: #ffff00');
        console.log(result);
        this.editKeyPartner(i,result);
      }

    });
  }

  removeKeyPartner(index){
    this.keyPartners.splice(index,1);
  }
  addNewKeyPartner(){
    this.keyPartners.push({key:"New",description: "New"})
  }
  editKeyPartner(index,data){
    this.keyPartners[index].key = data.keyPartner;
    this.keyPartners[index].description = data.description;
  }

}
