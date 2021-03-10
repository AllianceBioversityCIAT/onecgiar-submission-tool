import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StagesMenuService {

  menuObj: Record<string, any> = {
    pre_concept: {},
    concept: {
      general_information: 'INVALID',
      narratives: 'INVALID',
      initial_theory_of_change: 'INVALID',
      work_packages: 'INVALID',
      key_partners: 'INVALID',
    },
    full_proposal: {}
  }

  menu: BehaviorSubject<{}>;

  constructor() {
    this.menu = new BehaviorSubject(this.menuObj)
  }


  conceptFormStatus(concept: {}) {
    this.menuObj.concept = concept;
    this.menu.next(this.menuObj)
  }


}
