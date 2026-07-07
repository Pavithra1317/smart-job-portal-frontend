import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'jobs', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'jobs',
    loadComponent: () => import('./candidate/job-search/job-search.component').then(m => m.JobSearchComponent)
  },

  // Candidate routes
  {
    path: 'candidate/dashboard',
    canActivate: [authGuard, roleGuard(['CANDIDATE'])],
    loadComponent: () => import('./candidate/dashboard/candidate-dashboard.component').then(m => m.CandidateDashboardComponent)
  },
  {
    path: 'candidate/profile',
    canActivate: [authGuard, roleGuard(['CANDIDATE'])],
    loadComponent: () => import('./candidate/profile/candidate-profile.component').then(m => m.CandidateProfileComponent)
  },
  {
    path: 'candidate/applications',
    canActivate: [authGuard, roleGuard(['CANDIDATE'])],
    loadComponent: () => import('./candidate/my-applications/my-applications.component').then(m => m.MyApplicationsComponent)
  },

  // Recruiter routes
  {
    path: 'recruiter/dashboard',
    canActivate: [authGuard, roleGuard(['RECRUITER'])],
    loadComponent: () => import('./recruiter/dashboard/recruiter-dashboard.component').then(m => m.RecruiterDashboardComponent)
  },
  {
    path: 'recruiter/post-job',
    canActivate: [authGuard, roleGuard(['RECRUITER'])],
    loadComponent: () => import('./recruiter/post-job/post-job.component').then(m => m.PostJobComponent)
  },
  {
    path: 'recruiter/post-job/:id',
    canActivate: [authGuard, roleGuard(['RECRUITER'])],
    loadComponent: () => import('./recruiter/post-job/post-job.component').then(m => m.PostJobComponent)
  },
  {
    path: 'recruiter/jobs',
    canActivate: [authGuard, roleGuard(['RECRUITER'])],
    loadComponent: () => import('./recruiter/my-jobs/my-jobs.component').then(m => m.MyJobsComponent)
  },
  {
    path: 'recruiter/jobs/:jobId/applicants',
    canActivate: [authGuard, roleGuard(['RECRUITER'])],
    loadComponent: () => import('./recruiter/applicants/applicants.component').then(m => m.ApplicantsComponent)
  },

  // Admin routes
  {
    path: 'admin/dashboard',
    canActivate: [authGuard, roleGuard(['ADMIN'])],
    loadComponent: () => import('./admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
  },
  {
    path: 'admin/users',
    canActivate: [authGuard, roleGuard(['ADMIN'])],
    loadComponent: () => import('./admin/users/users.component').then(m => m.UsersComponent)
  },
  {
    path: 'admin/analytics',
    canActivate: [authGuard, roleGuard(['ADMIN'])],
    loadComponent: () => import('./admin/analytics/analytics.component').then(m => m.AnalyticsComponent)
  },

  { path: '**', redirectTo: 'jobs' }
];
