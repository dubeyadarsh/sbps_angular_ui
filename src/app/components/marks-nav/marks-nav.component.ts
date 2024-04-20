import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DialogService } from 'src/app/services/dialog.service';
import { ColDef } from 'ag-grid-community';
import { HalfYearlyMarksheetComponent } from '../half-yearly-marksheet/half-yearly-marksheet.component';
// import jsPDF from 'jsfilter1: stringfilter1: stringpdf';
import {ayCurrent} from '../../constants/constant'
import {subjLen} from '../../constants/constant'
import {subjectNames} from '../../constants/constant'
import {subjectNames2} from '../../constants/constant'
import {subjectTotals} from '../../constants/constant'
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
import { apiURL } from '../../constants/constant';
import { Observable } from 'rxjs';
import { UploadFilterService } from 'src/app/services/upload-filter.service';
@Component({
  selector: 'app-marks-nav',
  templateUrl: './marks-nav.component.html',
  styleUrls: ['./marks-nav.component.css']
})
export class MarksNavComponent {

  @ViewChild(HalfYearlyMarksheetComponent) halfYearlyMarksheetComponent!: HalfYearlyMarksheetComponent;
  filter1: string = ''; 
  filter2: string = '';
  showComponent = false;
  marksheetData:any; 
  commonMarks:any;
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
  // annualYearOptions = [
  //   { label: '2024-25', value: '2024' },
  //   { label: '2023-24', value: '2023' },
  //   { label: '2022-23', value: '2022' }
  //   // Add more options as needed
  // ];
 
  rowData : any[] = [
    // { mission: "Voyager", company: "NASA", location: "Cape Canaveral", date: "1977-09-05", rocket: "Titan-Centaur ", price: 86580000, successful: true },
    // { mission: "Apollo 13", company: "NASA", location: "Kennedy Space Center", date: "1970-04-11", rocket: "Saturn V", price: 3750000, successful: false },
    // { mission: "Falcon 9", company: "SpaceX", location: "Cape Canaveral", date: "2015-12-22", rocket: "Falcon 9", price: 9750000, successful: true }
  ];
  colDefs: ColDef[] = [
    { headerName: "#Id", maxWidth: 75 , field: "id",headerClass: 'header-black'},
    { headerName: "Name",  minWidth: 300 ,field: "name" },
    { headerName: "Father Name" ,minWidth: 250 , field: "fathername"},
    { headerName: "Obtained Marks" , field: "marks"},
    { headerName: "Total Marks" ,field: "totalmarks"},
    {  
      headerName: 'Half-Yearly Status', 
      field: 'half_status', 
      minWidth: 70,
      cellRenderer:function(params:any) {
        return (params.value=='1')?'<mat-icon class="material-icons mt-2  button" style="cursor:pointer;">download</mat-icon>':'-';
    },
      onCellClicked:(event)=>{ this.exportpdf(event.data)},
  },
  {  
    headerName: 'Annual Status', 
    field: 'annual_status', 
    minWidth: 70,
    cellRenderer:function(params:any) {
      return (params.value=='1')?'<mat-icon class="material-icons mt-2  button" style="cursor:pointer;">download</mat-icon>':'Pending';
  },
  onCellClicked:(event)=>{ this.editFormDialog.openDialog(event.data)},
}    
  ];
  token: string = ''; 
  editFormDialog: any;
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  marksheet: any;

