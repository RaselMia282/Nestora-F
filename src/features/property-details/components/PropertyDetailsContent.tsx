"use client";
import { useState } from "react";
import ApplyModal from "@/src/features/application/components/ApplyModal";
import { useParams } from "next/navigation";
import { usePropertyDetails } from "@/src/features/property-details/api/details";
import PropertyHeader from "./PropertyHeader";
import RoomList from "./RoomList";
import PropertyMap from "@/src/Components/maps/PropertyMap";
import Spinner from "@/src/Components/shared/Spinner";

export default function PropertyDetailsContent() {
  const params = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const {
    data: response,
    isLoading,
    isError,
  } = usePropertyDetails(id as string);
  const property = response?.data;

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (isError || !property) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-red-500 font-medium">
          Property not found or failed to load.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <PropertyHeader property={property} />
          <RoomList property={property} />
        </div>

        <div className="lg:col-span-4 space-y-6">
          {/* ১. Rent Options Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-emerald-600">🏠</span> Choose Your Rental
              Option
            </h2>

            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg mb-4">
              <p className="text-sm text-emerald-800 font-medium mb-1">
                Entire Property
              </p>
              <p className="text-xs text-emerald-600 mb-3">
                You will get the whole house with all rooms.
              </p>
              <p className="text-3xl font-bold text-emerald-700">
                ৳ {property.fullRent}{" "}
                <span className="text-sm font-normal text-gray-500">
                  /month
                </span>
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors mb-4"
            >
              Apply Now
            </button>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-emerald-500">✔</span> Minimum Stay: 6
                Months
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500">✔</span> Security Deposit: 2
                Months
              </div>
            </div>
          </div>

          {/* ২. Owner Info Card (Contact Owner) */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                👤 {/*here will be owner pic*/}
              </div>
              <div>
                <p className="text-sm text-gray-500">Property Owner</p>
                <p className="font-bold text-gray-800">Verified Owner</p>
              </div>
            </div>
            <button className="w-full bg-white border-2 border-emerald-600 text-emerald-600 py-2 rounded-lg font-semibold hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2">
              💬 Message Owner
            </button>
          </div>
          <ApplyModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            targetId={property.id} // 👈 এখানে property.id পাস করছি
            type="property" // 👈 এখানে type="property" দিচ্ছি
          />

          {/* ৩. Location Map Card */}
          <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
            <div className="h-[450px] w-full rounded-lg overflow-hidden relative z-0">
              <PropertyMap properties={[property]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
