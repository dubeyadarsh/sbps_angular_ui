import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component} from '@angular/core';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
import { ColDef } from 'ag-grid-community';
import { apiURL } from 'src/app/constants/constant';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-attendance-reports',
  templateUrl: './attendance-reports.component.html',
  styleUrls: ['./attendance-reports.component.css']
})
export class AttendanceReportsComponent {
 
  onDateRangeChange(event: any) {
    // this.selectedDateRange = event.value;
    if(this.selectedDateRangeStart !=undefined)
    console.log();
    console.log("here we go", this.selectedDateRangeStart,this.selectedDateRangeEnd)
    this.fetchData();
    // this.renderGrid(); // Call your function here
  }
  formatDate(p: any): any {
    try{
    return this.datePipe.transform(p.data.absentOn, 'dd-MM-YYYY'); 
    }
    catch(e){
      return '';
    }
      // Adjust the format as needed
  }
  token: string = '';
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  selectedDateRangeStart: Date | undefined;
  selectedDateRangeEnd: Date | undefined;
  displayStyle:string='none';
  rowData : any[] = [
    // { mission: "Voyager", company: "NASA", location: "Cape Canaveral", date: "1977-09-05", rocket: "Titan-Centaur ", price: 86580000, successful: true },
    // { mission: "Apollo 13", company: "NASA", location: "Kennedy Space Center", date: "1970-04-11", rocket: "Saturn V", price: 3750000, successful: false },
    // { mission: "Falcon 9", company: "SpaceX", location: "Cape Canaveral", date: "2015-12-22", rocket: "Falcon 9", price: 9750000, successful: true }
  ];
  colDefs: ColDef[] = [
    { headerName: "#Id", field: "id", flex: 1, headerClass: 'header-black' },
    { headerName: "Name", field: "name", flex: 2 },
    { headerName: "Father Name", field: "fathername", flex: 2 },
    { headerName: "Class",filter: true,  field: "class", flex: 1.5 },
    { headerName: "Absent On", valueGetter: p => this.formatDate(p) , flex: 1.5 },
    { headerName: "Contact No", field: "contactNo", flex: 1.5 },
  ];
  
  
  constructor(private http: HttpClient,private dialogService: DialogService,private datePipe: DatePipe) {
    this.token = localStorage.getItem('token') || '';
  }
  
  get totalPages(): number[] {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  onPageClick(page: number) {
    if (page !== this.currentPage) {
      this.currentPage = page;
      this.fetchData();
    }
  }

  onPrevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchData();
    }
  }

  onNextPage() {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.fetchData();
    }
  }

  onPageSizeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const size = target.value;
    this.pageSize = +size;
    this.currentPage = 1; // Reset to the first page when changing page size
    this.fetchData();
  }
  

  fetchData() {

    if(isNullOrUndefined(this.selectedDateRangeStart) || isNullOrUndefined(this.selectedDateRangeEnd)){
      this.dialogService.openDialog("Warning","Please select the date range...");
      return;
    }

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const apiUrl = `${apiURL}/getAbsentStudentData`;
    const start=this.datePipe.transform(this.selectedDateRangeStart, 'yyyy-MM-dd')
    const end=this.datePipe.transform(this.selectedDateRangeEnd, 'yyyy-MM-dd')
    const reqdata = {take:endIndex,skip:startIndex,start:start,end:end};
    // Prepare headers with the token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.token 
    });
   
    this.http.post(apiUrl, reqdata, { headers })
  .toPromise()
  .then((response: any) => {
    console.log(response.data);
    this.rowData = response.data;
    if (response.data.length > 0) {
      this.displayStyle = "inline";
    } else {
      this.displayStyle = "none";
    }
    this.totalItems = response.count[0].count;
  })
  .catch((error) => {
    this.dialogService.openDialog("Error", "An error occurred");
  });
  }
     // Inside your component
}
