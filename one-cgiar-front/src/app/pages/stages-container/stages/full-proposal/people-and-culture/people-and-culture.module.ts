import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeopleAndCultureRoutingModule } from './people-and-culture-routing.module';
import { PeopleAndCultureComponent } from './people-and-culture.component';


@NgModule({
  declarations: [PeopleAndCultureComponent],
  imports: [
    CommonModule,
    PeopleAndCultureRoutingModule
  ]
})
export class PeopleAndCultureModule { }
