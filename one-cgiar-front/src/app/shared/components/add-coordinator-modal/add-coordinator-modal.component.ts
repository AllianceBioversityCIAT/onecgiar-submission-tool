import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface User {
  name: string;
  email: string;
}

@Component({
  selector: 'app-add-coordinator-modal',
  templateUrl: './add-coordinator-modal.component.html',
  styleUrls: ['./add-coordinator-modal.component.scss']
})
export class AddCoordinatorModalComponent implements OnInit {

  constructor() { }

  myControl = new FormControl();
  options: User[] = [
    { name: 'Manuel Almanzar', email: 'M.R.Almanzar@cgiar.org' },
    { name: 'Yecksin Zuñiga', email: 'Y.Zuniga@cgiar.org' },
    { name: 'Jaime Duque', email: 'J.Duque@cgiar.org' }
  ];
  filteredOptions: Observable<User[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
