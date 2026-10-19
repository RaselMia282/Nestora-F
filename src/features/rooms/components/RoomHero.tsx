"use client";

import { useState } from "react";
import { Search, MapPin, Home, Wallet } from "lucide-react";

interface RoomHeroProps {
  onSearch: (filters: { location: string; roomType: string; price: string }) => void;
}

export default function RoomHero({ onSearch }: RoomHeroProps) {
  const [location, setLocation] = useState("");
  const [roomType, setRoomType] = useState("");
  const [price, setPrice] = useState("");

  const handleSearch = () => {
    onSearch({ location, roomType, price });
  };

  return (
    <div className="w-full">
      {/* ── Hero Image & Text ── */}
      <div className="relative w-full h-62.5 md:h-87.5 rounded-2xl overflow-hidden mb-6">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')", // রুমের সুন্দর ছবি
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 text-white">
          <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-3">
            Find Room
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">
            Discover Comfortable Rooms
          </h1>
          <p className="text-sm md:text-base text-gray-200 max-w-lg">
            Find the perfect room that fits your budget, location and lifestyle.
          </p>
        </div>
      </div>

      {/* ── Search & Filter Bar ── */}
      <div className="bg-white rounded-xl shadow-md p-3 flex flex-col md:flex-row gap-3 relative z-20 -mt-12 mx-4 md:mx-8 mb-8 border border-gray-100">
        
        {/* Location */}
        <div className="flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200">
          <MapPin className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search location (e.g. Uttara)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full outline-none text-sm text-gray-700 bg-transparent"
          />
        </div>

        {/* Room Type */}
        <div className="flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200">
          <Home className="w-5 h-5 text-gray-400 mr-2" />
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="w-full outline-none text-sm text-gray-700 bg-transparent cursor-pointer"
          >
            <option value="">All Room Types</option>
            <option value="SINGLE">Single Room</option>
            <option value="DOUBLE">Double Room</option>
            <option value="MASTER">Master Bedroom</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="flex-1 flex items-center px-4 py-2">
          <Wallet className="w-5 h-5 text-gray-400 mr-2" />
          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full outline-none text-sm text-gray-700 bg-transparent cursor-pointer"
          >
            <option value="">Any Price</option>
            <option value="0-10000">Under 10,000</option>
            <option value="10000-20000">10,000 - 20,000</option>
            <option value="20000-50000">20,000+</option>
          </select>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4" /> Search
        </button>
      </div>
    </div>
  );
}