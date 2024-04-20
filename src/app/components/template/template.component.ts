// template.component.ts

import { Component } from '@angular/core';
import {ayList} from '../../constants/constant'
import { AuthService } from 'src/app/services/auth.service';
import { ayCurrent } from '../../constants/constant';
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent {
  ay:String | undefined ;
  ayBox:boolean = false;
  ayDetails:any[] =ayList;
  constructor(private authService: AuthService,){
    this.ay = localStorage.getItem('ay') || ayCurrent;
  }
  openCloseAnnualYearBox() {
    this.ayBox = !this.ayBox;
  }
  aySelection(item:any){
    this.ay=item.value;
    localStorage.setItem('ay',item.value);
    this.ayBox = !this.ayBox;
  }
  isSidebarOpen: boolean = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    
  }
  logout(){
    this.authService.logout();
  }
}
