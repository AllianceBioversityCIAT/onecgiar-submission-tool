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
    changesPreviousStage: new FormControl('', Validators.required),
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
  projectionBenefitsRangeCs = new FormGroup({
    range: new FormArray([
      new FormGroup({
        year: new FormControl('2021'),
        low: new FormControl('1'),
        high: new FormControl('2'),
      }),
      new FormGroup({
        year: new FormControl('2022'),
        low: new FormControl('3'),
        high: new FormControl('4'),
      })
    ]),
  });
  keyPartnersCs = new FormGroup({
    advantage: new FormControl('', Validators.required),
    partner: new FormArray([
      new FormGroup({
        key: new FormControl('CIMMYT'),
        description: new FormControl('Lorem ipsum dolor sit amet, consectetur adipiscing elit'),
      }),
      new FormGroup({
        key: new FormControl('ICRAF'),
        description: new FormControl('Lorem ipsum dolor sit amet, consectetur adipiscing elit'),
      })
    ]),
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

  impactAreas = [
    {
      id: 1,
      name: "Nutrition, health & food security",
      indicators: [
        {
          id: 1.1,
          name: "#people benefiting from relevant CGIAR innovations"
        },
        {
          id: 1.2,
          name: "#people meeting minimum dietary energy requirements"
        },
        {
          id: 1.3,
          name: "#people meeting minimum micronutrient requirements"
        },
        {
          id: 1.4,
          name: "#cases communicable and noncommunicable diseases"
        }
      ]
    },
    {
      id: 2,
      name: "Poverty reduction, livelihoods & jobs",
      indicators: [
        {
          id: 2.1,
          name: "#people benefiting from relevant CGIAR innovations"
        },
        {
          id: 2.2,
          name: "#people assisted to exit poverty"
        }
      ]
    },
    {
      id: 3,
      name: "Gender equality, youth & social inclusion",
      indicators: [
        {
          id: 3.1,
          name: "#women’s empowerment and inclusion in the agricultural sector"
        },
        {
          id: 3.2,
          name: "#women benefiting from relevant CGIAR innovations"
        },
        {
          id: 3.3,
          name: "##youth benefiting fromrelevant CGIAR innovations"
        },
        {
          id: 3.4,
          name: "#women assisted to exit poverty"
        }
      ]
    },
    {
      id: 4,
      name: "Climate adaptation & mitigation",
      indicators: [
        {
          id: 4.1,
          name: "#tonnes CO2 equivalent emissions"
        },
        {
          id: 4.2,
          name: "#plans with evidence of implementation"
        },
        {
          id: 4.3,
          name: "#climate adaptation investments"
        },
        {
          id: 4.4,
          name: "#people benefiting from climate-adapted innovations"
        }
      ]
    },
    {
      id: 5,
      name: "Environmental health & biodiversity",
      indicators: [
        {
          id: 5.1,
          name: "#ha under improved management"
        },
        {
          id: 5.2,
          name: "#km3 consumptive water use"
        },
        {
          id: 5.3,
          name: "#ha deforestation"
        },
        {
          id: 5.4,
          name: "#Tg nitrogen application"
        },
        {
          id: 5.5,
          name: "#plant genetic accessions available and safely duplicated"
        }
      ]
    },
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

  // removeRangeProjection(range: any) {
  //   this.ranges.forEach((value, index) => {
  //     if (value.id == range.id) this.ranges.splice(index, 1);
  //   });
  // }

  removeRangeProjection(i) {
    this.range.removeAt(i);
  }

  range = this.projectionBenefitsRangeCs.get("range") as FormArray;

  addRange() {
    const control = new FormGroup({
      year: new FormControl(''),
      low: new FormControl(''),
      high: new FormControl(''),
    });
    this.range.push(control);
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

  saveKeyPartners(): void {
    console.log('formulario guardado', this.keyPartnersCs);
  }

  submitForm(): void {
    console.log('formulario sometido', this.generalInformationFormCs);
  }

  saveIndicators(): void {
    console.log('formulario guardado', this.projectionBenefitsRangeCs);
  }
}
