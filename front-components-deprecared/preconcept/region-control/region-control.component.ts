import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-region-control',
  templateUrl: './region-control.component.html',
  styleUrls: ['./region-control.component.scss']
})
export class RegionControlComponent implements OnInit {

  visible = true;
  selectableRegion = true;
  removableRegion = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  regionCtrl = new FormControl();
  filteredRegions: Observable<string[]>;
  regions: string[] = [];
  allRegions: string[] = ['Latin America & the Caribbean', 'Eastern Africa'];

  @ViewChild('regionInput') regionInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(public _auth: AuthService) {
    this.filteredRegions = this.regionCtrl.valueChanges.pipe(
      startWith(null),
      map((region: string | null) => region ? this._filterRegion(region) : this.allRegions.slice()));
  }

  ngOnInit(): void {
  }

  onSave(generalInformationForm): void {
    console.log("GUARDANDO", generalInformationForm.value);
  }

  addRegion(event: MatChipInputEvent): void {
    const inputR = event.input;
    const valueR = event.value;

    // Add our region
    if ((valueR || '').trim()) {
      this.regions.push(valueR.trim());
    }

    // Reset the input value
    if (inputR) {
      inputR.value = '';
    }

    this.regionCtrl.setValue(null);
  }

  removeRegion(region: string): void {
    const indexR = this.regions.indexOf(region);

    if (indexR >= 0) {
      this.regions.splice(indexR, 1);
    }
  }

  selectedRegion(event: MatAutocompleteSelectedEvent): void {
    this.regions.push(event.option.viewValue);
    this.regionInput.nativeElement.value = '';
    this.regionCtrl.setValue(null);
  }

  private _filterRegion(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allRegions.filter(region => region.toLowerCase().indexOf(filterValue) === 0);
  }

}
