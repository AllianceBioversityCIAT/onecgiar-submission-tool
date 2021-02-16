import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
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

  public fileList: File[] = [];
  public listOfFiles: any[] = [];

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
    console.log('this.fileList', this.fileList)
    this.initiativesSvc.postFile(this.fileList, body).subscribe(resp => {
      console.log('resp', resp);
      console.log('initvStgId TOC', body.initvStgId);
    })
    Swal.fire({
      icon: 'success',
      title: 'Theory of change has been saved',
      showConfirmButton: false,
      timer: 2000
    })
  }

  onSave(theoryOfChangeForm): void {
    console.log("GUARDANDO", theoryOfChangeForm.value);
  }

  @ViewChild('attachments') attachment: any;

  onFileChanged(files: FileList) {
    console.log('files', files);
    this.fileToUpload = files.item(0);
    console.log('this.fileToUpload', this.fileToUpload.name);
    for (var i = 0; i <= files.length - 1; i++) {
      var selectedFile = files[i];
      this.fileList.push(selectedFile);
      this.listOfFiles.push(selectedFile.name);
      console.log('fileList', this.fileList);
    }

    this.attachment.nativeElement.value = '';
    // this.listOfFiles.push(this.fileToUpload.name);
  }

  removeSelectedFile(index) {
    // Delete the item from fileNames list
    this.listOfFiles.splice(index, 1);
    // delete file from FileList
    this.fileList.splice(index, 1);
  }

}
