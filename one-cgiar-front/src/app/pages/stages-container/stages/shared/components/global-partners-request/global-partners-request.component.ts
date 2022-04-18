import { Component, OnInit, Input } from '@angular/core';
import { InitiativesService } from '../../../../../../shared/services/initiatives.service';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { PartnersRequestComponent } from '../../../../../../shared/components/partners-request/partners-request.component';
@Component({
  selector: 'app-global-partners-request',
  templateUrl: './global-partners-request.component.html',
  styleUrls: ['./global-partners-request.component.scss']
})
export class GlobalPartnersRequestComponent implements OnInit {
  @Input() institutions:any;
  @Input() savedList:any;
  @Input() institutionsTypes:any;
  @Input() institutionsTypesSavedList:any;
  @Input() institutionsTypesDisableList:any;
  display: boolean = false;
  partner_request_text:string = `<a style="cursor:pointer" target="_blank" class="partner_request_text">If you don't find the partner you are looking for, request to have it added to the list.</a>`;
  button_changing = [
    {
      name:'Scaling',
      id: 1,
      attributeName: 'scaling'
    },    
    {
      name:'Demanding',
      id: 2,
      attributeName: 'demand'
    },
    {
      name:'Innovation',
      id: 3,
      attributeName: 'innovation'
    }
  ]

  constructor(
    public _initiativesService : InitiativesService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.mapInstitutionsTypes();
    this.institutions.map(item=>{
      item.id = null;
      item.tag_id = '0,0,0';
    })
  }

  getInstitutionsTypesDisableList(){
    let institutionsTypesDisableList=[];
    this.savedList.map(item=>{
    if (item.code && item.active !== false) {
      let body = {
        name:item.institutionType,
        code:item.institutionTypeId,
        id:item.id
      }
      institutionsTypesDisableList.push(body);
    }
  });
  return institutionsTypesDisableList;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PartnersRequestComponent, {
      width: '100%',
      height: '90%',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("");
    });
  }

  mapInstitutionsTypes(){
    this.institutionsTypes.map(item=>{
      item.institutionType = item.name;
    })
  }

  showDialog() {
      this.display = true;
  }

  onSelectTag(item,attributeName){
    if (this._initiativesService.initiative.readonly) return;
    if ( item.hasOwnProperty(attributeName)) item[attributeName] = true;
    item[attributeName] = !item[attributeName] 
  }

  countDuplicates(originalArray) {
    var newArray = [];
    var lookupObject  = {};

    // console.log(this.institutionsTypesSavedList);
    // savedLists
    for(var i in originalArray) {
      
      if (originalArray[i].active !== false) {
        if (!(lookupObject[originalArray[i]['institutionType']])) lookupObject[originalArray[i]['institutionType']] = {cont:0};
        lookupObject[originalArray[i]['institutionType']].institutionType = originalArray[i].institutionType;
        lookupObject[originalArray[i]['institutionType']].name = originalArray[i].institutionType;
        // lookupObject[originalArray[i][prop]].id = originalArray[i].id;
        // lookupObject[originalArray[i][prop]].institutionTypeId = originalArray[i].institutionTypeId
        if (originalArray[i].code) {
          lookupObject[originalArray[i]['institutionType']].cont++;
        }
      }
      
    }

    // localList int types
    for(var i in this.institutionsTypesSavedList) {
      if (this.institutionsTypesSavedList[i].active !== false) {

        if (!lookupObject[this.institutionsTypesSavedList[i]['name']]?.cont) {
          lookupObject[this.institutionsTypesSavedList[i]['name']] = {cont:0,name:this.institutionsTypesSavedList[i]?.name, code:this.institutionsTypesSavedList[i]?.code};
        }
        lookupObject[this.institutionsTypesSavedList[i]['name']].manual = true;
      }
      
    }


    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
    // console.log(lookupObject);
     return newArray;
     
}

  onSelectOption(option:any){
    // console.log(this.savedList);
    console.log(option);
    // encontrar en lista de guardados la opcion seleccionada
    let itemFinded:any = this.savedList.find((savedItem:any)=>savedItem.code == option.code);
    let itemFindedIndex = this.savedList.findIndex((savedItem:any)=>savedItem.code== option.code);
    // console.log(itemFinded);
    // toggle de seleccion (quitar / poner)
    // Eliminado logico o eliminar de elementos de un array que no están en la bd
    option.selected = false;
    this.institutions.find((savedItem:any)=>savedItem.code == option.code).selected = false;
    this.institutionsTypes.find((savedItem:any)=>savedItem.code == itemFinded.institutionTypeId).disabled = false
      //formas de borrar
      if (itemFinded) {
        // si tiene id de la bd pero de guardado
        if (itemFinded.id) {
          //borrado logico
          itemFinded.active = false;
        }else{
          //borrado de array
          this.savedList.splice(itemFindedIndex, 1)
        }
        
      }
    // console.log(option);
  }

  onDeleteInstitutionType(option){
    // console.log("_______________________________");
    // console.log(option);
    // console.log(this.institutionsTypesSavedList);
    let itemFinded:any = this.institutionsTypesSavedList.find((savedItem:any)=>savedItem.code == option.code);
    let itemFindedIndex = this.institutionsTypesSavedList.findIndex((savedItem:any)=>savedItem.code == option.code);
    option.selected = false;
    // console.log(itemFinded);
    // console.log(itemFindedIndex);
    // console.log(this.institutionsTypes);
    let finisd = this.institutionsTypes.find((savedItem:any)=>savedItem.code == option.code).selected = false;
    // console.log(finisd);

    if (itemFinded) {
      if (itemFinded.id) {
        itemFinded.active = false;
      }else{
        this.institutionsTypesSavedList.splice(itemFindedIndex, 1);
      }
    }

    // console.log(this.savedList);
    // console.log(this.institutionsTypesSavedList);

  }

}
