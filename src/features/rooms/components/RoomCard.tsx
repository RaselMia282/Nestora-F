"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, BedDouble, CheckCircle2 } from "lucide-react";
import { RoomItem } from "../types/interface";

export default function RoomCard({ room }: { room: RoomItem }) {
  
  const coverImage = room.images?.[0]?.imageUrl || "https://images.unsplash.com/photo-1598928506311-c55ded91a20c";

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all flex flex-col group">
      
      
      <div className="relative w-full h-48 overflow-hidden bg-gray-100">
        <Image
          src={coverImage}
          alt={`Room ${room.roomNumber}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" />
          {room.status}
        </div>
      </div>

      
      <div className="p-4 flex-1 flex flex-col justify-between">
        
        
        <div>
          <h3 className="text-lg font-bold text-gray-800">
            {room.property.title} - Room {room.roomNumber}
          </h3>
          <div className="flex items-center text-gray-500 text-sm mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="line-clamp-1">{room.property.address}, {room.property.city}</span>
          </div>
        </div>

        
        <div className="mt-3 mb-4">
          <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
            <BedDouble className="w-3 h-3" />
            {room.roomType} Room
          </span>
        </div>

        
        <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-auto">
          <div>
            <p className="text-xs text-gray-500">Rent</p>
            <p className="text-lg font-bold text-emerald-600">
              ৳ {room.baseRent} <span className="text-sm font-normal text-gray-500">/mo</span>
            </p>
          </div>
          
          
          <Link 
            href={`/properties/${room.property.id}`}
            className="bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            View Details
          </Link>
        </div>

      </div>
    </div>
  );
}