import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from '../../core/services/profile.service';
import { CandidateProfileResponse } from '../../core/models/profile.model';

@Component({
  selector: 'app-candidate-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './candidate-profile.component.html',
  styleUrl: './candidate-profile.component.scss'
})
export class CandidateProfileComponent implements OnInit {
  profile?: CandidateProfileResponse;
  saving = false;
  uploading = false;
  selectedFile?: File;

  form = this.fb.group({
    headline: [''],
    summary: [''],
    location: [''],
    skills: [''],
    experienceYears: [0],
    education: [''],
    linkedInUrl: [''],
    githubUrl: ['']
  });

  constructor(private fb: FormBuilder, private profileService: ProfileService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.profileService.getMyProfile().subscribe((profile) => {
      this.profile = profile;
      this.form.patchValue(profile);
    });
  }

  onSubmit(): void {
    this.saving = true;
    this.profileService.updateProfile(this.form.getRawValue() as any).subscribe({
      next: (profile) => {
        this.profile = profile;
        this.saving = false;
        this.snackBar.open('Profile updated successfully!', 'Close', { duration: 3000 });
      },
      error: () => { this.saving = false; }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadResume(): void {
    if (!this.selectedFile) return;
    this.uploading = true;
    this.profileService.uploadResume(this.selectedFile).subscribe({
      next: (profile) => {
        this.profile = profile;
        this.uploading = false;
        this.snackBar.open('Resume uploaded successfully!', 'Close', { duration: 3000 });
      },
      error: () => { this.uploading = false; }
    });
  }
}
