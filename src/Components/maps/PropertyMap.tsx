"use client";

import { useEffect, useState } from "react";
import { PropertyItem } from "@/src/features/property/types/interface";

export default function PropertyMap({
  properties,
}: {
  properties: PropertyItem[];
}) {
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [MapContent, setMapContent] = useState<any>(null);

  useEffect(() => {
    
    import("./MapContent").then((mod) => {
      setMapContent(() => mod.default);
    });
  }, []);

  
  if (!MapContent) {
    return (
      <div className="w-full h-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-500">
        Loading Map...
      </div>
    );
  }

 
  return <MapContent properties={properties} />;
}
