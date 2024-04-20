import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Observable, Subject, catchError, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
import { EditDialogService } from 'src/app/services/editDialog.service';
import { apiURL, months,ayCurrent } from 'src/app/constants/constant';
@Component({
  selector: 'app-fee-item',
  templateUrl: './fee-item.component.html',
  styleUrls: ['./fee-item.component.css']
})
export class FeeItemComponent {
  @ViewChild('myForm') myForm!: NgForm;
  showFilterOptions = false;
  selectedClass:any;
  suggestions: any[] = [];
  searchControl = new FormControl();
  selectedSuggestion:any;
  classOptions=[
    { label: 'PG', value: 'classPG' },
    { label: 'LKG', value: 'classLKG' },
    { label: 'UKG', value: 'classUKG' },
    { label: '1st', value: 'class1' },
    { label: '2nd', value: 'class2' },
    { label: '3rd', value: 'class3' },
    { label: '4th', value: 'class4' },
    { label: '5th', value: 'class5' },
    { label: '6th', value: 'class6' },
    { label: '7th', value: 'class7' },
    { label: '8th', value: 'class8' },
    { label: '9th', value: 'class9' },
    { label: '10th', value: 'class10' }
  ];

  formData: any = {}; 
  router: any;
  isNotFeeDetails: boolean =true;
  paidMonthlyDetails:String[]=[];
  paidVehMonthlyDetails:String[]=[];
  feeTableData:any=[];
  submitForm():void{

  }
  toggleFilterOptions() {
    this.showFilterOptions = !this.showFilterOptions;
  }
  filterSelect(item:any){
    this.showFilterOptions=false;
    if(this.selectedClass===item){
      this.selectedClass=null;
      return;  
    }
    this.selectedClass=item;
  }
  inputChange$ = new Subject<string>();
  token: string = ''; 
    constructor(private http: HttpClient,private dialogService: DialogService,private editFormDialog: EditDialogService) {
    this.token = localStorage.getItem('token') || '';
    this.inputChange$.pipe(
      debounceTime(500), // Adjust debounce time as needed (in milliseconds)
      distinctUntilChanged(), // Only emit if the new value is different from the previous one
      switchMap(value => this.fetchSuggestions(value))
    ).subscribe((suggestions: any[]) => {
      console.log("data",suggestions);
      this.suggestions = suggestions;
    });
  }
 
  onInputChange(event: any) {
    const value = event.target.value;
    this.inputChange$.next(value);
  }

fetchSuggestions(value: string): Observable<any[]> {
  if (isNullOrUndefined(this.selectedClass)) {
    this.dialogService.openDialog("Warning", "Please select a class from the filters");
    return of([]); // Return an empty array observable    
  }

  const apiUrl = `${apiURL}/getStudentDatabyClass`;
  const ay = localStorage.getItem('ay') || ayCurrent;
  const reqdata = { name: value, std: this.selectedClass.value, ay: ay }; 
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.token 
  });

  return this.http.post<any[]>(apiUrl, reqdata, { headers }).pipe(
    catchError(error => {
      this.dialogService.openDialog("Error", "An error occurred. Reloading the page might resolve the issue.");
      return of([]); // Return an empty array observable in case of an error
    })
  );

}
 getFeeDetails(){
if(isNullOrUndefined(this.selectedSuggestion)){
  this.dialogService.openDialog("Warning", "Please select student details...");
  return;
}

const url = `${apiURL}/fee/getFeeData`;
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Authorization: this.token // Include the token in the 'Authorization' header
});
const ay = localStorage.getItem('ay') || ayCurrent;

const reqData={std:this.selectedClass.value,ay:ay,s_id:this.selectedSuggestion.s_id,c_id:this.selectedSuggestion.class_id};
this.http.post<any>(url, { reqData }, { headers }).toPromise()
  .then(res => {
    this.isNotFeeDetails=false;
    console.log("response",res);
    this.paidMonthlyDetails=[]
    this.paidVehMonthlyDetails=[]
    if(isNullOrUndefined(res)) return ;
    let mc=res.monthlyCount; // Return response or an empty object if null or undefined
    let isMonthNotUpdated:boolean=true;
    for(let i=1;i<=mc;i++){
     const mnth=this.getMonthById(i);
     isMonthNotUpdated=false;
     if(mnth) this.paidMonthlyDetails.push(mnth.value);
    }
    if(isMonthNotUpdated) this.paidMonthlyDetails=[]
    let veh_fee_det=res.veh_fee_det;
    
    if(veh_fee_det){
      const vehmntharray=veh_fee_det.split(",");
      vehmntharray.forEach((part: String) => {
        this.paidVehMonthlyDetails.push(part);
    });
    }else{
      this.paidVehMonthlyDetails=[]
    }
    this.feeTableData=res.data;
  })
  .catch(err => {
    console.error(err);
    this.dialogService.openDialog("Error", "Unable to process the request..");
    return {}; // Return an empty object in case of an error
  });
}
getMonthById(id:Number):any {
  return months.find(month => month.id == id);
}
openPayFeeBox(){
  if(isNullOrUndefined(this.selectedSuggestion)){
    this.dialogService.openDialog("Warning", "Please select student details...");
    return;
  }
 
  this.selectedSuggestion.selClass=this.selectedClass;
  this.editFormDialog.openFeeDialog(this.selectedSuggestion);
}
}
