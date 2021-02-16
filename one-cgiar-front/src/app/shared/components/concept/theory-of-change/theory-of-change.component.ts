import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { RequestsService } from '@app/shared/services/requests.service';

@Component({
  selector: 'app-theory-of-change',
  templateUrl: './theory-of-change.component.html',
  styleUrls: ['./theory-of-change.component.scss']
})
export class TheoryOfChangeComponent implements OnInit {

  public theoryOfChangeForm: FormGroup;
  public initvStgId: any;
  public fileToUpload: any;

  constructor(public _requests: RequestsService, private initiativesSvc: InitiativesService, public activatedRoute: ActivatedRoute) { 
    this.theoryOfChangeForm = new FormGroup({
      narrative: new FormControl('', Validators.required)
    });
  }

  wordCount: any;

  @ViewChild("text") text: ElementRef;
  words: any;
  wordCounter() {
    this.wordCount = this.text ? this.text.nativeElement.value.split(/\s+/) : 0;
    this.words = this.wordCount ? this.wordCount.length : 0;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const body = {
      initvStgId: this.initiativesSvc.initvStgId,
      narrative: this.theoryOfChangeForm.get('narrative').value
    };
    this.initiativesSvc.postFile(this.fileToUpload, body).subscribe(resp => {
      console.log('resp', resp);
    })
  }

  onSave(theoryOfChangeForm): void {
    console.log("GUARDANDO", theoryOfChangeForm.value);
  }

  @ViewChild('attachments') attachment: any;

  fileList: File[] = [];
  listOfFiles: any[] = [];

  onFileChanged(files: FileList) {
    console.log('files', files);
    this.fileToUpload = files.item(0);
    // for (var i = 0; i <= event.target.files.length - 1; i++) {
    //   var selectedFile = event.target.files[i];
    //   this.fileList.push(selectedFile);
    //   this.listOfFiles.push(selectedFile.name)
    // }

    // this.attachment.nativeElement.value = '';
  }

  removeSelectedFile(index) {
    // Delete the item from fileNames list
    this.listOfFiles.splice(index, 1);
    // delete file from FileList
    this.fileList.splice(index, 1);
  }

}
