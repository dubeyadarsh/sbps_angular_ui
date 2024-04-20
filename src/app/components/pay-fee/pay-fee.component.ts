import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog.service';
import {months} from '../../constants/constant'
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
import { IDropdownSettings} from 'ng-multiselect-dropdown';
import { isEmpty } from 'rxjs';
import { apiURL } from '../../constants/constant';
@Component({
  selector: 'app-pay-fee',
  templateUrl: './pay-fee.component.html',
  styleUrls: ['./pay-fee.component.css']
})
export class PayFeeComponent {
  [x: string]: any;
  token: string;
  isChecked: any;
  months_list:any=[];
  veh_months_list:any=[];
  selectedData:any;
  isAFBoxOpen:boolean=true;
  checkboxStates: boolean[] = new Array(this.months_list.length).fill(false);
  selectedVehItems:any = [];
  
  constructor(
    public dialogRef: MatDialogRef<PayFeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private dialogService: DialogService,private http: HttpClient) {
      this.token = localStorage.getItem('token') || '';
      if(!isNullOrUndefined(data)) {
      this.selectedData=data.data;
      this.months_list=months.filter((item,index)=> { return (index > data.data.mfc-1)});
       }
  }
  
  dropdownList:any = [];
  dropdownSettings:IDropdownSettings={};
  ngOnInit() {
    var veh_arr=this.selectedData.vfc;
    veh_arr= isNullOrUndefined(veh_arr)?[]:veh_arr.split(",");
    this.dropdownList= months.filter(month => !veh_arr.includes(month.value));

    // this.dropdownList = this.months_list=months.filter((item,index)=> { return (item.value != veh_arr.forEach)});

    this.dropdownSettings = {
      idField: 'id',
      textField: 'value',
    };
    console.log(this.selectedData.af == 1 );
    this.isAFBoxOpen=this.selectedData.af == 1 ? false:true;
  }
  deselectVehMonth(selectedVeh: any) {
    this.selectedVehItems = this.selectedVehItems.filter((item: any) => item.id !== selectedVeh.id);
  }
  selectAllVehItems() {
    // Implement logic to select all items
    this.selectedVehItems=this.months_list;
  }
  
  deselectAllVehItems() {
    // Implement logic to deselect all items
    this.selectedVehItems=[];
  }
   seeOverview(){
    console.log("isAFBoxOpen",!this.isAFBoxOpen);
    if(this.isAFBoxOpen && !this.isChecked){
      this.dialogService.openDialog("Warning","Please select  Admission fee box.");
      return;
    }
   
    var selectedMonth: any[]=[];
    this.checkboxStates.forEach((item,index)=>{
      if(item) selectedMonth.push(this.months_list[index]);
    })
    if( selectedMonth.length==0 && this.selectedVehItems.length ==0){
      this.dialogService.openDialog("Warning","Please select any Monthly fee or Vehicle Monthly fee box.");
      return;
    }
    this.getFeeMasterData().then((result) => {
      var obj={admission_fee:this.isChecked,veh_fee:this.selectedVehItems,months:selectedMonth,feemaster:result,otherData:this.selectedData}
      this.dialogService.openOverviewDialog(obj,this.dialogRef);
    }).catch((error) => {
      console.error(error);
    });
   
  }
 
  getFeeMasterData(): Promise<Object> {
    const std = this.selectedData.selClass.value;
    const url = `${apiURL}/fee/getFeeMaster`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.token // Include the token in the 'Authorization' header
    });
  
    return this.http.post(url, { std }, { headers }).toPromise()
      .then(res => {
        return res ? res : {}; // Return response or an empty object if null or undefined
      })
      .catch(err => {
        console.error(err);
        this.dialogService.openDialog("Error", "Unable to process the request..");
        return {}; // Return an empty object in case of an error
      });
  }
  
}
