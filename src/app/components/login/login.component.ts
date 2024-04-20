// login.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  constructor(private authService: AuthService, private router: Router,private dialogService: DialogService) {}
  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        
        localStorage.setItem('token', response.token);

        // Navigate to the new page
        this.router.navigate(['/dashboard']); 
      },
      (error) => {
        this.dialogService.openDialog("Error","An error occurred : Invalid Credentials");
      }
    );
  }

  
}
