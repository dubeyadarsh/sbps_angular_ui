// shared.service.ts
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HalfYearlyPdfService {
  buttonClicked = new EventEmitter<void>();

  constructor() {}

  generatePdf() {
    console.log('Adarsh');
    this.buttonClicked.emit();
  }

}
