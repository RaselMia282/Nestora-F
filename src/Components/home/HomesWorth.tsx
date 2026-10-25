/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight, BedDouble, Bath, Maximize } from "lucide-react";

import Spinner from "@/src/Components/shared/Spinner";
import { useGetProperty } from "@/src/features/property/api/property";

export default function FeaturedProperties() {
  // Fetch properties
  const { data: response, isLoading } = useGetProperty();

  // Get first 4 properties
  const properties =
    response?.data?.data?.slice(0, 4) || response?.data?.slice(0, 4) || [];

  if (isLoading) {
    return (
      <section className="py-16 bg-[#effdf2]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Header Skeleton */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div className="space-y-3">
              <div className="h-8 bg-gray-200 rounded-md w-64 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded-md w-96 animate-pulse"></div>
            </div>
          </div>

          {/* Cards Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col"
              >
                {/* Image Skeleton */}
                <div className="w-full h-48 bg-gray-200 animate-pulse"></div>

                {/* Content Skeleton */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-200 rounded-md w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded-md w-1/2 animate-pulse"></div>
                    <div className="flex gap-4 mt-3">
                      <div className="h-4 bg-gray-200 rounded-md w-10 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded-md w-10 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded-md w-16 animate-pulse"></div>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="h-6 bg-gray-200 rounded-md w-20 animate-pulse"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#effdf2]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Homes Worth Coming Home To
            </h2>
            <p className="text-gray-500 mt-2 max-w-xl">
              Discover our handpicked selection of premium properties designed
              for comfort and style.
            </p>
          </div>
          <Link
            href="/properties"
            className="text-[#196c51] font-medium hover:underline flex items-center gap-1"
          >
            View All Properties <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property: any) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-all flex flex-col"
            >
              {/* Image */}
              <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                <Image
                  src={
                    property.propertyImg ||
                    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
                  }
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold text-gray-800 shadow-sm">
                  {property.category?.name || "Property"}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                    {property.title}
                  </h3>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="line-clamp-1">{property.city}</span>
                  </div>

                  {/* Features */}
                  <div className="flex items-center gap-4 mt-3 text-gray-500 text-sm">
                    <div className="flex items-center gap-1">
                      <BedDouble className="w-4 h-4" /> 2
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4" /> 2
                    </div>
                    <div className="flex items-center gap-1">
                      <Maximize className="w-4 h-4" /> {property.areaSqft || 0}{" "}
                      sqft
                    </div>
                  </div>
                </div>

                {/* Price and Button */}
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-[#196c51]">
                      ৳ {property.fullRent}
                      <span className="text-xs text-gray-500 font-normal">
                        /mo
                      </span>
                    </p>
                  </div>
                  <Link
                    href={`/properties/${property.id}`}
                    className="w-8 h-8 rounded-full bg-[#196c51]/10 text-[#196c51] flex items-center justify-center group-hover:bg-[#196c51] group-hover:text-white transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
