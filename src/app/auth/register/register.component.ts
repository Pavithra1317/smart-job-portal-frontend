import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatRadioModule, MatProgressSpinnerModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  loading = false;

  form = this.fb.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['CANDIDATE', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.auth.register(this.form.getRawValue() as any).subscribe({
      next: (res) => {
        this.loading = false;
        const target = res.role === 'RECRUITER' ? '/recruiter/dashboard' : '/candidate/dashboard';
        this.router.navigate([target]);
      },
      error: () => { this.loading = false; }
    });
  }
}
