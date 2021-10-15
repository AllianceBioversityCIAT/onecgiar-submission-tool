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
  button_changing = [
    {
      name:'Scaling',
      id: 1
    },    
    {
      name:'Demanding',
      id: 2
    },
    {
      name:'Innovation',
      id: 3
    }
  ]

  constructor(
    public _initiativesService : InitiativesService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // console.log(this.institutions);
    // console.log(this.institutionsTypes);
    // console.log("savedList");
    // console.log(this.savedList);
    // console.log("institutionsTypesSavedList");
    // console.log(this.institutionsTypesSavedList);
    // console.log("institutionsTypesDisableList");
    // console.log(this.institutionsTypesDisableList);
    this.mapInstitutionsTypes();
    // console.log(this.institutions);
    this.institutions.map(item=>{
      // item.type_id = 1000;
      item.id = null;
      item.tag_id = '0,0,0';
    })
    // this.openDialog()
  }

  getInstitutionsTypesDisableList(){
    // console.log("change");
    let institutionsTypesDisableList=[];
    // console.log(this.savedList);
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
    // console.log(this.institutionsTypes);
    this.institutionsTypes.map(item=>{
      item.institutionType = item.name;
      // item.
      // impact_strategies_id
      // institutionType
      // institutionTypeId
    })
    // console.log(this.institutionsTypes);
  }

  showDialog() {
      this.display = true;
  }

  getActiveTag(item,i){
    if (item.code) {
      if (String(item.tag_id).length == 1) {
        let localValue = item.tag_id;
        item.tag_id = '0,0,0';
        let localArray = item.tag_id.split(',')
        localArray[Number(localValue)-1] = localValue;
        item.tag_id = localArray.join(',');
      }

      if (item.tag_id.split(',')[i]!='0') {
        return true;
      }else{
        return false;
      }
    }

  }

  changeTagId(item,value){

    if (!item.tag_id) {
      item.tag_id = '0,0,0'
    }

    if (String(item.tag_id).length == 1) {
      let localValue = item.tag_id;
      item.tag_id = '0,0,0';
      let localArray = item.tag_id.split(',')
      localArray[Number(localValue)-1] = localValue;
      item.tag_id = localArray.join(',');
    }


       let array = item.tag_id.split(',')
      if (array[Number(value)-1] == value) {
        array[Number(value)-1] = 0;
      }else{
        array[Number(value)-1] = value;
      }
      
      item.tag_id = array.join(',');
    
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
