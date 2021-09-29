import { Component, OnInit, Input } from '@angular/core';
import { InitiativesService } from '../../../../../../shared/services/initiatives.service';
import { map } from 'rxjs/operators';
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
    public _initiativesService : InitiativesService
  ) { }

  ngOnInit(): void {
    this.mapInstitutionsTypes();
    // console.log(this.institutions);
    this.institutions.map(item=>{
      // item.type_id = 1000;
      item.id = null;
      item.tag_id = 0;
    })
  }

  mapInstitutionsTypes(){
    // console.log(this.institutions);
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

  changeTagId(item,value){
    item.tag_id = value;
  }

  countDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject  = {};

    for(var i in originalArray) {

      
      if (originalArray[i].active !== false) {
        if (!(lookupObject[originalArray[i][prop]])) lookupObject[originalArray[i][prop]] = {cont:0};
        lookupObject[originalArray[i][prop]].institutionType = originalArray[i].institutionType;
        lookupObject[originalArray[i][prop]].cont++;
      }
      

    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
}

  onSelectOption(option:any){
    // console.log(this.savedList);
    // console.log(option);
    // encontrar en lista de guardados la opcion seleccionada
    let itemFinded:any = this.savedList.find((savedItem:any)=>savedItem.code == option.code);
    let itemFindedIndex = this.savedList.findIndex((savedItem:any)=>savedItem.code== option.code);
    // console.log(itemFinded);
    // toggle de seleccion (quitar / poner)
    // Eliminado logico o eliminar de elementos de un array que no están en la bd
    option.selected = false;
    this.institutions.find((savedItem:any)=>savedItem.code == option.code).selected = false;
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

}
