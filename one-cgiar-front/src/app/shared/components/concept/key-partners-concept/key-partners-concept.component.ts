import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RequestsService } from '@app/shared/services/requests.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPartnersModalComponent } from '../add-partners-modal/add-partners-modal.component';
import { InitiativesService } from '../../../services/initiatives.service';
import { ActivatedRoute } from '@angular/router';

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
  
  // keyPartners:keyPartner[] = []
  wordCount: any;

  @ViewChild("text") text: ElementRef;
  words: any;
  wordCounter() {
    this.wordCount = this.text ? this.text.nativeElement.value.split(/\s+/) : 0;
    this.words = this.wordCount ? this.wordCount.length : 0;
  }

  constructor(
    public _requests: RequestsService, 
    public dialog: MatDialog,
    public _initiativesSvc: InitiativesService,
    public activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.getPartnershipByInitiativeId();
  }

  getPartnershipByInitiativeId(){

    this.activatedRoute.params.subscribe(resp => {
      this.partnership.initvStgId = resp.id;
      this._initiativesSvc.getPartnershipByInitiativeId(resp.id).subscribe(resp=>{
        this.partnership.key_partners = resp.response.keyPartners;
        console.log('%cpartnerships','background: #222; color: #ffff00');
        console.log(resp);
        console.log(resp.response.keyPartners);
       
        if(resp.response.partnership){
          this.partnership.id = resp.response.partnership.id
          console.log('%cViene partners ships blueeeee','background: #222; color: #84c3fd');
        }else{
          console.log('%cno Viene partners ships reeeeed','background: #222; color: #fd8484');
        }
  
      })
     });



  }

  savePartnership(){
    console.log(this.partnership);
    this._initiativesSvc.createPartnership(this.partnership).subscribe(resp=>{
      console.log(resp);
      this.getPartnershipByInitiativeId();
    })
  }

  openDialog(i,data) {
    const dialogRef = this.dialog.open(AddPartnersModalComponent, 
      { panelClass: 'custom-dialog-container',
      data
       });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('%cresult','background: #222; color: #ffff00');
        console.log(result);
        this.editKeyPartner(i,result);
      }

    });
  }

  removeKeyPartner(index){
    this.partnership.key_partners.splice(index,1);
  }
  addNewKeyPartner(){
    let object:keyPartner={
    key_partner_id: 1,
    key_partner_name: "New",
    description: "New",
    active: true
  }
    this.partnership.key_partners.push(object)
  }
  editKeyPartner(index,data){
    this.partnership.key_partners[index].key_partner_name = data.keyPartner;
    this.partnership.key_partners[index].description = data.description;
  }

}
