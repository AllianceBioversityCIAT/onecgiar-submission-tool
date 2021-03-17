import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
// import { InitiativesService } from '@app/shared/services/initiatives.service';
import { InitiativesService } from '../../services/initiatives.service';

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
    this.initiativesSvc.createInitiative(this.createInitiativeForm.value).subscribe(resp => {
      console.log('initiative id', resp.data.createdInitiative.id);
      const initvStgId = resp.data.createdInitiative.id;
      this.router.navigate([`/initiatives/${initvStgId}/stages/concept/general-information`]);
      Swal.fire({
        icon: 'success',
        title: 'Initiative has been saved',
        showConfirmButton: false,
        timer: 2000
      })
    });
  }

}
