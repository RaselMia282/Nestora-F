"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Home, CheckCircle2, BedDouble, Bath } from "lucide-react";
import { SingleRoomDetails } from "../types/interface";

export default function RoomDetailsHeader({ room }: { room: SingleRoomDetails }) {
  const property = room.property;
  const coverImage = room.images?.[0]?.imageUrl || "https://images.unsplash.com/photo-1598928506311-c55ded91a20c";

  return (
    <div className="w-full">
      {/* ── 1. Main Room Image ── */}
      <div className="relative w-full h-[300px] md:h-[450px] rounded-xl overflow-hidden shadow-sm mb-6">
        <Image
          src={coverImage}
          alt={`Room ${room.roomNumber}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-4 left-4 bg-[#196c51] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <CheckCircle2 className="w-3 h-3" />
          {room.status}
        </div>
      </div>

      {/* ── 2. Room Title & Location ── */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          {property?.title} - Room {room.roomNumber}
        </h1>
        <div className="flex items-center text-gray-500 mt-2 text-sm md:text-base">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{property?.address}, {property?.city}</span>
        </div>
        
        {/* Room Tags */}
        <div className="mt-4 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1 text-sm font-medium bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg">
            <Home className="w-4 h-4" />
            {room.roomType} Room
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-medium bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg">
            <BedDouble className="w-4 h-4" />
            1 Bed
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-medium bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg">
            <Bath className="w-4 h-4" />
            1 Bath
          </span>
        </div>
      </div>

      {/* ── 3. Description ── */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-3">About this room</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          {property?.description || "No description provided for this room."}
        </p>
      </div>

      {/* ── 4. Property Info Card (New Addition) ── */}
      <div className="mb-8 bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col sm:flex-row items-center gap-4">
        {/* Property Image */}
        <div className="w-full sm:w-32 h-24 relative rounded-lg overflow-hidden shrink-0">
          <Image
            src={property?.propertyImg || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"}
            alt={property?.title || "Property"}
            fill
            className="object-cover"
          />
        </div>

        {/* Property Details */}
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-lg font-bold text-gray-800">{property?.title}</h3>
          <p className="text-sm text-gray-500 flex items-center justify-center sm:justify-start gap-1 mt-1">
            <MapPin className="w-3 h-3" /> {property?.address}
          </p>
        </div>

        {/* View Property Button */}
        <div>
          <Link
            href={`/properties/${property?.id}`}
            className="inline-block px-5 py-2.5 bg-[#196c51]/10 text-[#196c51] font-semibold text-sm rounded-lg hover:bg-[#196c51] hover:text-white transition-colors whitespace-nowrap"
          >
            View Full Property
          </Link>
        </div>
      </div>

      {/* ── 5. Amenities ── */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Amenities</h3>
        <div className="grid grid-cols-2 gap-3 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-[#196c51]">📶</span> High-speed WiFi
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#196c51]">❄️</span> Air Conditioning
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#196c51]">🧺</span> Laundry Service
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#196c51]">🚗</span> Parking Space
          </div>
        </div>
      </div>

    </div>
  );
}