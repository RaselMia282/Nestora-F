export type RoomImage = {
  id: string;
  imageUrl: string;
};

export type RoomProperty = {
  id: string;
  title: string;
  address: string;
  city: string;
  latitude: number | null;
  longitude: number | null;
};

export type RoomItem = {
  id: string;
  roomNumber: string;
  roomType: string;
  baseRent: string | number;
  status: string;
  images: RoomImage[];
  property: RoomProperty;
};

export type RoomsResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    meta: {
      total: number;
      pageNumber: number;
      limitNumber: number;
      totalPages: number;
    };
    data: RoomItem[];
  };
};