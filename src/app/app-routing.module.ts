import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth.guard';
import { StudentNavComponent } from './components/student-nav/student-nav.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { ViewStudentComponent } from './components/view-student/view-student.component';
import { MarksNavComponent } from './components/marks-nav/marks-nav.component';
import { AddMarksComponent } from './components/add-marks/add-marks.component';
import { FeeItemComponent } from './components/fee-item/fee-item.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
const routes:Routes=[
  {path:"" , component:LoginComponent},
  {path:"dashboard", canActivate: [AuthGuard], component:HomeComponent},
  {
    path: 'student',
    component: StudentNavComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'addStudent', component: AddStudentComponent },
      { path: 'viewStudent', component: ViewStudentComponent },
      // { path: 'marks', component: MarksComponent },
      // Add more routes for other menu items
    ],
  },
  {
    path: 'marks',
    component: MarksNavComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'addMarks', component: AddMarksComponent },
      // { path: 'marks', component: MarksComponent },
      // Add more routes for other menu items
    ],
  },
  {
    path: 'fees',
    component: FeeItemComponent,
    canActivate: [AuthGuard],
  },
  // {path:"login" , component:LoginComponent}
  { path: '**', component: NotFoundComponent }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
