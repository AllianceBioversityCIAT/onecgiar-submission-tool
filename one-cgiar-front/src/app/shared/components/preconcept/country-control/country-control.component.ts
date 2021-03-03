import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-country-control',
  templateUrl: './country-control.component.html',
  styleUrls: ['./country-control.component.scss']
})
export class CountryControlComponent implements OnInit {

  visible = true;
  selectableCountry = true;
  removableCountry = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  countryCtrl = new FormControl();
  filteredCountries: Observable<string[]>;
  countries: string[] = [];
  allCountries: string[] = ['Colombia', 'Congo', 'Mexico', 'Argentina', 'Australia'];

  @ViewChild('countryInput') countryInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(public _auth: AuthService) {
    this.filteredCountries = this.countryCtrl.valueChanges.pipe(
      startWith(null),
      map((country: string | null) => country ? this._filterCountry(country) : this.allCountries.slice()));
  }

  ngOnInit(): void {
  }

  addCountry(event: MatChipInputEvent): void {
    const inputC = event.input;
    const valueC = event.value;

    // Add our country
    if ((valueC || '').trim()) {
      this.countries.push(valueC.trim());
    }

    // Reset the input value
    if (inputC) {
      inputC.value = '';
    }

    this.countryCtrl.setValue(null);
  }

  removeCountry(country: string): void {
    const indexC = this.countries.indexOf(country);

    if (indexC >= 0) {
      this.countries.splice(indexC, 1);
    }
  }

  selectedCountry(event: MatAutocompleteSelectedEvent): void {
    this.countries.push(event.option.viewValue);
    this.countryInput.nativeElement.value = '';
    this.countryCtrl.setValue(null);
  }

  private _filterCountry(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCountries.filter(country => country.toLowerCase().indexOf(filterValue) === 0);
  }

}
