/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import ApplyModal from "@/src/features/application/components/ApplyModal";
import Image from "next/image";
import { DoorOpen, BedDouble, CheckCircle2 } from "lucide-react";
import { PropertyItem } from "../types/interface";
import Link from "next/link";

interface RoomListProps {
  property: PropertyItem;
}

export default function RoomList({ property }: RoomListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  if (!property.rooms || property.rooms.length === 0) {
    return (
      <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-xl text-center">
        <p className="text-gray-500">
          No rooms available for this property right now.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <DoorOpen className="w-6 h-6 text-emerald-600" />
        Available Rooms ({property.rooms.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {property.rooms.map((room: any) => (
          <div
            key={room.id}
            className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
          >
            <div className="relative w-full h-48 bg-gray-100">
              <Image
                src={
                  room.images?.[0]?.imageUrl ||
                  "https://images.unsplash.com/photo-1598928506311-c55ded91a20c"
                }
                alt={`Room ${room.roomNumber}`}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-800">
                    Room {room.roomNumber}
                  </h3>
                  <span className="flex items-center gap-1 text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    {room.status}
                  </span>
                </div>

                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <BedDouble className="w-4 h-4 mr-1" />
                  <span>{room.roomType} Room</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="mb-4">
                  <p className="text-xs text-gray-500">Base Rent</p>
                  <p className="text-lg font-bold text-emerald-600">
                    ৳ {room.baseRent}{" "}
                    <span className="text-sm text-gray-500 font-normal">
                      /mo
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {/* ✅ View Details btn */}
                  <Link
                    href={`/rooms/${room.id}`}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    View Details
                  </Link>

                  {/* ✅ Submit Application  */}
                  <button
                    onClick={() => {
                      setSelectedRoom(room);
                      setIsModalOpen(true);
                    }}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
                  >
                    Submit Application
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {selectedRoom && (
          <ApplyModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            targetId={selectedRoom.id} // 👈 রুমের আইডি
            type="room" // 👈 type="room"
          />
        )}
      </div>
    </div>
  );
}
