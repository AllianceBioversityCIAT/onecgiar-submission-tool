import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InitiativesService } from '@app/shared/services/initiatives.service';

@Component({
  selector: 'app-create-initiative-modal',
  templateUrl: './create-initiative-modal.component.html',
  styleUrls: ['./create-initiative-modal.component.scss']
})
export class CreateInitiativeModalComponent implements OnInit {

  public createInitiativeForm: FormGroup;
  private user = JSON.parse(localStorage.getItem('user')) || null;

  constructor(public initiativesSvc: InitiativesService, private router: Router) { 
    this.createInitiativeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      user: new FormControl(this.user.id, Validators.required),
      is_coordinator: new FormControl(false, Validators.required),
      is_lead: new FormControl(false, Validators.required),
      is_owner: new FormControl(true, Validators.required),
      current_stage: new FormControl(2, Validators.required)
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    // let body = {
    //     name: "prueba 33",
    //     challenge: "this is a challenge example",
    //     objectives: "these are the objectives: 1, 2 3",
    //     results: "these are the results ",
    //     highlights: "123",
    //     action_area_description: "Action Area description",
    //     action_area_id: "1",
    //     initvStgId: 9999
    //   };
    this.initiativesSvc.createInitiative(this.createInitiativeForm.value).subscribe(resp => {
      console.log('initiative id', resp.data.createdInitiative.id);
      const initvStgId = resp.data.createdInitiative.id;
      // body.initvStgId = initvStgId;
      // this.initiativesSvc.postConcept(body, '').subscribe(resp => {
      //       console.log('concept', resp);
      // })
      // localStorage.setItem('initvStgId', initvStgId);
      this.router.navigate([`/create-initiative/general-information-c/${initvStgId}`]);
    });
  }

}
