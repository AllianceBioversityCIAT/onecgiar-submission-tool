import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RequestsService } from '@app/shared/services/requests.service';

@Component({
  selector: 'app-add-partners-modal',
  templateUrl: './add-partners-modal.component.html',
  styleUrls: ['./add-partners-modal.component.scss']
})
export class AddPartnersModalComponent implements OnInit {

  wordCount: any;

  @ViewChild("text") text: ElementRef;
  words: any;
  wordCounter() {
    this.wordCount = this.text ? this.text.nativeElement.value.split(/\s+/) : 0;
    this.words = this.wordCount ? this.wordCount.length : 0;
  }

  constructor(public _requests: RequestsService) { }

  ngOnInit(): void {
  }

}
