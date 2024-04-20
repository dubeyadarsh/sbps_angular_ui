import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
import { apiURL } from 'src/app/constants/constant';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-fee-overview',
  templateUrl: './fee-overview.component.html',
  styleUrls: ['./fee-overview.component.css']
})

export class FeeOverviewComponent {
  feeData:any;
  admissionFee:number=0;
  totalVehFee:number=0;
  totalMonthFee:number=0;
  MiscFee:number=0;
  OtherFee:number=0;
  feeMaster:any;
  totalFee:number=0;
  token: string;
  selMonths :String='';
  selVehMonths :String='';
  monthFeeCount:number=0;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<FeeOverviewComponent>,private http: HttpClient,private dialogService: DialogService) {
    this.feeData=data.data;
    this.token = localStorage.getItem('token') || '';
    this.feeMaster=data.data.feemaster.data[0];
  }
  ngOnInit(): void {
 
    if(!isNullOrUndefined(this.feeData.admission_fee)){
      this.admissionFee=this.feeMaster.admission_fee;
      this.OtherFee=this.feeMaster.other_fee;
      this.MiscFee=this.feeMaster.misc_fee;
    }
    this.totalMonthFee= (this.feeData.months.length*this.feeMaster.monthly_fee);
    this.totalVehFee=  (this.feeData.veh_fee.length*this.feeMaster.monthly_veh_fee);

    this.feeData.months.forEach((element: any)=>{
      if( this.selMonths == '')  this.selMonths+= element.value;
      else this.selMonths+= ' , ' +element.value;

      this.monthFeeCount++;
    })
    this.feeData.veh_fee.forEach((element: any)=>{
      if( this.selVehMonths == '')  this.selVehMonths+= element.value;
      else this.selVehMonths+= ' , ' +element.value;
    })
    try{
    const sum=this.admissionFee + this.MiscFee+ this.OtherFee + this.totalMonthFee+ this.totalVehFee;
    this.totalFee=sum;
    }catch(e){

    }
  }
  close():void{
    this.dialogRef.close();
  }
  saveFee():void{
    const apiUrl = `${apiURL}/fee/saveFee`;

    // Prepare headers with the token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.token // Include the token in the 'Authorization' header
    });

    // , monthsData , vehMonthData: ,classid,stdid,class
   let reqData={admissionFee:this.admissionFee, miscFee:this.MiscFee , otherFee: this.OtherFee, totalMonthFee:this.totalMonthFee
    , totalVehFee: this.totalVehFee, totalFee:this.totalFee,monthsData:this.selMonths, vehMonthsData:this.selVehMonths,sId:this.feeData.otherData.s_id,
    classId:this.feeData.otherData.class_id,std:this.feeData.otherData.selClass.label,stdTable:this.feeData.otherData.selClass.value,sname:this.feeData.otherData.name,monthFeeCount:this.monthFeeCount}
    console.log("fm",reqData,this.feeData)
    this.http.post(apiUrl, reqData, { headers, responseType: 'blob' })
      .subscribe(
        (response:any) => {
          this.dialogRef.close();
          const blob = new Blob([response], { type: 'application/pdf' });
          const downloadURL = window.URL.createObjectURL(blob);

          // Create an anchor element and simulate a click to trigger the download
          const link = document.createElement('a');
          link.href = downloadURL;
          link.download = `payslip.pdf`;
          link.click();
    
          // Cleanup by revoking the URL object
          window.URL.revokeObjectURL(downloadURL);
          this.data.Feedialog.close();
         },
        (error:any) => {
          this.dialogService.openDialog("Error","An error occurred while Generating fee details..try again...");
        }
      );
  }
}
