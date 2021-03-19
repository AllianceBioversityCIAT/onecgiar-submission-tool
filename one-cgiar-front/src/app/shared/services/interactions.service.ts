import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {
  collapseHeader = false;
  showHeader = true;
  constructor() { }
}
