import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JobRequest, JobResponse } from '../models/job.model';
import { PagedResponse } from '../models/common.model';

@Injectable({ providedIn: 'root' })
export class JobService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  searchJobs(keyword = '', location = '', skill = '', page = 0, size = 10): Observable<PagedResponse<JobResponse>> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (keyword) params = params.set('keyword', keyword);
    if (location) params = params.set('location', location);
    if (skill) params = params.set('skill', skill);
    return this.http.get<PagedResponse<JobResponse>>(`${this.baseUrl}/jobs/search`, { params });
  }

  getJobById(id: number): Observable<JobResponse> {
    return this.http.get<JobResponse>(`${this.baseUrl}/jobs/${id}`);
  }

  // Recruiter
  getMyJobs(page = 0, size = 10): Observable<PagedResponse<JobResponse>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<PagedResponse<JobResponse>>(`${this.baseUrl}/recruiter/jobs`, { params });
  }

  createJob(payload: JobRequest): Observable<JobResponse> {
    return this.http.post<JobResponse>(`${this.baseUrl}/recruiter/jobs`, payload);
  }

  updateJob(id: number, payload: JobRequest): Observable<JobResponse> {
    return this.http.put<JobResponse>(`${this.baseUrl}/recruiter/jobs/${id}`, payload);
  }

  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/recruiter/jobs/${id}`);
  }

  toggleActive(id: number): Observable<JobResponse> {
    return this.http.patch<JobResponse>(`${this.baseUrl}/recruiter/jobs/${id}/toggle-active`, {});
  }
}
