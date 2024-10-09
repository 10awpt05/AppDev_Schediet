import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  img: any ="../../assets/img/1st.png";

  constructor(private r: Router) {}

  img1() {
    this.img = "../../../assets/img/1st.png";
  }
  tofoodpedia() {
    this.r.navigate(['foodpedia']);
  }
  
}
