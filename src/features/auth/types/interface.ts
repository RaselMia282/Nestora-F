import { Gender, Role } from "../types/enum";

export interface UserProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName?: string | null;
  phone?: string | null;
  gender?: Gender | null;
  avatarUrl?: string | null;
  avatarPublicId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterResponseData {
  id: string;
  email: string;
  role: Role;
  profile: UserProfile;
}

export interface RegisterApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: RegisterResponseData;
}

export interface ApiError {
  data?: {
    success?: boolean;
    statusCode?: number;
    message?: string;
    error?: string;
  };
  message?: string;
}
