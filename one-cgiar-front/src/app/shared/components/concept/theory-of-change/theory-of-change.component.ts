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
  // public tocId: any;
  public fileList: File[] = [];
  public listOfFiles: any[] = [];
  public tocData: any;
  public createTOC: any = false;

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
    this.activatedRoute.params.subscribe(resp => {
      this.initvStgId = resp['id'];
      let toc$ = this.initiativesSvc.getTheoryOfChange(this.initvStgId).subscribe(resp => {
        // this.createTOC = false;
        console.log('TOC', resp);
        this.tocData = resp;
        this.theoryOfChangeForm.controls['narrative'].setValue(resp.data.narrative);
        this.listOfFiles = resp.data.files; //ojo
        console.log('listOfFiles', this.listOfFiles)
        toc$.unsubscribe();
      }, error => {
        // this.createTOC = true;
        console.log('aqui esta el error', error)
      })
    })
  }

  onSubmit() {
    const body = {
      initvStgId: this.initiativesSvc.initvStgId,
      narrative: this.theoryOfChangeForm.get('narrative').value
    };
    console.log('this.fileList', this.fileList)
    this.initiativesSvc.createTheoryOfChange(this.fileList, body).subscribe(resp => {
      console.log('resp', resp);
      console.log('initvStgId TOC', body.initvStgId);
    });
    
  }

  onUpdate(id) {
    console.log('%cid onUpdate', 'color: #37FF73');
    console.log(id)
    console.log(`this.theoryOfChangeForm.get('narrative').value`, this.theoryOfChangeForm.get('narrative').value)
    this.initiativesSvc.updateTheoryOfChange(this.theoryOfChangeForm.get('narrative').value, id).subscribe(resp => {
      console.log('resp', resp);
    }, error => {
      console.log('aqui esta el error', error)
    });
  }

  onUpdateFile() {
    this.initiativesSvc.getTheoryOfChange(this.initvStgId).subscribe(resp => {
      let tocId = resp.data.id;
      console.log('tocId', resp.data.id)
      const body = {
        tocId: tocId,
      };
      console.log('body onUpdateFile', body)
      this.initiativesSvc.createTOCFiles(this.fileList, body).subscribe(resp => {
        console.log('archivo creado', resp)
      })
    });
  }

  getTocs() {
    let toc$ = this.initiativesSvc.getTheoryOfChange(this.initvStgId).subscribe(resp => {
      this.createTOC = false;
      let idToc = 99999;
      this.initiativesSvc.getTheoryOfChange(this.initvStgId).subscribe(resp => {
        console.log('getTheoryOfChange', resp)
        idToc = resp.data.id;
        console.log('%cthis.tocData', 'background: #222; color: #37FF73');
        console.log('resp', this.tocData)
        this.onUpdate(idToc);
        console.log('si existe');
      });
      this.onUpdateFile();
      toc$.unsubscribe();
    }, error => {
      this.createTOC = true;
      console.log('no existe');
      this.onSubmit();
    })
    console.log('%centrando a getTocs', 'color: #37FF73');
    // this.initiativesSvc.getTheoryOfChange(this.initvStgId).subscribe(resp => {
    console.log('%cconsumiento getTheoryOfChange', 'color: #37FF73');
    console.log('toc info', this.tocData);
    // this.tocId = resp.data.id;
    // })
    Swal.fire({
      icon: 'success',
      title: 'Initial theory of change has been saved',
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

    this.initiativesSvc.getTheoryOfChange(this.initvStgId).subscribe(resp => {
      let idTocFile = resp.data.files.find(resp => resp.id);
      console.log('idTocFile', idTocFile)
      const body = {
        fileId: idTocFile.id,
        active: 0
      };
      console.log('body', body)
      this.initiativesSvc.deleteTOCFiles(body).subscribe(resp => {
        console.log('archivo borrado', resp)
      })
    })
  }

}
