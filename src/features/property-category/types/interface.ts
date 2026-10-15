export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  categoryImg: string;
  categoryImgPublicId?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Category[];
}