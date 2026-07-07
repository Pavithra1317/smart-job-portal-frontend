import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobService } from '../../core/services/job.service';

@Component({
  selector: 'app-post-job',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './post-job.component.html',
  styleUrl: './post-job.component.scss'
})
export class PostJobComponent implements OnInit {
  jobTypes = ['FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'CONTRACT', 'REMOTE'];
  saving = false;
  editingId?: number;

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    company: ['', Validators.required],
    location: ['', Validators.required],
    requiredSkills: [''],
    jobType: ['FULL_TIME', Validators.required],
    minSalary: [0],
    maxSalary: [0]
  });

  constructor(private fb: FormBuilder, private jobService: JobService,
              private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editingId = Number(id);
      this.jobService.getJobById(this.editingId).subscribe((job) => {
        this.form.patchValue(job);
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.saving = true;
    const payload = this.form.getRawValue() as any;

    const request$ = this.editingId
      ? this.jobService.updateJob(this.editingId, payload)
      : this.jobService.createJob(payload);

    request$.subscribe({
      next: () => {
        this.saving = false;
        this.snackBar.open(`Job ${this.editingId ? 'updated' : 'posted'} successfully!`, 'Close', { duration: 3000 });
        this.router.navigate(['/recruiter/jobs']);
      },
      error: () => { this.saving = false; }
    });
  }
}
