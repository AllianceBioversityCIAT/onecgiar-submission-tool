import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { InitiativesService } from '@shared/services/initiatives.service';
import { ConceptService } from '@shared/services/concept.service';
import { RequestsService } from '@shared/services/requests.service';

@Component({
  selector: 'app-narratives-concept',
  templateUrl: './narratives-concept.component.html',
  styleUrls: ['./narratives-concept.component.scss']
})
export class NarrativesConceptComponent implements OnInit {

  public generalInformationForm: FormGroup;
  public initvStgId: any;

  wordCount: any;

  @ViewChild("text") text: ElementRef;
  words: any;
  wordCounter() {
    this.wordCount = this.text ? this.text.nativeElement.value.split(/\s+/) : 0;
    this.words = this.wordCount ? this.wordCount.length : 0;
  }

  constructor(public _requests: RequestsService, public initiativesSvc: InitiativesService, public conceptSvc: ConceptService, public activatedRoute: ActivatedRoute) {
    this.generalInformationForm = new FormGroup({
      name: new FormControl('', Validators.required),
      challenge: new FormControl('', Validators.required),
      objectives: new FormControl('', Validators.required),
      results: new FormControl('', Validators.required),
      highlights: new FormControl('', Validators.required),
      action_area_description: new FormControl('', Validators.required),
      action_area_id: new FormControl('', Validators.required),
      initvStgId: new FormControl(this.initvStgId, Validators.required),
    });
  }

  ngOnInit(): void {
    console.log(this.generalInformationForm);
    this.activatedRoute.params.subscribe(resp => {
      this.initvStgId = resp['id'];
      this.initiativesSvc.initvStgId = resp['id'];
      console.log('id del concept en narratives', resp['id']);
      this.conceptSvc.getConcept(this.initvStgId).subscribe(resp => {
        console.log('response getConcept', resp)
        this.generalInformationForm.controls['initvStgId'].setValue(this.initvStgId);
        this.generalInformationForm.controls['name'].setValue(resp.conceptName);
        this.generalInformationForm.controls['challenge'].setValue(resp.conceptChallenge);
        this.generalInformationForm.controls['objectives'].setValue(resp.conceptObjectives);
        this.generalInformationForm.controls['results'].setValue(resp.conceptResults);
        this.generalInformationForm.controls['highlights'].setValue(resp.conceptHighlights);
        this.generalInformationForm.controls['action_area_id'].setValue(resp.conceptActAreId);
        this.generalInformationForm.controls['action_area_description'].setValue(resp.conceptActAreDes);
        this.generalInformationForm.value.initvStgId = resp.initvStgId;
        console.log(this.generalInformationForm);
      });
    });
  }

  updateConceptInfo(id) {
    this.initiativesSvc.getActionAreaById(Number(this.generalInformationForm.value.action_area_id)).subscribe(resp => {
      let body = Object.assign({}, this.generalInformationForm.value);
      body.action_area_description = resp;
      body.id = id;
      console.log('resp', resp, body);
      // this.conceptSvc.updateConcept(body).subscribe(resp => {
      //   console.log('concept', resp);
      // })
    })
  }

  getConceptInfo() {
    this.conceptSvc.getConcept(this.initvStgId).subscribe(resp => {
      console.log('concept info', resp);
      this.updateConceptInfo(resp.conceptInfoId);
      console.log('si existe')
    })
    Swal.fire({
      icon: 'success',
      title: 'Narrative has been saved',
      showConfirmButton: false,
      timer: 2000
    })
  }

}
