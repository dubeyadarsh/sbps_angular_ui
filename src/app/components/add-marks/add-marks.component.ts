import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DialogService } from '../../services/dialog.service';
import {apiURL} from '../../constants/constant'
@Component({
  selector: 'app-add-marks',
  templateUrl: './add-marks.component.html',
  styleUrls: ['./add-marks.component.css']
})
export class AddMarksComponent {
  @ViewChild('myForm') myForm!: NgForm;
  annualYearOptions = [
    { label: '2024-25', value: '2024' },
    { label: '2023-24', value: '2023' },
    { label: '2022-23', value: '2022' }
    // Add more options as needed
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

  selectedOption: string = ''; 
  formData: any = {}; 
  token: string = ''; 

  constructor(private http: HttpClient,private dialogService: DialogService) {
   
    this.token = localStorage.getItem('token') || '';
    console.log(this.token);
  }
  submitForm(): void {
  
    const apiUrl = `${apiURL}/insertStudent`;

    // Prepare headers with the token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.token // Include the token in the 'Authorization' header
    });
   
    this.http.post(apiUrl, this.formData, { headers })
      .subscribe(
        (response) => {
          this.dialogService.openDialog("Success","Data saved successfully");
          if (this.myForm) {
            this.myForm.resetForm();
          }
        },
        (error) => {
          this.dialogService.openDialog("Error","An error occurred");

          console.error('Error:', error);
        }
      );
  }
}
