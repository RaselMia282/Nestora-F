export type SingleRoomDetails = {
  id: string;
  roomNumber: string;
  roomType: string;
  baseRent: string | number;
  status: string;
  images: { id: string; imageUrl: string }[];
  property: {
    id: string;
    title: string;
    address: string;
    city: string;
    description: string | null;
    latitude: number | null;
    longitude: number | null;
  };
};