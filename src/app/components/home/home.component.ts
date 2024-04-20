import { Component } from '@angular/core';
import {allListOfRoutes} from  '../../constants/constant';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  listOfSuggestions: any[];
  constructor(){
    this.listOfSuggestions=[];
    const shuffledRoutes = this.shuffleArray(allListOfRoutes);

    this.listOfSuggestions = shuffledRoutes.slice(0, 4);
  }
  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
