import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  generalInformationFormCs = new FormGroup({
    initiativeName: new FormControl('', Validators.required),
    leadContact: new FormControl('', Validators.email),
    actionArea: new FormControl('', Validators.required),
  });
  narrativesFormCs = new FormGroup({
    challenge: new FormControl('', Validators.required),
    objectives: new FormControl('', Validators.required),
    results: new FormControl('', Validators.required),
    highlights: new FormControl('', Validators.required),
  });
  theoryOfChangeFormCs = new FormGroup({
    narrative: new FormControl('', Validators.required),
    uploadDocuments: new FormControl('', Validators.required),
  });

  constructor() { }

  addedCoordinator: User[] = [
    { id: 1, name: 'Jaime Duque', email: 'J.Duque@cgiar.org' }
  ];

  coordinatorList: User[] = [
    { id: 2, name: 'Manuel Almanzar', email: 'M.R.Almanzar@cgiar.org' },
    { id: 3, name: 'Yecksin Zuñiga', email: 'Y.Zuniga@cgiar.org' },
    { id: 4, name: 'Felipe Elvira', email: 'F.Elvira@cgiar.org' }
  ];

  addCoordinator(coordinator: User) {
    console.log('coordinator', coordinator);
    this.addedCoordinator.push(coordinator);
  }

  removeCoordinator(coordinator: User) {
    this.addedCoordinator.forEach((value,index)=>{
        if(value.id==coordinator.id) this.addedCoordinator.splice(index,1);
    });
} 

  saveGeneralInformation(): void {
    console.log('formulario guardado', this.generalInformationFormCs);
  }

  saveNarratives(): void {
    console.log('formulario guardado', this.narrativesFormCs);
  }

  saveTheoryOfChange(): void {
    console.log('formulario guardado', this.theoryOfChangeFormCs);
  }

  submitForm(): void {
    console.log('formulario sometido', this.generalInformationFormCs);
  }
}
