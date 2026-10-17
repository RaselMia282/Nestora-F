export type PropertyItem = {
  id: string;
  title: string;
  city: string;
  address: string;
  description?: string | null;
  fullRent: number | string; 
  rentAmount?: number;       
  propertyImg?: string | null;
  areaSqft?: number;
  latitude?: number | null;
  longitude?: number | null;
  
  
  category?: {
    id: string;
    name: string;
  };
  owner?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    profileImg?: string | null;
  };
  rooms?: {
    id: string;
    roomNumber: string;
    roomType: string;
    baseRent: string | number;
    status: string;
  }[];
};
