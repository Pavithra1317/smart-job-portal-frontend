import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error) => {
      const message = error?.error?.message || 'Something went wrong. Please try again.';

      if (error.status === 401) {
        authService.logout();
        router.navigate(['/login']);
        snackBar.open('Session expired. Please log in again.', 'Close', { duration: 4000 });
      } else if (error.status === 403) {
        snackBar.open('You do not have permission to perform this action.', 'Close', { duration: 4000 });
      } else {
        snackBar.open(message, 'Close', { duration: 4000 });
      }
      return throwError(() => error);
    })
  );
};
