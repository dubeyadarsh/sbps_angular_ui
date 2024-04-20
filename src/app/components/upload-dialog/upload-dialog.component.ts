import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { apiURL, ayCurrent } from 'src/app/constants/constant';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent implements OnInit {

  isValidExcel = false;
  token: string;
  file:any;
  std:string;
  constructor(@Inject(MAT_DIALOG_DATA) public data:{std:string},public dialogRef: MatDialogRef<UploadDialogComponent>,private dialogService: DialogService,private http: HttpClient) {
    this.token = localStorage.getItem('token') || '';
    this.std=data.std
  }

  ngOnInit(): void {}

  onFileChange(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      // Validate file type
      const fileType = this.file.name.split('.').pop()?.toLowerCase();
      if (fileType === 'xlsx' || fileType === 'xls') {
        this.isValidExcel = true;
      } else {
        this.isValidExcel = false;
        this.dialogService.openDialog("Error", "Please upload a valid Excel file (XLSX or XLS format).");
      }

    }
  }
  uploadTemplate() {
    if(!this.isValidExcel){
      this.dialogService.openDialog("Error", "Please Upload proper template !");
      return;
    }
    const ay= localStorage.getItem('ay') || ayCurrent;
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('std', this.std);
    formData.append('ay', String(ay));


    const headers = new HttpHeaders({
      Authorization: this.token 
    });

const apiUrl = `${apiURL}/marks/uploadTemplate`;
    this.http.post<any>(apiUrl, formData , {headers}).subscribe(
      response => {
        this.dialogService.openDialog("Success", response);
      },
      error => {
        this.dialogService.openDialog("Error", "Error uploading file: Try again !");
        console.error('', error);
      }
    );
    }
}
