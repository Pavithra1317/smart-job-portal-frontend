import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Role, UserResponse } from '../models/user.model';
import { AnalyticsResponse, PagedResponse } from '../models/common.model';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private baseUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  getUsers(role?: Role, page = 0, size = 10): Observable<PagedResponse<UserResponse>> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (role) params = params.set('role', role);
    return this.http.get<PagedResponse<UserResponse>>(`${this.baseUrl}/users`, { params });
  }

  toggleLock(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/users/${id}/toggle-lock`, {});
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/users/${id}`);
  }

  getAnalytics(): Observable<AnalyticsResponse> {
    return this.http.get<AnalyticsResponse>(`${this.baseUrl}/analytics`);
  }
}
