import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { apiURL } from 'src/app/constants/constant';
import { DialogService } from 'src/app/services/dialog.service';
@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent {
  @ViewChild('myForm') myForm!: NgForm;
  formData: any = {}; 
  token: string = ''; 

  constructor(
    public dialogRef: MatDialogRef<EditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private dialogService: DialogService,private http: HttpClient,) {
      this.formData.name=data.name;
      console.log(data.data);
      this.formData = {
        name: data.data.name, // Initial value for 'name'
        dob: data.data.dob, 
        fathername:data.data.fathername,
        mothername:data.data.mothername,
        contact:data.data.contactnumber,
        address:data.data.address,
        id:data.data.id
      };
      this.token = localStorage.getItem('token') || '';

    }

   onNoClick(): void {
    this.dialogRef.close();
  }
 
  submitForm(): void {
  
    const apiUrl = `${apiURL}/updateStudent`;

    // Prepare headers with the token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.token // Include the token in the 'Authorization' header
    });
   
    this.http.post(apiUrl, this.formData, { headers })
      .subscribe(
        (response:any) => {
          this.dialogService.openDialog("Success","Data Updated successfully");
          this.dialogRef.close();
         },
        (error:any) => {
          this.dialogService.openDialog("Error","An error occurred while updating the data");
        }
      );
  }
}
