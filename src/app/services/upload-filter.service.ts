import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadDialogComponent } from '../components/upload-dialog/upload-dialog.component';

@Injectable({
  providedIn: 'root',
})

export class UploadFilterService {

  constructor(private dialog: MatDialog) { }

  openUploadFilterDialog(std:string): void {
    this.dialog.open(UploadDialogComponent, {
      data: {std:std},
    });
  }
}
