import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { FeeOverviewComponent } from '../components/fee-overview/fee-overview.component';
import { PayFeeComponent } from '../components/pay-fee/pay-fee.component';
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(title: string, message: string): void {
    this.dialog.open(DialogComponent, {
      width: '400px', // Adjust the width as needed
      data: { title, message },
    });
  }
  openOverviewDialog(data:object , Feedialog:MatDialogRef<PayFeeComponent>):void{
    this.dialog.open(FeeOverviewComponent, {
      width: '50%', // Adjust the width as needed
      data: {data,Feedialog},
    
    });
  }
}
