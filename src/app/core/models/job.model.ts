export type JobType = 'FULL_TIME' | 'PART_TIME' | 'INTERNSHIP' | 'CONTRACT' | 'REMOTE';

export interface JobRequest {
  title: string;
  description: string;
  company: string;
  location: string;
  requiredSkills?: string;
  jobType: JobType;
  minSalary?: number;
  maxSalary?: number;
}

export interface JobResponse {
  id: number;
  title: string;
  description: string;
  company: string;
  location: string;
  requiredSkills?: string;
  jobType: JobType;
  minSalary?: number;
  maxSalary?: number;
  active: boolean;
  recruiterId: number;
  recruiterName: string;
  applicantCount: number;
  createdAt: string;
}
