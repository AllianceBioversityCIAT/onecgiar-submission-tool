import { Component, Input, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-clipboard-icon',
  templateUrl: './clipboard-icon.component.html',
  styleUrls: ['./clipboard-icon.component.scss']
})
export class ClipboardIconComponent implements OnInit {
  @Input() value: string | number;
  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

  }

  show(){
    this.messageService.add({key: 'toast', severity:'success', summary: 'Clipboard', detail: 'Copied to the clipboard'});
  }

}
