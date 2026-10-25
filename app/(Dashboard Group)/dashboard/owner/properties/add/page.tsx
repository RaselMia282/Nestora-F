/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, UploadCloud, Home } from "lucide-react";
import { apiClient } from "@/src/lib/ofetch";
import { useAuthStore } from "@/src/store/auth-store";
import { useGetCategories } from "@/src/features/dashboard/owner/api/owner-overview"; // 👈 Import the hook
import { toast } from "sonner";

export default function AddPropertyPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  // Fetch categories
  const { data: categoriesRes, isLoading: isCatLoading } = useGetCategories();
  const categories = categoriesRes?.data || [];

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Dhaka");
  const [categoryId, setCategoryId] = useState(""); 
  const [fullRent, setFullRent] = useState("");
  const [areaSqft, setAreaSqft] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please upload a property image.");
      return;
    }

    try {
      setIsSubmitting(true);

      // 1. Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "nestora_preset"); 

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/dz9vx0vn/image/upload`, 
        { method: "POST", body: formData }
      );
      
      if (!cloudRes.ok) throw new Error("Image upload failed");
      const cloudData = await cloudRes.json();
      const imageUrl = cloudData.secure_url;

      // 2. Send data to backend API
      const payload = {
        title,
        description,
        address,
        city,
        categoryId,
        fullRent: Number(fullRent),
        areaSqft: Number(areaSqft),
        latitude: Number(latitude),
        longitude: Number(longitude),
        propertyImg: imageUrl,
        ownerId: user?.id,
      };

      await apiClient("/properties", {
        method: "POST",
        body: payload,
      });

      toast.success("Property added successfully!");
      router.push("/dashboard/owner/properties");
      
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Failed to create property");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/owner/properties" className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Add New Property</h1>
          <p className="text-gray-500 text-sm mt-1">Fill in the details to list your property.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-6">
        
        {/* Basic Info */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
            <Home className="w-5 h-5 text-[#196c51]" /> Basic Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Title</label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Luxury Apartment" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-[#196c51]" />
            </div>
            
            {/* 👇 Category Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                required
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-[#196c51] bg-white cursor-pointer"
              >
                <option value="" disabled>
                  {isCatLoading ? "Loading categories..." : "Select a category"}
                </option>
                {categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea required value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Describe the property..." className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-[#196c51]" />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800 border-b pb-2">Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-[#196c51]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input type="text" required value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-[#196c51]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
              <input type="number" step="any" required value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="23.8103" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-[#196c51]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
              <input type="number" step="any" required value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="90.4125" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-[#196c51]" />
            </div>
          </div>
        </div>

        {/* Details & Image */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800 border-b pb-2">Details & Image</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Rent (৳)</label>
              <input type="number" required value={fullRent} onChange={(e) => setFullRent(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-[#196c51]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Area (sqft)</label>
              <input type="number" required value={areaSqft} onChange={(e) => setAreaSqft(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-[#196c51]" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors">
              <input type="file" required accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#196c51]/10 file:text-[#196c51]" />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button type="submit" disabled={isSubmitting} className="bg-[#196c51] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#12503b] transition-colors disabled:opacity-50 flex items-center gap-2 cursor-pointer">
            <UploadCloud className="w-5 h-5" />
            {isSubmitting ? "Creating..." : "Create Property"}
          </button>
        </div>

      </form>
    </div>
  );
}