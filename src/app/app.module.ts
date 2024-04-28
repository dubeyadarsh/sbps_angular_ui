// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateComponent } from './components/template/template.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { AuthService } from './services/auth.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DialogComponent } from './components/dialog/dialog.component';
import { StudentNavComponent } from './components/student-nav/student-nav.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MarksNavComponent } from './components/marks-nav/marks-nav.component';
import { AddMarksComponent } from './components/add-marks/add-marks.component';
import { ViewStudentComponent } from './components/view-student/view-student.component';
import { AgGridModule } from 'ag-grid-angular';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { FeeItemComponent } from './components/fee-item/fee-item.component';
import { HalfYearlyMarksheetComponent } from './components/half-yearly-marksheet/half-yearly-marksheet.component';
import { HalfYearlyPdfService } from './services/half-yearly-pdf.service';
import { NgxPrintModule } from 'ngx-print';
import { HomeComponent } from './components/home/home.component';
import { PayFeeComponent } from './components/pay-fee/pay-fee.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FeeOverviewComponent } from './components/fee-overview/fee-overview.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DateFormatPipe } from './components/config/date-format.pipe';
import { UploadDialogComponent } from './components/upload-dialog/upload-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { ReportsNavComponent } from './components/reports-nav/reports-nav.component';
import { AttendanceReportsComponent } from './components/attendance-reports/attendance-reports.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // Import MatNativeDateModule
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    LoginComponent,
    DialogComponent,
    StudentNavComponent,
    AddStudentComponent,
    MarksNavComponent,
    AddMarksComponent,
    ViewStudentComponent,
    EditFormComponent,
    FeeItemComponent,
    HalfYearlyMarksheetComponent,
    HomeComponent,
    PayFeeComponent,
    FeeOverviewComponent,
    NotFoundComponent,
    DateFormatPipe,
    UploadDialogComponent,
    ReportsNavComponent,
    AttendanceReportsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // Uncomment this line
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule, 
    AgGridModule,
    NgxPrintModule,
    MatCardModule,
    MatAutocompleteModule ,
    MatCheckboxModule ,
    MatMenuModule,
    NgMultiSelectDropDownModule,
    MatTooltipModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [AuthService,HalfYearlyPdfService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
