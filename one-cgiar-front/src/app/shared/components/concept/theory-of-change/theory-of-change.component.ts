import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConceptService } from '@app/shared/services/concept.service';
import { RequestsService } from '@app/shared/services/requests.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-theory-of-change',
  templateUrl: './theory-of-change.component.html',
  styleUrls: ['./theory-of-change.component.scss']
})
export class TheoryOfChangeComponent implements OnInit {

  @ViewChild('attachments') attachment: any;

  public theoryOfChangeForm: FormGroup;
  public initvStgId: any;
  public filesToUpload: any[] = [];

  public listOfFiles: any[] = [];
  public tocData: any;
  public createTOC: any = false;
  progressInfos: any[];

  constructor(public _requests: RequestsService, private conceptSvc: ConceptService, private spinnerService: NgxSpinnerService, public activatedRoute: ActivatedRoute) {
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
    this.activatedRoute.params.subscribe(resp => {
      this.initvStgId = resp['id'];
      this.getTOCandFiles();
    })
  }


  getTOCandFiles() {
    this.filesToUpload = [];
    this.conceptSvc.getTheoryOfChange(this.initvStgId).subscribe(resp => {
      // console.log('TOC', resp);
      this.tocData = resp;
      this.theoryOfChangeForm.controls['narrative'].setValue(resp.narrative);
      this.listOfFiles = resp.files || [];
    }, error => {
      console.log('mostrar el error que no hay archivos', error)
    })
  }
  /**
   * 
   * file upload process
   */
  onSelectFiles(event) {
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

  uploadFiles() {
    this.upload(0, this.filesToUpload);
  }
  upload(idx, file) {
    // this.progressInfos[idx] = { value: 0, fileName: file.name };
    this.spinnerService.show('tocs')
    this.conceptSvc.upsertTheoryOfChange(file, { initvStgId: this.initvStgId, narrative: this.theoryOfChangeForm.get('narrative').value }).subscribe(
      event => {
        this.getTOCandFiles();
        this.spinnerService.hide('tocs')
      },
      err => {
        this.progressInfos[idx].value = 0;
        this.spinnerService.hide('tocs')
      });
  }

  removeSelectedFile(index) {
    let updateFile = Object.assign({}, this.listOfFiles[index])
    /**
     * 
     * Add delete confirmation modal.
     * 
     */
    console.log(updateFile)
    updateFile.active = false;
    this.spinnerService.show('tocs');
    this.conceptSvc.updateTheoryOfChangeFile(updateFile).subscribe(
      res => {
        console.log(res)
        this.getTOCandFiles();
        this.spinnerService.hide('tocs')
      },
      error => {
        console.log(error)
        this.spinnerService.hide('tocs')
      }
    )
    // Set inactive the item from files list
    // this.listOfFiles[index].active = false;
  }
  removeFile(index, array) {
    array.splice(index, 1);
  }

}
