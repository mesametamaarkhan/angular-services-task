// src/app/user-list/user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  standalone: false,
  styleUrls: ['./user-list.component.css'] // optional
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  updateUser(user: any): void {
    console.log('Updating user:', user);
    const updatedUser = { ...user, name: user.name + ' (Updated)' };
    this.userService.updateUser(user.id, updatedUser).subscribe(() => {
      // Simulate update locally
      this.users = this.users.map(u => u.id === user.id ? updatedUser : u);
      console.log('User updated');
    });
  }

  deleteUser(id: number): void {
    console.log('Deleting user with id:', id);
    this.userService.deleteUser(id).subscribe(() => {
    // Simulate deletion locally
    this.users = this.users.filter(u => u.id !== id);
    console.log('User deleted');
  });
  }
}