  constructor(private http: HttpClient,private dialogService: DialogService ,private renderer: Renderer2, private uploadDialogService:UploadFilterService) {

    this.token = localStorage.getItem('token') || '';
  }
 
  
  get totalPages(): number[] {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  onPageClick(page: number) {
    if (page !== this.currentPage) {
      this.currentPage = page;
      this.MarksGridRender();
    }
  }

  onPrevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.MarksGridRender();
    }
  }

  onNextPage() {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.MarksGridRender();
    }
  }

  onPageSizeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const size = target.value;
    this.pageSize = +size;
    this.currentPage = 1; // Reset to the first page when changing page size
    this.MarksGridRender();
  }
  getTemplate():void{
    if(this.filter1===''){
      this.dialogService.openDialog("Warning","Please select  class");

    }
    const apiUrl = `${apiURL}/getTemplate`;

    // Prepare headers with the token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      responseType: 'blob' as 'json' ,
      Authorization: this.token // Include the token in the 'Authorization' header
    });
   const formData = {
    ay: localStorage.getItem('ay') || ayCurrent,
    std:this.filter1
   };
    this.http.post(apiUrl, formData, { headers, responseType: 'blob' })
      .subscribe(
        (response) => {
          const blob = new Blob([response], { type: 'application/xlsx' });
          const downloadURL = window.URL.createObjectURL(blob);

          // Create an anchor element and simulate a click to trigger the download
          const link = document.createElement('a');
          link.href = downloadURL;
          link.download = `${this.filter1}.xlsx`;
          link.click();
    
          // Cleanup by revoking the URL object
          window.URL.revokeObjectURL(downloadURL);
         },
        (error) => {
          this.dialogService.openDialog("Error","An error occurred");
        }
      );
  }
  MarksGridRender():void{
   if(this.filter1 === '') {
    this.dialogService.openDialog("Warning","Please select Class.");
    return;
   }
   const startIndex = (this.currentPage - 1) * this.pageSize;
   const endIndex = startIndex + this.pageSize;
   const apiUrl = `${apiURL}/marksGridRender`;
   const ay= localStorage.getItem('ay') || ayCurrent;
   const reqdata = {take:endIndex,skip:startIndex,ay:ay,std:this.filter1};
   console.log("start",reqdata);

   // Prepare headers with the token
   const headers = new HttpHeaders({
     'Content-Type': 'application/json',
     Authorization: this.token 
   });
   this.http.post(apiUrl, reqdata, { headers })
   .toPromise()
   .then((response: any) => {
     console.log(response.data);
 
     // const filteredGridData=[];
     // response.data.forEach((element: { annual_status: number; }) => {
     //   var obj={};
     //   obj.
     //   if(element.annual_status === 1){
     //      element.marks
     //   }
     // });
     if (!response.data || response.data.length === 0) {
      // Handle empty response.data
      console.log("Response data is empty");
      return;
    }
     const transformedData = response.data.map((item: {
       half_grosstotal: any;
       annual_grosstotal: any;
       half_status: any; id: any; name: any; fathername: any; annual_status: number; annual_total: any; half_total: any;
     }) => {
       return {
         id: item.id,
         name: item.name,
         fathername: item.fathername,
         marks: item.annual_status === 1 ? item.annual_total : item.half_total,
         totalmarks: item.annual_status === 1 ? item.annual_grosstotal : item.half_grosstotal,
         half_status: item.half_status,
         annual_status: item.annual_status
         // Add other properties as needed
       };
     });
 
     
     this.rowData = transformedData;
     this.totalItems = response.count[0].count;
   })
   .catch((error) => {
     this.dialogService.openDialog("Error", "An error occurred");
   });
 
}
exportpdf(event:any):void{
  const classid=event.id;
  if(classid==null){
    this.dialogService.openDialog("Warning","Please select Marksheet to generate pdf");
    return;
  }
  this.downloadFile(classid,this.filter1).subscribe((data: Blob) => {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'filename.pdf';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  });
}
downloadFile(classId: any,std: any): Observable<any> {
  const headers = new HttpHeaders(
    { 'Content-Type': 'application/json',
       token: this.token 
   });
  return this.http.get(`http://localhost:8080/generateMarksheet?classId=${classId}&std=${std}`, { responseType: 'blob', headers });
}
async exportpdfOld(event: any): Promise<void> {
  
   const result= await this.getDataFromBackend(event.id);
  if(result == null){
    this.dialogService.openDialog("Error",`Couldn't generate pdf contact  adminstrator.`);
    return;
  }
  console.log("result is",result.data[0])
  let tempResultData=result.data[0];
  var resultData:any[]=[];

  for(let i=0 ;i <subjLen;i++){
    let obj: { [key: string]: any } = {};
    obj["SubName"]=subjectNames[i]
    obj["half"]=tempResultData[subjectNames2[i][0]]
    obj["annual"]=tempResultData[subjectNames2[i][1]]
    obj["sub_total"]=tempResultData[subjectTotals[i]]
    console.log("Object",obj)
    resultData.push(obj);
  }
 let cmnmarks={
  name:tempResultData['name'],
  rollno:event.id,  //:todo
  father:tempResultData['father_name'],
  std:this.filter1,
  ay:tempResultData['ay'],
  half_gross_total:tempResultData['half_yearly_total'],
  annual_gross_total:tempResultData['annual_total'],
  half_scored:tempResultData['half_total'],
  annual_Scored:tempResultData['annual_total']
 }
 console.log("common",cmnmarks)
  this.marksheetData =resultData // Example value, replace with your actual value
  this.commonMarks= cmnmarks;
  setTimeout(()=>{  this.showComponent = true;  window.print();},2000)

 
}

async getDataFromBackend(classid:String):Promise<any>{
    if(classid==null){
      this.dialogService.openDialog("Warning","Please select Marksheet to generate pdf");
      return null;
    }
  
    const apiUrl = `${apiURL}/marks/getMarksheetByClassId`;
    
    const reqdata = {classid:classid,std:this.filter1}; 
    // Prepare headers with the token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.token 
    });
    const observableResponse = this.http.post(apiUrl,reqdata,{ headers });
    const response = await observableResponse.toPromise();
    if(isNullOrUndefined(response)){
      this.dialogService.openDialog("Error",`Couldn't generate pdf contact  adminstrator.`);
       return null;
    }
    return response;
  }

  uploadTemplate() {
    if(this.filter1 === '') {
      this.dialogService.openDialog("Warning","Please select Class.");
      return;
     }
    
    this.uploadDialogService.openUploadFilterDialog(this.filter1);
  }
}
