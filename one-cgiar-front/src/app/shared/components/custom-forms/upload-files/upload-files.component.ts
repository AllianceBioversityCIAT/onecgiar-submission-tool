import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { InitiativesService } from '../../../services/initiatives.service';
import { UploadFiles } from '../../../models/forms-options/upload-files-options.interface';
import { InteractionsService } from '../../../services/interactions.service';

@Component({
  selector: 'custom-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {
  @ViewChild('attachments') attachment: any;
  @Input() options:UploadFiles;
  progressInfos: any[];
  filesToUpload: any[] = [];
  constructor(
    public _initiativesService:InitiativesService,
    private _interactionsService:InteractionsService
  ) { }

  ngOnInit(): void {
  }

  onSelectFiles(event) {
    console.log('%conSelectFiles','background: #222; color: #37ff73');
    console.log(event);
    this.progressInfos = [];
    if (this.filesToUpload.length > 0) {
      let array = Array.from(event.target.files);
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        this.filesToUpload.push(element);
      }
    } else {
      this.filesToUpload = Array.from(event.target.files);
    }
    this.attachment.nativeElement.value = '';
  }

  dialogConfirmDeleteTosave(index, array){
    this._interactionsService.confirmationModal((decision)=>{
    if (decision) {
        console.log('%cRemove','background: #222; color: #fd8484');
        this.removeFile(index, array)
      }else{
        console.log("%cDon't remove",'background: #222; color: #37ff73');
      }
    });
  }

  removeFile(index, array) {
    array.splice(index, 1);
  }

}
