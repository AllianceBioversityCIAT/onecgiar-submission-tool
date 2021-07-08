import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RequestsService } from '@app/shared/services/requests.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPartnersModalComponent } from '../add-partners-modal/add-partners-modal.component';
import { InitiativesService } from '../../../services/initiatives.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StagesMenuService } from '@app/shared/services/stages-menu.service';
import { InteractionsService } from '@app/shared/services/interactions.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataControlService } from '../../../services/data-control.service';
import { map } from 'rxjs/operators';

export interface keyPartner {
  key_partner_id: number,
  id?:number,
  key_partner_name: string,
  description: string,
  active: boolean
}
export interface partnership {
  initvStgId?: number;
  id?:number;
  comparative_advantage: string;
  key_partners:keyPartner[];
}
@Component({
  selector: 'app-key-partners-concept',
  templateUrl: './key-partners-concept.component.html',
  styleUrls: ['./key-partners-concept.component.scss']
})
export class KeyPartnersConceptComponent implements OnInit {
  partnership:partnership=
    {
      comparative_advantage: "This is a test for a compartive comparative_advantage, UPDATED",
      key_partners:[]
    };
  partnershipForm: FormGroup;
  // keyPartners:keyPartner[] = []
  wordCount: any;
  showForm  = false;
  showTable = false; 

  @ViewChild("text") text: ElementRef;
  words: any;
  wordCounter() {
    this.wordCount = this.text ? this.text.nativeElement.value.split(/\s+/) : 0;
    this.words = this.wordCount ? this.wordCount.length : 0;
  }

  constructor(
    public _requests: RequestsService, 
    public dialog: MatDialog,
    public _initiativesService: InitiativesService,
    public stgMenuSvc: StagesMenuService,
    private interactionsService:InteractionsService,
    private spinnerService: NgxSpinnerService,
    private _dataControlService:DataControlService,
    private _StagesMenuService:StagesMenuService
    ) {
      this.partnershipForm = new FormGroup({
        comparativeAdvantage: new FormControl(null, Validators.required),
      });
     }

  ngOnInit(): void {
    this.getPartnershipByInitiativeId();
  }


  getPartnershipByInitiativeId(){
      this.spinnerService.show("spinnerService");
      this.partnership.initvStgId = Number(this._initiativesService.initvStgId);
      this._initiativesService.getPartnershipByInitiativeId(this._initiativesService.initvStgId).subscribe((resp:any)=>{
        this.spinnerService.hide("spinnerService");

        // console.log(resp);
        if (resp.response.partnership?.comparative_advantage) {
          this.partnershipForm.controls['comparativeAdvantage'].setValue(resp.response.partnership.comparative_advantage);
        }

        this.partnership.key_partners = resp.response.keyPartners;
        // console.log(this.partnership.key_partners);
        this.showTable = this.partnership.key_partners.length ? true : false;
        // console.log(this.partnership.key_partners.length);
        if(resp.response?.partnership){
          this.partnership.id = resp.response.partnership.id
        }
        this.showForm = true;
      },
      err=>{
        this.spinnerService.hide("spinnerService");
        this.showForm = true;
      })

    
  }

  savePartnership(){
    // console.log('%csavePartnership','background: #222; color: #ffff00');
    this.partnership.comparative_advantage = this.partnershipForm.value.comparativeAdvantage;
    // console.log(this.partnership);
    // console.log(   this.partnership);
    this._initiativesService.createPartnership(this.partnership).subscribe(resp=>{
      // console.log(resp);
      this.interactionsService.successMessage('Key partners information has been saved')
      this.getPartnershipByInitiativeId();
      this._initiativesService.getGreenCheckStatus(this._initiativesService.initvStgId).subscribe(resp=>{
        this._StagesMenuService.validateAllSectionsStatus('concept',resp.response?.validatedSections,this._initiativesService.initvStgId);
      })
    })
  }

  openDialog(add,data?,i?) {
    this.partnership.key_partners.forEach((resp:any) => {
      resp.code = resp.key_partner_id;
    });
    data.toDisableList = this.partnership.key_partners;
    
    // if(add){
      
    //   data.key_partner_id = -1;
    //   data.key_partner_name = '';
    //   data.description = '';
    //   data.active = true;
    // }
    const dialogRef = this.dialog.open(AddPartnersModalComponent, 
      { 
        width: '100%',
        // height:'90%',
        panelClass: 'dialog-no-padding-no-scroll',
        data
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result && !add) {
        // console.log('%cresult','background: #222; color: #ffff00');
        // console.log(result);
        this.editKeyPartner(i,result);
      }else if (result && add){
        let object:keyPartner={
          key_partner_id: result.key_partner_id,
          key_partner_name: result.key_partner_name,
          description: result.description,
          active: true
        }
        // console.log('%cResult close modal','background: #222; color: #ffff00');
        // console.log(object);
          this.partnership.key_partners.push(object)
          // console.log(this.partnership.key_partners);
      }
      this.showTable = this.partnership.key_partners.length ? true : false;
    });
  }

  // convertToDisableList(){
  //   let resultList = []
  //   for (const iterator of this.partnership.key_partners) {
  //     if (iterator.active) {
  //       resultList.push(iterator.key_partner_id)
  //     }
  //     // console.log(iterator);
  //   }
  //   return resultList;
  // }

  removeKeyPartner(index){
    this.partnership.key_partners[index].active=false;
    // console.log(this.partnership);
    // this.partnership.key_partners.splice(index,1);
  }
  addNewKeyPartner(){
    let object:keyPartner={
    key_partner_id: -1,
    key_partner_name: "New",
    description: "New",
    active: true
  }
    this.partnership.key_partners.push(object);
  }
  editKeyPartner(index,data){
    this.partnership.key_partners[index].key_partner_id = data.key_partner_id;
    this.partnership.key_partners[index].description = data.description;
    this.partnership.key_partners[index].key_partner_name = data.key_partner_name;
  }

}
