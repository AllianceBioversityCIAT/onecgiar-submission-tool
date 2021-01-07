import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { RequestsService } from '@app/shared/services/requests.service';

@Component({
  selector: 'app-theory-of-change',
  templateUrl: './theory-of-change.component.html',
  styleUrls: ['./theory-of-change.component.scss']
})
export class TheoryOfChangeComponent implements OnInit {

  constructor(public _requests: RequestsService) { }

  ngOnInit(): void {
  }

  onSave(theoryOfChangeForm): void {
    console.log("GUARDANDO", theoryOfChangeForm.value);
  }

  @ViewChild('attachments') attachment: any;

  fileList: File[] = [];
  listOfFiles: any[] = [];

  onFileChanged(event: any) {
    for (var i = 0; i <= event.target.files.length - 1; i++) {
      var selectedFile = event.target.files[i];
      this.fileList.push(selectedFile);
      this.listOfFiles.push(selectedFile.name)
    }

    this.attachment.nativeElement.value = '';
  }

  removeSelectedFile(index) {
    // Delete the item from fileNames list
    this.listOfFiles.splice(index, 1);
    // delete file from FileList
    this.fileList.splice(index, 1);
  }

}
