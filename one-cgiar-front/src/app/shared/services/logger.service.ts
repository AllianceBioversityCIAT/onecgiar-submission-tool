import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }
  logError(message: string, stack: string) {
    console.log('LoggingService: ' + message);
  }
}
