"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";

import { List, Map } from "lucide-react";
import { useGetAllRooms } from "@/src/features/rooms/api/get-room";
import { RoomItem } from "@/src/features/rooms/types/interface";
import RoomHero from "@/src/features/rooms/components/RoomHero";
import RoomGrid from "@/src/features/rooms/components/RoomGrid";

const PropertyMap = dynamic(() => import("@/src/Components/maps/PropertyMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-500">
      Loading Map...
    </div>
  ),
});

export default function FindRoomsPage() {
  const { data: response, isLoading } = useGetAllRooms();

  const [filters, setFilters] = useState({
    location: "",
    roomType: "",
    price: "",
  });

  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const handleSearch = (newFilters: any) => {
    setFilters(newFilters);
  };

  
  const filteredRooms = useMemo(() => {
    const allRooms: RoomItem[] = response?.data?.data || [];

    return allRooms.filter((room) => {
      const matchLocation =
        filters.location === "" ||
        room.property.address
          .toLowerCase()
          .includes(filters.location.toLowerCase()) ||
        room.property.city
          .toLowerCase()
          .includes(filters.location.toLowerCase());

      const matchType =
        filters.roomType === "" || room.roomType === filters.roomType;

      let matchPrice = true;
      if (filters.price) {
        const [min, max] = filters.price.split("-").map(Number);
        const rent = Number(room.baseRent);
        if (max) {
          matchPrice = rent >= min && rent <= max;
        } else {
          matchPrice = rent >= min;
        }
      }

      return matchLocation && matchType && matchPrice;
    });
  }, [response, filters]); 
  const mapData = useMemo(() => {
    return filteredRooms.map((room) => ({
      id: room.id,
      title: `Room ${room.roomNumber} (${room.property.title})`,
      address: room.property.address,
      fullRent: room.baseRent,
      latitude: room.property.latitude,
      longitude: room.property.longitude,
      propertyImg: room.images?.[0]?.imageUrl,
    }));
  }, [filteredRooms]);

  return (
    <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-8">
      <RoomHero onSearch={handleSearch} />

      
      <div className="flex lg:hidden items-center justify-center bg-gray-100 p-1 rounded-lg mb-6 max-w-sm mx-auto mt-6">
        <button
          onClick={() => setViewMode("list")}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-2 ${
            viewMode === "list"
              ? "bg-white shadow text-emerald-600"
              : "text-gray-500"
          }`}
        >
          <List className="w-4 h-4" /> List View
        </button>
        <button
          onClick={() => setViewMode("map")}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-2 ${
            viewMode === "map"
              ? "bg-white shadow text-emerald-600"
              : "text-gray-500"
          }`}
        >
          <Map className="w-4 h-4" /> Map View
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-2 lg:mt-8">
        
        <div
          className={`lg:col-span-8 ${viewMode === "map" ? "hidden lg:block" : "block"}`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Available Rooms ({filteredRooms.length})
            </h2>
          </div>

          <RoomGrid rooms={filteredRooms} isPending={isLoading} />
        </div>

        
        <div
          className={`lg:col-span-4 ${viewMode === "list" ? "hidden lg:block" : "block"}`}
        >
          <div className="sticky top-24 h-[70vh] lg:h-[calc(100vh-120px)] rounded-xl overflow-hidden shadow-sm border border-gray-200 z-0">
            <PropertyMap properties={mapData as any} />
          </div>
        </div>
      </div>
    </div>
  );
}
