import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../core/services/admin.service';
import { Role, UserResponse } from '../../core/models/user.model';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatButtonModule, MatIconModule, MatSelectModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  users: UserResponse[] = [];
  displayedColumns = ['fullName', 'email', 'role', 'status', 'actions'];
  selectedRole: Role | '' = '';
  loading = false;

  constructor(private adminService: AdminService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.adminService.getUsers(this.selectedRole || undefined, 0, 50).subscribe({
      next: (res) => {
        this.users = res.content;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  toggleLock(user: UserResponse): void {
    this.adminService.toggleLock(user.id).subscribe(() => {
      this.snackBar.open(`User ${user.accountLocked ? 'unlocked' : 'locked'}.`, 'Close', { duration: 3000 });
      this.loadUsers();
    });
  }

  deleteUser(user: UserResponse): void {
    if (!confirm(`Delete user "${user.fullName}"? This cannot be undone.`)) return;
    this.adminService.deleteUser(user.id).subscribe(() => {
      this.snackBar.open('User deleted.', 'Close', { duration: 3000 });
      this.loadUsers();
    });
  }
}
