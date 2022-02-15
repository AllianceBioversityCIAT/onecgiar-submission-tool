import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-key-partners',
  templateUrl: './key-partners.component.html',
  styleUrls: ['./key-partners.component.scss']
})
export class KeyPartnersComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  partnerCtrl = new FormControl();
  filteredPartners: Observable<string[]>;
  partners: string[] = [];
  allPartners: string[] = ['IRRI', 'IITA', 'CIAT', 'CIMMYT', 'ICRAF'];

  @ViewChild('partnerInput') partnerInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(public _auth:AuthService) {
    this.filteredPartners = this.partnerCtrl.valueChanges.pipe(
        startWith(null),
        map((partner: string | null) => partner ? this._filter(partner) : this.allPartners.slice()));
  }

  ngOnInit(): void {
  }

  onSave(narrativesForm): void {
    console.log("GUARDANDO",narrativesForm.value);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our partner
    if ((value || '').trim()) {
      this.partners.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.partnerCtrl.setValue(null);
  }

  remove(partner: string): void {
    const index = this.partners.indexOf(partner);

    if (index >= 0) {
      this.partners.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.partners.push(event.option.viewValue);
    this.partnerInput.nativeElement.value = '';
    this.partnerCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allPartners.filter(partner => partner.toLowerCase().indexOf(filterValue) === 0);
  }
}