import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login1',
  templateUrl: './login1.page.html',
  styleUrls: ['./login1.page.scss'],
})
export class Login1Page implements OnInit {
  img: any = "../../assets/img/logo1.png";
  username: string;
  password: string;

  constructor(private router: Router, private storage: Storage, private alertController: AlertController) {}

  async ngOnInit() {
    await this.storage.create();
  }

  tologin() {
    this.router.navigate(['tabs']);
  }

  toreg() {
    this.router.navigate(['register']);
  }

  async loginUser() {
    // Fetch the stored user data (which includes username, password, and profile picture)
    const userData = await this.storage.get(this.username);

    // Check if the username exists and if the password matches
    if (userData && userData.password === this.password) {
      const alert = await this.alertController.create({
        header: 'Login Success',
        message: 'You have logged in successfully!',
        buttons: ['OK'],
      });
      await alert.present();

      // Save the logged-in user's username in storage (if you want to use it for persistence)
      await this.storage.set('currentUsername', this.username);

      // Redirect to the home or dashboard page after successful login
      this.router.navigate(['/tabs']);
    } else {
      // Show an error if login fails
      const alert = await this.alertController.create({
        header: 'Login Failed',
        message: 'Invalid username or password!',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
