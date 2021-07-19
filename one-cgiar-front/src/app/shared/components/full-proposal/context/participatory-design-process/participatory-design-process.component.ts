import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InitiativesService } from '../../../../services/initiatives.service';
import { FullProposalService } from '../../../../services/full-proposal.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { InteractionsService } from '../../../../services/interactions.service';

@Component({
  selector: 'app-participatory-design-process',
  templateUrl: './participatory-design-process.component.html',
  styleUrls: ['./participatory-design-process.component.scss']
})
export class ParticipatoryDesignProcessComponent implements OnInit {
  contextForm: FormGroup;
  showform = false;
  constructor(
    public _initiativesService:InitiativesService,
    public _fullProposalService:FullProposalService,
    private spinnerService: NgxSpinnerService,
    private _interactionsService:InteractionsService
  ) { 
    this.contextForm = new FormGroup({
      participatory_design: new FormControl(null),
      contextId:new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.getContext();
    console.log(this.contextForm.value);
  }

  upserInfo(){
    this._fullProposalService.patchContext(this._initiativesService.initiative.id,this.contextForm.value).subscribe(resp=>{
      console.log(resp);
      this.contextForm.valid?
      this._interactionsService.successMessage('Comparative advantage has been saved'):
      this._interactionsService.warningMessage('Comparative advantage has been saved, but there are incomplete fields')
    })
  }

  getContext(){
    this.spinnerService.show('spinner');
    this._fullProposalService.getContext(this._initiativesService.initiative.id).subscribe(resp=>{
      console.log(resp);
      this.contextForm.controls['participatory_design'].setValue(resp?.response?.context?.participatory_design);
      this.contextForm.controls['contextId'].setValue(resp?.response?.context?.id);
      this.showform = true;
      this.spinnerService.hide('spinner');
    },err=>{
      console.log("errorerekkasssssssssssssssdasda");
    })
  }

}
