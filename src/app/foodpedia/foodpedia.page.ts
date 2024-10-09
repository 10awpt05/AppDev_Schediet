import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-foodpedia',
  templateUrl: './foodpedia.page.html',
  styleUrls: ['./foodpedia.page.scss'],
})
export class FoodpediaPage implements OnInit {
  showAddItemCard: boolean = false;

  constructor(private sqlite: SQLite, private alertController: AlertController, private r: Router) { }
  private databaseObj: SQLiteObject;

  users: any[] = []; // Store users here
  newUser: any = { // New user object for input fields
    name: '',
    facts: '',
    good_for: '',
    time: '',
    age: ''
  };

  ngOnInit() { 
    this.createopenDB();
    this.createTable();
    this.getUsers(); // Fetch users on initialization
  }

  createopenDB() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      this.databaseObj = db; // Set the database
    })
    .catch(e => {
      console.error('Error creating DB:', JSON.stringify(e));
    });
  }

  createTable() {
    const sql = 'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY key AUTOINCREMENT, name TEXT, facts TEXT, good_for TEXT, time TEXT, age TEXT)';
    
    this.databaseObj.executeSql(sql, [])
      .then(() => {
        console.log('Table created');
      })
      .catch(e => console.log(e));
  }

  saveUser() {
    const { name, facts, good_for, time, age } = this.newUser;
    const sql = 'INSERT INTO users (name, facts, good_for, time, age) VALUES (?, ?, ?, ?, ?)';
    
    this.databaseObj.executeSql(sql, [name, facts, good_for, time, age])
      .then(() => {
        console.log('User inserted');
        this.getUsers(); // Fetch users after inserting
        this.newUser = { name: '', facts: '', good_for: '', time: '', age: '' }; // Reset input fields
        this.showAddItemCard = false;
      })
      .catch(e => console.log(e));
  }

  getUsers() {
    const sql = 'SELECT * FROM users';

    this.databaseObj.executeSql(sql, [])
      .then((res) => {
        this.users = []; // Clear the array before pushing new values
        for (let i = 0; i < res.rows.length; i++) {
          this.users.push(res.rows.item(i)); // Populate the users array
        }
      })
      .catch(e => console.log(e));
  }

  async confirmDeleteAll() {
    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete all items?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Delete cancelled');
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.deleteAllUsers();  // Call delete function if confirmed
          }
        }
      ]
    });

    await alert.present();
  }

  // Function to delete all users
  deleteAllUsers() {
    const sql = 'DELETE FROM users';

    this.databaseObj.executeSql(sql, [])
      .then(() => {
        console.log('All users deleted');
        this.getUsers();  // Refresh the user list
      })
      .catch(e => console.log(e));
  }
  goBack() {
    this.r.navigate(['/tabs']);
  }

  toggleAddItemCard() {
    this.showAddItemCard = !this.showAddItemCard;
  }

}
