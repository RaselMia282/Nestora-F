/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, MapPin, Plus, ArrowRight } from "lucide-react";

import { useAuthStore } from "@/src/store/auth-store";
import Spinner from "@/src/Components/shared/Spinner";
import { useGetOwnerProperties } from "@/src/features/dashboard/owner/api/owner-overview";


export default function OwnerPropertiesPage() {
  const { data: response, isLoading, isError } = useGetOwnerProperties();
  const user = useAuthStore((state) => state.user);

  // Filter properties for current owner
  const myProperties = useMemo(() => {
    const allProperties = response?.data?.data || response?.data || [];
    if (!user?.id) return [];
    return allProperties.filter((p: any) => p.ownerId === user.id);
  }, [response, user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return <div className="text-center py-20 text-red-500">Failed to load properties.</div>;
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Properties</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your listed properties and rooms.</p>
        </div>
        
        {/* Add Property Button */}
        <Link
          href="/dashboard/owner/properties/add"
          className="bg-[#196c51] hover:bg-[#12503b] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Property
        </Link>
      </div>

      {/* Properties Grid */}
      {myProperties.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
          <div className="flex flex-col items-center justify-center text-gray-500">
            <Home className="w-16 h-16 mb-4 text-gray-300" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">No properties yet</h2>
            <p className="text-sm mb-6 max-w-sm mx-auto">
              You haven't added any properties to your account. Start listing your first property now.
            </p>
            <Link
              href="/dashboard/owner/properties/add"
              className="bg-[#196c51] hover:bg-[#12503b] text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer"
            >
              Add Your First Property
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myProperties.map((property: any) => (
            <div key={property.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group">
              
              {/* Image */}
              <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                <Image
                  src={property.propertyImg || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold text-gray-800 shadow-sm">
                  {property.category?.name || "Property"}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{property.title}</h3>
                  <div className="flex items-center text-gray-500 text-sm mt-1.5">
                    <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="line-clamp-1">{property.address}, {property.city}</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Rent</p>
                    <p className="text-lg font-bold text-[#196c51]">৳ {property.fullRent}</p>
                  </div>
                  <Link
                    href={`/properties/${property.id}`}
                    className="text-sm text-[#196c51] font-medium hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    View Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}