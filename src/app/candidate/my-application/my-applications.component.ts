import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApplicationService } from '../../core/services/application.service';
import { JobApplicationResponse } from '../../core/models/application.model';

@Component({
  selector: 'app-my-applications',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatChipsModule, MatButtonModule, MatIconModule],
  templateUrl: './my-applications.component.html',
  styleUrl: './my-applications.component.scss'
})
export class MyApplicationsComponent implements OnInit {
  applications: JobApplicationResponse[] = [];
  displayedColumns = ['jobTitle', 'company', 'status', 'appliedAt', 'actions'];
  loading = false;

  constructor(private applicationService: ApplicationService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.loading = true;
    this.applicationService.getMyApplications(0, 50).subscribe({
      next: (res) => {
        this.applications = res.content;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  withdraw(app: JobApplicationResponse): void {
    this.applicationService.withdraw(app.id).subscribe(() => {
      this.snackBar.open('Application withdrawn.', 'Close', { duration: 3000 });
      this.loadApplications();
    });
  }
}
