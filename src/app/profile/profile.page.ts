import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  username: string;
  profilePicture: string | ArrayBuffer | null = null;
  imageUrl: string | ArrayBuffer | null = null;
  showAddUserCard: boolean = false;

  constructor(private storage: Storage, private alertController: AlertController, private router: Router) {}

  user1: any[] = [];
  newUser: any = {
    imgUrl: null,
    name: '',
    age: '',
    gender: '',
    Weight: '',
    BloodType: ''
  };

  async ngOnInit() {
    // Initialize the storage
    await this.storage.create();
    
    // Retrieve the username from storage or authentication service
    this.username = await this.storage.get('currentUsername');
    const userData = await this.storage.get(this.username);
    if (userData) {
      this.profilePicture = userData.profilePicture;
    }

    

    // Fetch existing users from storage
    this.getUsers(); 
  }

  triggerFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  onFileSelected1(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.newUser.imgUrl = reader.result; // Store the base64 image URL in newUser.imgUrl
      };
      reader.readAsDataURL(file); // Convert the image to base64 format
    }
  }

  async saveUser() {
    const userData = await this.storage.get('users') || []; // Retrieve existing users or create a new array
    userData.push(this.newUser); // Add new user to the array

    await this.storage.set('users', userData); // Save updated users array to storage
    console.log('User inserted');
    this.getUsers(); // Fetch users after inserting
    this.newUser = { imgUrl: null, name: '', age: '', gender: '', Weight: '', BloodType: '' }; 
  }

  async getUsers() {
    const users = await this.storage.get('users') || []; // Retrieve users from storage
    this.user1 = users; // Populate the users array
  }

  toggleAddUserCard() {
    this.showAddUserCard = !this.showAddUserCard; // Toggle visibility
  }
  async confirmDelete(user: any) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: `Are you sure you want to delete ${user.name}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteUser(user);
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteUser(user: any) {
    // Filter out the user to be deleted
    this.user1 = this.user1.filter(u => u.name !== user.name);
    
    // Update the storage
    await this.storage.set('users', this.user1);
    console.log('User deleted');
  }
  navigateToUserDetail(user: any) {
    this.router.navigate(['/user-detail', user.name]); // Adjust the route based on your setup
  }
}
