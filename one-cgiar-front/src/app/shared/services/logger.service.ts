import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }
  logError(message: string, stack: string) {
    console.log('LoggingService: ' + message);
    console.error('LoggingService Stack: ' + stack);
  }
  logAny(title: string, data: any) {
    console.log(title, data);
  }
}
