import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { RequestsService } from '@app/shared/services/requests.service';

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

  constructor(public _requests: RequestsService, public initiativesSvc: InitiativesService, public activatedRoute: ActivatedRoute) {
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
      this.initiativesSvc.getConcept(this.initvStgId).subscribe(resp => {
        console.log('response getConcept', resp)
        this.generalInformationForm.controls['initvStgId'].setValue(this.initvStgId);
        this.generalInformationForm.controls['name'].setValue(resp.data[0].conceptName);
        this.generalInformationForm.controls['challenge'].setValue(resp.data[0].conceptChallenge);
        this.generalInformationForm.controls['objectives'].setValue(resp.data[0].conceptObjectives);
        this.generalInformationForm.controls['results'].setValue(resp.data[0].conceptResults);
        this.generalInformationForm.controls['highlights'].setValue(resp.data[0].conceptHighlights);
        this.generalInformationForm.controls['action_area_id'].setValue(resp.data[0].conceptActAreId);
        this.generalInformationForm.controls['action_area_description'].setValue(resp.data[0].conceptActAreDes);
        this.generalInformationForm.value.initvStgId = resp.data[0].initvStgId;
        console.log(this.generalInformationForm);
      });
    });
  }

  updateConceptInfo(id) {
    this.initiativesSvc.getActionAreaById(Number(this.generalInformationForm.value.action_area_id)).subscribe(resp => {
      console.log('resp', resp);
      this.initiativesSvc.updateConcept(this.generalInformationForm.value, resp, id).subscribe(resp => {
        console.log('concept', resp);
      })
    })
  }

  getConceptInfo() {
    this.initiativesSvc.getConcept(this.initvStgId).subscribe(resp => {
      console.log('concept info', resp);
      this.updateConceptInfo(resp.data[0].conceptInfoId);
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
