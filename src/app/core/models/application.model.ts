export type ApplicationStatus = 'APPLIED' | 'UNDER_REVIEW' | 'SELECTED' | 'REJECTED';

export interface JobApplicationResponse {
  id: number;
  jobId: number;
  jobTitle: string;
  company: string;
  candidateId: number;
  candidateName: string;
  candidateEmail: string;
  candidateSkills?: string;
  resumeFileName?: string;
  status: ApplicationStatus;
  coverNote?: string;
  appliedAt: string;
}
