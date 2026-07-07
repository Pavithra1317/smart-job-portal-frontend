import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApplicationStatus, JobApplicationResponse } from '../models/application.model';
import { PagedResponse } from '../models/common.model';

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  applyForJob(jobId: number, coverNote = ''): Observable<JobApplicationResponse> {
    return this.http.post<JobApplicationResponse>(`${this.baseUrl}/candidate/jobs/${jobId}/apply`, { coverNote });
  }

  getMyApplications(page = 0, size = 10): Observable<PagedResponse<JobApplicationResponse>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<PagedResponse<JobApplicationResponse>>(`${this.baseUrl}/candidate/applications`, { params });
  }

  withdraw(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/candidate/applications/${id}`);
  }

  getApplicantsForJob(jobId: number, page = 0, size = 10): Observable<PagedResponse<JobApplicationResponse>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<PagedResponse<JobApplicationResponse>>(`${this.baseUrl}/recruiter/jobs/${jobId}/applicants`, { params });
  }

  updateStatus(applicationId: number, status: ApplicationStatus): Observable<JobApplicationResponse> {
    return this.http.patch<JobApplicationResponse>(`${this.baseUrl}/recruiter/applications/${applicationId}/status`, { status });
  }
}
