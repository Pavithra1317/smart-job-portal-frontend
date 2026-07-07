import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CandidateProfileRequest, CandidateProfileResponse } from '../models/profile.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private baseUrl = `${environment.apiUrl}/candidate/profile`;

  constructor(private http: HttpClient) {}

  getMyProfile(): Observable<CandidateProfileResponse> {
    return this.http.get<CandidateProfileResponse>(this.baseUrl);
  }

  updateProfile(payload: CandidateProfileRequest): Observable<CandidateProfileResponse> {
    return this.http.put<CandidateProfileResponse>(this.baseUrl, payload);
  }

  uploadResume(file: File): Observable<CandidateProfileResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<CandidateProfileResponse>(`${this.baseUrl}/resume`, formData);
  }
}
