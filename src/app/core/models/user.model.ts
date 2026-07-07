export type Role = 'CANDIDATE' | 'RECRUITER' | 'ADMIN';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  userId: number;
  fullName: string;
  email: string;
  role: Role;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  role: Role;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  role: Role;
  enabled: boolean;
  accountLocked: boolean;
  createdAt: string;
}
