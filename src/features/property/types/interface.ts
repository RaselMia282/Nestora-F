// Property Category Interface
export interface PropertyCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  categoryImg: string;
  categoryImgPublicId: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

// Room Interface
export interface Room {
  id: string;
  propertyId: string;
  roomNumber: string;
  roomType: "SINGLE" | "DOUBLE" | string;
  baseRent: string;
  status: "AVAILABLE" | "BOOKED" | string;
  createdAt: string;
  updatedAt: string;
}

// Main Property Interface
export interface Property {
  id: string;
  ownerId: string;
  title: string;
  address: string;
  city: string;
  description?: string;
  latitude?: number | null;
  longitude?: number | null;
  propertyImg?: string;
  propertyImgPublicId?: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: PropertyCategory;
  rooms: Room[];
}

// Pagination Meta Interface
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

// Full API Response Interface
export interface PropertiesApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: Property[];
    meta: PaginationMeta;
  };
}