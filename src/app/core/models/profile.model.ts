export interface CandidateProfileRequest {
  headline?: string;
  summary?: string;
  location?: string;
  skills?: string;
  experienceYears?: number;
  education?: string;
  linkedInUrl?: string;
  githubUrl?: string;
}

export interface CandidateProfileResponse extends CandidateProfileRequest {
  id: number;
  fullName: string;
  email: string;
  resumeFileName?: string;
}
