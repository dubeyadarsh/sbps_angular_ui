import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DialogService } from '../../services/dialog.service';
import { EditDialogService } from 'src/app/services/editDialog.service';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
import { apiURL } from 'src/app/constants/constant';
import { ayCurrent } from 'src/app/constants/constant';
@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})

export class ViewStudentComponent {

  token: string = '';
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  filter1: string = ''; 
  displayStyle:string='none';
  rowData : any[] = [
    // { mission: "Voyager", company: "NASA", location: "Cape Canaveral", date: "1977-09-05", rocket: "Titan-Centaur ", price: 86580000, successful: true },
    // { mission: "Apollo 13", company: "NASA", location: "Kennedy Space Center", date: "1970-04-11", rocket: "Saturn V", price: 3750000, successful: false },
    // { mission: "Falcon 9", company: "SpaceX", location: "Cape Canaveral", date: "2015-12-22", rocket: "Falcon 9", price: 9750000, successful: true }
  ];
  colDefs: ColDef[] = [
    {  
      headerName: 'Edit', 
      field: 'edit', 
      width: 70,
      cellRenderer:function() {
        return '<mat-icon class="material-icons mt-2 button" style="cursor:pointer;">edit</mat-icon>';
    },
    onCellClicked:(event)=>{ this.editFormDialog.openDialog(event.data)},
  },
  {  
    headerName: 'Attendance', 
    field: 'attendance', 
    width: 100,
    cellRenderer:function(event:any) {
      return `<input id=${event.data.id} class="attendCheckBox" type="checkbox"  data-attribute=${event.data} />`;
  }
},

    { headerName: "#Id", maxWidth: 75 , field: "id",headerClass: 'header-black'},
    { headerName: "Name", filter:true, field: "name" },
    { headerName: "Father Name" , field: "fathername"},
    { headerName: "Mother Name", field: "mothername"},
    { headerName: "DOB" , field: "dob"},
    { headerName: "Admission Year" ,field: "timestamp"},
    { headerName: "Contact Number",field: "contactnumber"},
    { headerName: "Address" ,field: "address"},
    { headerName: "SR Number" ,field: "sr_no"},
    { headerName: "Pan Number" ,field: "pan_no"},
    
  ];
 
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

  constructor(private http: HttpClient,private dialogService: DialogService,private editFormDialog: EditDialogService,private elementRef: ElementRef) {
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

    if(this.filter1===''){
      this.dialogService.openDialog("Warning","Please select the class and annual year...");
      return;
    }

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const apiUrl = `${apiURL}/viewStudent`;
    const ay=localStorage.getItem('ay') || ayCurrent;
    const reqdata = {take:endIndex,skip:startIndex,ay:ay,std:this.filter1};
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
     onIconClick(e:Event) {
      console.log('Icon clicked', e);
  }
  markAbsent():void{
 
    const checkboxes = this.elementRef.nativeElement.querySelectorAll('.attendCheckBox');
    if(isNullOrUndefined(checkboxes)){
      this.dialogService.openDialog("Warning","Something went wrong...")
      return;
    }
    console.log(checkboxes)
    let selectedStdChkBox: string[]=[];
    checkboxes.forEach((checkbox: HTMLInputElement) => {
      if(checkbox.checked) selectedStdChkBox.push(checkbox.id);
    });
     if(selectedStdChkBox.length ==0){
      this.dialogService.openDialog("Warning","Please Select some checkboxes.")
      return ;
    }
    const std =this.filter1;
    const url = `${apiURL}/markStudentsAbsent`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.token // Include the token in the 'Authorization' header
    });
  
    this.http.post(url, { std,selectedStdChkBox }, { headers }).toPromise()
      .then(res => {
        this.dialogService.openDialog("Success", "Process Completed Successfully");
        checkboxes.forEach((checkbox: HTMLInputElement) => {
          checkbox.checked = false;
        });
        
      })
      .catch(err => {
        console.error(err);
        this.dialogService.openDialog("Error", "Unable to process the request... Try Again !");
      });
  }
}
