"use client";

import { useRef } from "react";
import Image from "next/image";
import { User, Mail, Phone, Camera, ShieldCheck } from "lucide-react";
import { 
  useGetMyProfile, 
  useUpdateProfileImage 
} from "@/src/features/dashboard/api/tenant-overview";
import Spinner from "@/src/Components/shared/Spinner";

export default function TenantProfilePage() {
  const { data: response, isLoading } = useGetMyProfile();
  const { mutate: updateImage, isPending: isUploading } = useUpdateProfileImage();

  const user = response?.data;
  const profile = user?.profile; 

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateImage(file);
    }
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  
  const fullName = `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim() || "User";

  return (
    <div className="space-y-6 max-w-4xl">
      
      <div>
        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your personal information and profile picture.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-100 mb-4 group">
            {profile?.avatarUrl ? (
              <Image 
                src={profile.avatarUrl} 
                alt={fullName} 
                fill 
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <User className="w-12 h-12" />
              </div>
            )}
            
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
          />

          <h3 className="text-lg font-bold text-gray-800">{fullName}</h3>
          <p className="text-sm text-gray-500 capitalize">{user?.role?.toLowerCase() || "Tenant"}</p>
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="mt-4 text-sm text-[#196c51] font-medium hover:underline disabled:opacity-50"
          >
            {isUploading ? "Uploading..." : "Change Profile Photo"}
          </button>

          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-200">
            <ShieldCheck className="w-4 h-4" /> NID Verified
          </div>
        </div>

        
        <div className="md:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Personal Information</h2>
          
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  defaultValue={fullName}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-[#196c51] focus:ring-2 focus:ring-[#196c51]/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  defaultValue={user?.email || ""}
                  disabled
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  defaultValue={profile?.phone || ""}
                  placeholder="Enter phone number"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-[#196c51] focus:ring-2 focus:ring-[#196c51]/20"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                className="bg-[#196c51] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#12503b] transition-colors"
                onClick={() => alert("Update info API is not implemented yet.")}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}