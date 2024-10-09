import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  imageUrl: string | ArrayBuffer | null = null;
  username: string;
  password: string;
  confirmPassword: string;

  constructor(
    private storage: Storage,
    private router: Router,
    private alertController: AlertController
  ) {}

  triggerFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = reader.result; // Store the base64 image URL
      };
      reader.readAsDataURL(file); // Convert the image to base64 format
    }
  }

  async registerUser() {
    // Check if passwords match
    if (this.password !== this.confirmPassword) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Passwords do not match!',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    // Store the username, password, and profile picture
    const userData = {
      username: this.username,
      password: this.password,
      profilePicture: this.imageUrl,
    };
    await this.storage.set(this.username, userData);

    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Account created successfully!',
      buttons: ['OK'],
    });
    await alert.present();

    // Redirect to the login page after registration
    this.router.navigate(['/login1']);
  }

  goBack() {
    this.router.navigate(['/login1']);
  }
}
