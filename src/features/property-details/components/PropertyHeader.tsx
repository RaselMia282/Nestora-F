"use client";

import Image from "next/image";

import { MapPin, Maximize, CheckCircle2 } from "lucide-react";
import { PropertyItem } from "../types/interface";

interface PropertyHeaderProps {
  property: PropertyItem;
}

export default function PropertyHeader({ property }: PropertyHeaderProps) {
  return (
    <div className="w-full">
      
      <div className="relative w-full h-[300px] md:h-[450px] rounded-xl overflow-hidden shadow-sm mb-6">
        <Image
          src={
            property.propertyImg ||
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
          }
          alt={property.title || "Property Image"}
          fill
          className="object-cover"
          priority
        />

        
        {property.category && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800 shadow-sm">
            {property.category.name}
          </div>
        )}
      </div>

      
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
            {property.title}
            <CheckCircle2 className="w-6 h-6 text-blue-500" />{" "}
            
          </h1>

          <div className="flex items-center text-gray-500 mt-2 text-sm md:text-base">
            <MapPin className="w-4 h-4 mr-1" />
            <span>
              {property.address}, {property.city}
            </span>
          </div>
        </div>

        
        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg text-gray-700 font-medium">
          <Maximize className="w-5 h-5 mr-2 text-gray-500" />
          {property.areaSqft} Sqft
        </div>
      </div>

      
      <div className="border-t border-gray-200 pt-4 mt-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          About this property
        </h3>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          {property.description || "No description provided for this property."}
        </p>
      </div>
    </div>
  );
}
