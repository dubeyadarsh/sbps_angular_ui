import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditFormComponent } from '../components/edit-form/edit-form.component';
import { PayFeeComponent } from '../components/pay-fee/pay-fee.component';

@Injectable({
  providedIn: 'root',
})
export class EditDialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(data:Object): void {
    this.dialog.open(EditFormComponent, {
      width: '75%', // Adjust the width as needed
      data: {data},
    });
  }
  openFeeDialog(data:Object):void{
    this.dialog.open(PayFeeComponent, {
      width: '75%', // Adjust the width as needed
      data: {data},
    });
  }
}
