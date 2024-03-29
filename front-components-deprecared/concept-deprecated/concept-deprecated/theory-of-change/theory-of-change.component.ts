import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConceptService } from '@app/shared/services/concept.service';
import { RequestsService } from '@app/shared/services/requests.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { InitiativesService } from '../../../services/initiatives.service';
import { InteractionsService } from '../../../services/interactions.service';
import { StagesMenuService } from '../../../services/stages-menu.service';

@Component({
  selector: 'app-theory-of-change',
  templateUrl: './theory-of-change.component.html',
  styleUrls: ['./theory-of-change.component.scss']
})
export class TheoryOfChangeComponent implements OnInit {

  @ViewChild('attachments') attachment: any;

  public theoryOfChangeForm: FormGroup;
  public filesToUpload: any[] = [];

  public listOfFiles: any[] = [];
  public tocData: any;
  public createTOC: any = false;
  progressInfos: any[];
  showForm=false;
  tocID = null;

  constructor(
    public _requests: RequestsService, 
    private conceptSvc: ConceptService, 
    private spinnerService: NgxSpinnerService, 
    public _initiativesService:InitiativesService,
    public interactionsService:InteractionsService,
    public stgMenuSvc: StagesMenuService,
    public dialog: MatDialog,
    public _StagesMenuService:StagesMenuService
    ) {
    this.theoryOfChangeForm = new FormGroup({
      narrative: new FormControl(null, Validators.required)
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
      this.getTOCandFiles();


  }

  validateFormAndLeads(){
    // ((this.leads.lead_name && this.leads.co_lead_name)?true:false)
    // console.log(this.filesToUpload.length);
    if (this.theoryOfChangeForm.status == 'VALID' &&  (this.listOfFiles.length>0 ||this.filesToUpload.length>0)) {
      return  'VALID';
    } else{
      return  'INVALID'
    }
  }


  getTOCandFiles() {
    this.filesToUpload = [];
    this.conceptSvc.getTheoryOfChange(parseInt(this._initiativesService.initvStgId)).subscribe(resp => {
      // console.log('TOC', resp);
      this.tocID = resp?.id;
      if (resp != null) {
        this.tocData = resp;
        this.theoryOfChangeForm.controls['narrative'].setValue(resp.narrative);
        this.listOfFiles = resp.files || [];
      }
      this.showForm = true;
    }, error => {
      console.log('mostrar el error que no hay archivos', error)
      this.showForm = true;
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
    this.conceptSvc.upsertTheoryOfChange(
      file, 
      { 
        initvStgId: this._initiativesService.initvStgId, 
        narrative: this.theoryOfChangeForm.get('narrative').value,
        section:"tocs",
        id:this.tocID 
      
      }).subscribe(event => {
        this.theoryOfChangeForm.valid && (this.listOfFiles.length || this.filesToUpload.length)?   this.interactionsService.successMessage('Initial theory of change has been saved'):
        this.interactionsService.warningMessage('Initial theory of change has been saved, but there are incomplete fields')
        this.getTOCandFiles();
          this.spinnerService.hide('tocs')
          // this._initiativesService.getGreenCheckStatus(this._initiativesService.initvStgId).subscribe(resp=>{
          //   this._StagesMenuService.validateAllSectionsStatus('concept',resp.response?.validatedSections,this._initiativesService.initvStgId);
          // })
      },
      err => {
        this.progressInfos[idx].value = 0;
        this.spinnerService.hide('tocs')
        // console.log(err);
        this.interactionsService.errorMessage('Initial theory of change has not been saved')

      });
  }

  removeSelectedFile(index) {
    let updateFile = Object.assign({}, this.listOfFiles[index])
    /**
     * 
     * Add delete confirmation modal.
     * 
     */
    // console.log(updateFile)
    updateFile.active = false;
    this.spinnerService.show('tocs');
    this.conceptSvc.updateTheoryOfChangeFile(updateFile).subscribe(
      res => {
        // console.log(res)
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

  // dialogConfirmDeleteSaved(index): void {
  //   const dialogRef = this.dialog.open(DialogConfirmComponent, {
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result?.remove === true) {
  //       console.log('%cRemove','background: #222; color: #fd8484');
  //       this.removeSelectedFile(index);
  //     }else{
  //       console.log("%cDon't remove",'background: #222; color: #37ff73');
  //     }
  //   });
  // }



  dialogConfirmDeleteSaved(index){
    this.interactionsService.confirmationModal((decision)=>{
    if (decision) {
        console.log('%cRemove','background: #222; color: #fd8484');
        this.removeSelectedFile(index);
      }else{
        console.log("%cDon't remove",'background: #222; color: #37ff73');
      }
    });
  }


  dialogConfirmDeleteTosave(index, array){
    this.interactionsService.confirmationModal((decision)=>{
    if (decision) {
        console.log('%cRemove','background: #222; color: #fd8484');
        this.removeFile(index, array)
      }else{
        console.log("%cDon't remove",'background: #222; color: #37ff73');
      }
    });
  }



  // dialogConfirmDeleteTosave(index, array): void {
  //   const dialogRef = this.dialog.open(DialogConfirmComponent, {
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result?.remove === true) {
  //       console.log('%cRemove','background: #222; color: #fd8484');
  //       this.removeFile(index, array)
  //     }else{
  //       console.log("%cDon't remove",'background: #222; color: #37ff73');
  //     }
  //   });
  // }



}
