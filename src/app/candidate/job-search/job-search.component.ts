import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobService } from '../../core/services/job.service';
import { ApplicationService } from '../../core/services/application.service';
import { AuthService } from '../../core/services/auth.service';
import { JobResponse } from '../../core/models/job.model';

@Component({
  selector: 'app-job-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatCardModule, MatChipsModule, MatIconModule, MatPaginatorModule],
  templateUrl: './job-search.component.html',
  styleUrl: './job-search.component.scss'
})
export class JobSearchComponent implements OnInit {
  jobs: JobResponse[] = [];
  totalElements = 0;
  pageSize = 6;
  pageIndex = 0;
  loading = false;

  filterForm = this.fb.group({
    keyword: [''],
    location: [''],
    skill: ['']
  });

  constructor(private fb: FormBuilder, private jobService: JobService,
              private applicationService: ApplicationService,
              public auth: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.loading = true;
    const { keyword, location, skill } = this.filterForm.getRawValue();
    this.jobService.searchJobs(keyword || '', location || '', skill || '', this.pageIndex, this.pageSize)
      .subscribe({
        next: (res) => {
          this.jobs = res.content;
          this.totalElements = res.totalElements;
          this.loading = false;
        },
        error: () => { this.loading = false; }
      });
  }

  onSearch(): void {
    this.pageIndex = 0;
    this.loadJobs();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadJobs();
  }

  applyToJob(job: JobResponse): void {
    if (!this.auth.isLoggedIn() || this.auth.userRole() !== 'CANDIDATE') {
      this.snackBar.open('Please login as a candidate to apply.', 'Close', { duration: 3000 });
      return;
    }
    this.applicationService.applyForJob(job.id).subscribe({
      next: () => this.snackBar.open('Application submitted successfully!', 'Close', { duration: 3000 }),
    });
  }

  skillsList(skills?: string): string[] {
    return skills ? skills.split(',').map(s => s.trim()).filter(Boolean) : [];
  }
}
