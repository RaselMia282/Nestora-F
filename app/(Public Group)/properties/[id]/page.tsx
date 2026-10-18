"use client";

import { Suspense } from "react";
import { usePropertyDetails } from "@/src/features/property-details/api/details";
import PropertyHeader from "@/src/features/property-details/components/PropertyHeader";
import { useParams } from "next/navigation";
import PropertyDetailsContent from "@/src/features/property-details/components/PropertyDetailsContent";



// ─── ২. মেইন পেজ ───
export default function PropertyDetailsPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading page...</div>}>
      <PropertyDetailsContent />
    </Suspense>
  );
}