"use client";

import React, { useState } from "react";
import { useGetProperty } from "../api/property"; 
import { PropertyItem } from "../types/interface";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import PropertyMap from "@/src/Components/maps/PropertyMap";

const PropertyPage = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [address, setAddress] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const itemsPerPage = 12;
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  
  const filters = {
    category: selectedCategory || undefined,
    page: 1,
    limit: 100, 
  };

  const { data: response, isError, isPending } = useGetProperty(filters);
  
  const properties: PropertyItem[] = response?.data?.data ?? [];
  const meta = response?.data?.meta;

  
  const skeletonCount = isPending ? Math.min(meta?.limit || itemsPerPage, itemsPerPage) : 0;

  // Filter Logic
  const filteredProperties = properties.filter((property) => {
    const matchTitle = property.title.toLowerCase().includes(searchTitle.toLowerCase());
    const matchAddress = property.address.toLowerCase().includes(address.toLowerCase());
    const matchMin = minPrice === "" || property.fullRent >= Number(minPrice);
    const matchMax = maxPrice === "" || property.fullRent <= Number(maxPrice);
    return matchTitle && matchAddress && matchMin && matchMax;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProperties = filteredProperties.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="pb-16 bg-gray-50/50">
      
      {/* ── Hero Section ── */}
      <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-0 mb-6">
        <div className="relative w-full h-50 lg:h-87.5 rounded-xl lg:rounded-none overflow-hidden shadow-sm">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/70 to-transparent" />
          <div className="relative z-10 h-full flex flex-col justify-center px-5 md:px-12 text-white max-w-2xl">
            <h1 className="text-2xl md:text-5xl font-bold leading-tight mb-2 md:mb-4 tracking-tight">
              Discover Your <br className="hidden md:block" /> Next Home
            </h1>
            <p className="text-xs md:text-base text-blue-100 mb-4 md:mb-6 max-w-lg leading-relaxed">
              Explore a wide range of properties for rent, from cozy apartments
              to spacious houses, in your preferred location.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-6 text-[10px] md:text-sm font-medium text-blue-50">
              <span className="flex items-center gap-1 md:gap-2">
                <span className="text-green-400">✔</span> Verified Listings
              </span>
              <span className="flex items-center gap-1 md:gap-2">
                <span className="text-blue-300">🔒</span> Safe & Secure
              </span>
              <span className="flex items-center gap-1 md:gap-2">
                <span className="text-yellow-400">⚡</span> Easy Booking
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content Area ── */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 mt-6">
        
        {/* Filter Section */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <input
            type="search"
            placeholder="Search by title"
            value={searchTitle}
            onChange={(e) => { setSearchTitle(e.target.value); setCurrentPage(1); }}
            className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
          />
          <input
            type="search"
            placeholder="Search by address"
            value={address}
            onChange={(e) => { setAddress(e.target.value); setCurrentPage(1); }}
            className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
          />
          <input
            type="number"
            placeholder="Min Price (৳)"
            value={minPrice}
            onChange={(e) => { setMinPrice(e.target.value); setCurrentPage(1); }}
            className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
          />
          <input
            type="number"
            placeholder="Max Price (৳)"
            value={maxPrice}
            onChange={(e) => { setMaxPrice(e.target.value); setCurrentPage(1); }}
            className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
          />
        </div>

        {/* Mobile Toggle */}
        <div className="flex lg:hidden items-center justify-center bg-gray-100 p-1 rounded-lg mb-6 max-w-sm mx-auto">
          <button
            onClick={() => setViewMode("list")}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              viewMode === "list" ? "bg-white shadow text-blue-600" : "text-gray-500"
            }`}
          >
            📋 List View
          </button>
          <button
            onClick={() => setViewMode("map")}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              viewMode === "map" ? "bg-white shadow text-blue-600" : "text-gray-500"
            }`}
          >
            🗺️ Map View
          </button>
        </div>

        {/* ── 12 Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Side: Cards */}
          <div className={`lg:col-span-7 ${viewMode === "map" ? "hidden lg:block" : "block"}`}>
            
            
            {isPending ? (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                {Array.from({ length: skeletonCount }).map((_, idx) => (
                  <div key={idx} className="border border-gray-200 bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
                    <div className="w-full h-48 bg-gray-200" />
                    <div className="p-4 space-y-3">
                      <div className="h-5 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="h-4 bg-gray-200 rounded w-1/3" />
                      <div className="mt-4 flex justify-between">
                        <div className="h-6 bg-gray-200 rounded w-1/4" />
                        <div className="h-6 bg-gray-200 rounded w-1/4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : currentProperties.length > 0 ? (
              
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                {currentProperties.map((p) => (
                  <div key={p.id} className="border border-gray-200 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
                    <Image
                      src={p.propertyImg || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"}
                      alt={p.title}
                      height={400}
                      width={300}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h1 className="font-bold text-lg text-gray-800 line-clamp-1">{p.title}</h1>
                        <p className="text-gray-500 text-sm mt-1 line-clamp-1">{p.address}</p>
                        <p className="text-sm text-gray-500 mt-1">{p.areaSqft} sqft</p>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-blue-600 font-bold text-lg">৳ {p.fullRent}</p>
                        <button className="text-sm text-blue-600 font-medium hover:underline">View Details →</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-4xl">🏠</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No Properties Found</h3>
                <p className="text-gray-500 text-sm text-center px-4">
                  We couldn't find any properties matching your search. <br /> Try adjusting your filters.
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && !isPending && (
              <div className="mt-8 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => handlePageChange(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>

          {/* Right Side: Map */}
          <div className={`lg:col-span-5 ${viewMode === "list" ? "hidden lg:block" : "block"}`}>
            <div className="lg:sticky lg:top-24 h-[70vh] lg:h-[calc(100vh-120px)] bg-white rounded-xl border border-gray-200 overflow-hidden z-10">
              <PropertyMap properties={filteredProperties} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PropertyPage;