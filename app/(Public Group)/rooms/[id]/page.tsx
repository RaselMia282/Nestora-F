/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import { useState } from "react";
import ApplyModal from "@/src/features/application/components/ApplyModal";
import RoomDetailsHeader from "@/src/features/room-details/components/RoomDetailsHeader";
import Spinner from "@/src/Components/shared/Spinner";
import { useGetSingleRoom } from "@/src/features/room-details/api/details";
import PropertyMap from "@/src/Components/maps/PropertyMap";

function RoomDetailsContent() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: response, isLoading, isError } = useGetSingleRoom(id as string);
  const room = response?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError || !room) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-red-500 font-medium">
          Room not found or failed to load.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side (Header & Details) */}
        <div className="lg:col-span-8">
          <RoomDetailsHeader room={room} />
        </div>

        {/* Right Side (Sidebar - Rent, Apply, Contact, Map) */}
        <div className="lg:col-span-4">
          {/* Right Side (Sidebar) */}
          <div className="lg:col-span-4 space-y-6">
            {/* 1. Rent & Apply Card */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 sticky top-24 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Rent This Room
              </h2>
              <p className="text-3xl font-bold text-[#196c51] mb-4">
                ৳ {room.baseRent}{" "}
                <span className="text-sm font-normal text-gray-500">
                  /month
                </span>
              </p>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-[#196c51] text-white py-3 rounded-lg font-semibold hover:bg-[#12503b] transition-colors mb-3 cursor-pointer"
              >
                Apply Now
              </button>

              <button className="w-full bg-white border-2 border-[#196c51] text-[#196c51] py-3 rounded-lg font-semibold hover:bg-[#f0fdf4] transition-colors flex items-center justify-center gap-2">
                💬 Contact Owner
              </button>

              <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-600 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[#196c51]">✔</span> Minimum Stay: 6
                  Months
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#196c51]">✔</span> Security Deposit: 2
                  Months
                </div>
              </div>
            </div>
            <ApplyModal
              isOpen={isModalOpen}
              targetId={room.id}
              onClose={() => setIsModalOpen(false)}

              type="room"
            />

            {/* 2. Location Map */}
            <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm sticky">
              <div className="h-[250px] w-full rounded-lg overflow-hidden relative z-0 sticky">
                {/* Assuming you have the PropertyMap component working */}
                <PropertyMap properties={[room.property] as any} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RoomDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <Spinner size="lg" />
        </div>
      }
    >
      <RoomDetailsContent />
    </Suspense>
  );
}
