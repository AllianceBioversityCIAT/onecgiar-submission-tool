import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-table-b',
  templateUrl: './table-b.component.html',
  styleUrls: ['./table-b.component.scss']
})
export class TableBComponent implements OnInit {

  constructor( private _initiativesService:InitiativesService) { }

  ngOnInit(): void {
    this._initiativesService.getMeliaResultFramework(this._initiativesService.initiative.id).pipe(map(res=>res.response.melia.resultFramework.tableB)).subscribe(resp=>{
      console.log(resp);
    })
  }

}
