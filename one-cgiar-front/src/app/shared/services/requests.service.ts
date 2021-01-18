import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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
  workPackageInformationCs = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    results: new FormControl('', Validators.required),
  });

    constructor() { }

urlId;

addedCoordinator: User[] = [
  { id: 1, name: 'Jaime Duque', email: 'J.Duque@cgiar.org' }
];

coordinatorList: User[] = [
  { id: 2, name: 'Manuel Almanzar', email: 'M.R.Almanzar@cgiar.org' },
  { id: 3, name: 'Yecksin Zuñiga', email: 'Y.Zuniga@cgiar.org' },
  { id: 4, name: 'Felipe Elvira', email: 'F.Elvira@cgiar.org' }
];

workPackages = [
  {
    name: 'Work package 1',
    id: 1
  }
];

contributions = [
  {
    id: 1
  }
];

ranges = [
  {
    id: 1,
    low: null,
    high: null
  }
];

addWorkPackage() {
  let data = {
    name: '',
    id: 999
  }
  data.name = `Work package ${this.workPackages.length + 1}`;
  data.id = this.workPackages.length + 1;
  this.workPackages.push(data);
  // this.workPackages.push(`Work package ${this.workPackages.length + 1}`);
}

removeWorkPackage() {
  this.workPackages.splice(this.urlId - 1);
  // this.workPackages.forEach((value, index) => {
  //   if (value.id == workPackage.id) this.workPackages.splice(index, 1);
  // });
}

addCoordinator(coordinator: User) {
  console.log('coordinator', coordinator);
  this.addedCoordinator.push(coordinator);
}

removeCoordinator(coordinator: User) {
  this.addedCoordinator.forEach((value, index) => {
    if (value.id == coordinator.id) this.addedCoordinator.splice(index, 1);
  });
}

addContribution() {
  let contributionData = {
    id: 999
  }
  contributionData.id = this.contributions.length + 1;
  this.contributions.push(contributionData);
}

removeContribution(contribution: any) {
  // this.contributions = this.contributions.filter(({ id }) => id !== contribution.id);
  this.contributions.forEach((value, index) => {
    if (value.id == contribution.id) this.contributions.splice(index, 1);
  });
}

addRangeProjection() {
  let rangeData = {
    id: 2,
    low: null,
    high: null
  }
  rangeData.id = this.ranges.length + 1;
  this.ranges.push(rangeData);
}

removeRangeProjection(range: any) {
  this.ranges.forEach((value, index) => {
    if (value.id == range.id) this.ranges.splice(index, 1);
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

saveWorkPackageInformation(): void {
  console.log('formulario guardado', this.workPackageInformationCs);
}

submitForm(): void {
  console.log('formulario sometido', this.generalInformationFormCs);
}
}
