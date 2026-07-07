import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApplicationService } from '../../core/services/application.service';
import { ApplicationStatus, JobApplicationResponse } from '../../core/models/application.model';

@Component({
  selector: 'app-applicants',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTableModule, MatSelectModule, MatButtonModule, MatIconModule],
  templateUrl: './applicants.component.html',
  styleUrl: './applicants.component.scss'
})
export class ApplicantsComponent implements OnInit {
  jobId!: number;
  applicants: JobApplicationResponse[] = [];
  displayedColumns = ['candidateName', 'candidateEmail', 'candidateSkills', 'resumeFileName', 'status', 'appliedAt'];
  statusOptions: ApplicationStatus[] = ['APPLIED', 'UNDER_REVIEW', 'SELECTED', 'REJECTED'];
  loading = false;

  constructor(private route: ActivatedRoute, private applicationService: ApplicationService,
              private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.jobId = Number(this.route.snapshot.paramMap.get('jobId'));
    this.loadApplicants();
  }

  loadApplicants(): void {
    this.loading = true;
    this.applicationService.getApplicantsForJob(this.jobId, 0, 50).subscribe({
      next: (res) => {
        this.applicants = res.content;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  onStatusChange(app: JobApplicationResponse, status: ApplicationStatus): void {
    this.applicationService.updateStatus(app.id, status).subscribe(() => {
      this.snackBar.open(`Status updated to ${status.replace('_', ' ')}`, 'Close', { duration: 3000 });
      this.loadApplicants();
    });
  }
}
