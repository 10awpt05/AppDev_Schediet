import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit {
  user: User | undefined; // Specify that user is of type User

  constructor(private route: ActivatedRoute, private storage: Storage) {}

  async ngOnInit() {
    // Get the username from the route parameters
    const username = this.route.snapshot.paramMap.get('username');
    
    // Fetch user data from storage based on username
    const users: User[] = await this.storage.get('users') || []; // Specify the type of users array
    this.user = users.find((u: User) => u.name === username); // Provide explicit typing for u
  }

  goBack() {
    window.history.back(); // Navigate back to the previous page
  }
}
