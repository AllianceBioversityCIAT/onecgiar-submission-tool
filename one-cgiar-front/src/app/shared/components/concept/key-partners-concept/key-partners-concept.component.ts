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

  keyPartners = this._requests.keyPartnersCs.controls.partner.value;

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

  openDialog() {
    const dialogRef = this.dialog.open(AddPartnersModalComponent, { panelClass: 'custom-dialog-container' });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
