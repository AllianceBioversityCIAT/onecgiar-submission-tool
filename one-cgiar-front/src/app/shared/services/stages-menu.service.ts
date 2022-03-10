import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class StagesMenuService extends LocalStorageService {

  localStorageChanges$ = this.changes$;

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
    super();
    this.menu = new BehaviorSubject(this.menuObj)
  }
  
  setFormStageStatus(stage: string, section: string, status: string, initvStgId: string) {
    this.menuObj[stage][section] = status;
    this.set(initvStgId, this.menuObj);
  }

  validateAllSectionsStatus(stage,greenCheckStatus,initvStgId){
    let greenCheckStatusArray = Object.entries(greenCheckStatus);
    greenCheckStatusArray.forEach(greencheck=>{
      this.setFormStageStatus(stage, greencheck[0], greencheck[1]?'VALID':'INVALID', initvStgId )
    })
  }

  getFormStageStatus(initvStgId: string) {
    this.menuObj = this.get(initvStgId) || this.menuObj;
    this.menu.next(this.menuObj);
  }


}
