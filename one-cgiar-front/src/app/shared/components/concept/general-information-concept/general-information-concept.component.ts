import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { RequestsService } from '@app/shared/services/requests.service';
@Component({
  selector: 'app-general-information-concept',
  templateUrl: './general-information-concept.component.html',
  styleUrls: ['./general-information-concept.component.scss']
})
export class GeneralInformationConceptComponent implements OnInit {

  public generalInformationForm: FormGroup;
  public initvStgId: any;
  public actionAreas: any[] = [];

  wordCount: any;

  @ViewChild("text") text: ElementRef;
  words: any;
  wordCounter() {
    this.wordCount = this.text ? this.text.nativeElement.value.split(/\s+/) : 0;
    this.words = this.wordCount ? this.wordCount.length : 0;
  }

  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],                                         // remove formatting button
      ['link', 'image', 'video']                         // link and image, video
    ]
  };

  constructor(public _requests: RequestsService, public initiativesSvc: InitiativesService, public activatedRoute: ActivatedRoute) {
    this.generalInformationForm = new FormGroup({
      name: new FormControl('', Validators.required),
      challenge: new FormControl(' ', Validators.required),
      objectives: new FormControl(' ', Validators.required),
      results: new FormControl(' ', Validators.required),
      highlights: new FormControl(' ', Validators.required),
      action_area_description: new FormControl('Action Area description', Validators.required),
      action_area_id: new FormControl('', Validators.required),
      initvStgId: new FormControl(this.initvStgId, Validators.required),
    });
  }

  ngOnInit(): void {
    // $('textarea').trumbowyg();
    console.log(this.generalInformationForm);
    this.activatedRoute.params.subscribe(resp => {
      this.initvStgId = resp['id'];
      this.initiativesSvc.initvStgId = resp['id'];
      console.log('id del concept en general information', resp['id']);
      this.initiativesSvc.getActionAreas().subscribe(resp => this.actionAreas = resp.data);
      this.initiativesSvc.getConcept(this.initvStgId).subscribe(resp => {
        console.log('response getConcept', resp)
        this.generalInformationForm.controls['initvStgId'].setValue(this.initvStgId);
        if (resp.data[0].conceptInfoId === null) {
          console.log('no existe');
          this.initiativesSvc.getInitiativeById(this.initvStgId).subscribe(initiative => {
            console.log('response getInitiativeById', initiative);
            this.generalInformationForm.controls['name'].setValue(initiative.initiativeName);
          })
        } else {
          this.generalInformationForm.controls['name'].setValue(resp.data[0].conceptName);
          this.generalInformationForm.controls['action_area_id'].setValue(resp.data[0].conceptActAreId);
        }
        
        console.log('resp.data[0].conceptActAreId', resp.data[0].conceptActAreId);
        
        this.generalInformationForm.value.initvStgId = resp.data[0].initvStgId;
        console.log(this.generalInformationForm);
      });
    });
  }

  getConceptInfo() {
    this.initiativesSvc.getConcept(this.initvStgId).subscribe(resp => {
      console.log('concept info', resp);
      if (resp.data[0].conceptInfoId === null) {
        console.log('no existe');
        this.onSubmit();
      } else {
        this.onClickUpdate(resp.data[0].conceptInfoId);
        console.log('si existe')
      }
    }, error => {
      console.log(error)
    })
  }

  onSubmit() {
    this.initiativesSvc.getActionAreaById(Number(this.generalInformationForm.value.action_area_id)).subscribe(resp => {
      console.log('resp', resp);
      this.initiativesSvc.createConcept(this.generalInformationForm.value, resp).subscribe(resp => {
        console.log('concept', resp);
      })
      Swal.fire({
        icon: 'success',
        title: 'General information has been saved',
        showConfirmButton: false,
        timer: 2000
      })
    })
  }

  onClickUpdate(id) {
    this.initiativesSvc.getActionAreaById(Number(this.generalInformationForm.value.action_area_id)).subscribe(resp => {
      console.log('resp', resp);
      this.initiativesSvc.updateConcept(this.generalInformationForm.value, resp, id).subscribe(resp => {
        console.log('concept', resp);
      })
      Swal.fire({
        icon: 'success',
        title: 'General information has been saved',
        showConfirmButton: false,
        timer: 2000
      })
    })
  }

}