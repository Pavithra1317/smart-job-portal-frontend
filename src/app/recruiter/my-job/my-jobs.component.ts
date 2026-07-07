import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobService } from '../../core/services/job.service';
import { JobResponse } from '../../core/models/job.model';

@Component({
  selector: 'app-my-jobs',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTableModule, MatButtonModule, MatIconModule, MatSlideToggleModule],
  templateUrl: './my-jobs.component.html',
  styleUrl: './my-jobs.component.scss'
})
export class MyJobsComponent implements OnInit {
  jobs: JobResponse[] = [];
  displayedColumns = ['title', 'location', 'jobType', 'applicantCount', 'active', 'actions'];
  loading = false;

  constructor(private jobService: JobService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.loading = true;
    this.jobService.getMyJobs(0, 50).subscribe({
      next: (res) => {
        this.jobs = res.content;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  toggleActive(job: JobResponse): void {
    this.jobService.toggleActive(job.id).subscribe(() => this.loadJobs());
  }

  deleteJob(job: JobResponse): void {
    if (!confirm(`Delete job "${job.title}"? This cannot be undone.`)) return;
    this.jobService.deleteJob(job.id).subscribe(() => {
      this.snackBar.open('Job deleted.', 'Close', { duration: 3000 });
      this.loadJobs();
    });
  }
}
