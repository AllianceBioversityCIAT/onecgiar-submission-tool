import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { InitiativesService } from '@shared/services/initiatives.service';
import { ActivatedRoute } from '@angular/router';
import { StagesMenuService } from '@app/shared/services/stages-menu.service';
import { InteractionsService } from '@app/shared/services/interactions.service';

@Component({
  selector: 'app-stages-menu',
  templateUrl: './stages-menu.component.html',
  styleUrls: ['./stages-menu.component.scss']
})
export class StagesMenuComponent implements OnInit {

  constructor(
    public activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    public initiativesSvc: InitiativesService,
    public stageMenu: StagesMenuService,
    public _interactionsService: InteractionsService,

  ) { }

  openDialog() {
  }

  ngOnInit(): void {
    this._interactionsService.collapseHeader=true;
    this.activatedRoute.params.subscribe(resp => {
      this.stageMenu.getFormStageStatus(this.initiativesSvc.initvStgId);
    });
  }

  onSave(generalInformationForm): void {
    console.log("GUARDANDO", generalInformationForm.value);
  }


  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
