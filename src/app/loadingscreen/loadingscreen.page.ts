import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-loadingscreen',
  templateUrl: './loadingscreen.page.html',
  styleUrls: ['./loadingscreen.page.scss'],
})
export class LoadingscreenPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    setTimeout(() => {
      this.navCtrl.navigateForward('/login1');  // Replace with your target page
    }, 3000);
  }

}
