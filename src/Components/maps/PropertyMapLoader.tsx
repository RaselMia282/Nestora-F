
"use client";

import dynamic from "next/dynamic";
import type { MapProperty } from "./PropertyMap";

const PropertyMap = dynamic(
  () => import("./PropertyMap"),
  {
    ssr: false,
    loading: () => (
      <div className="h-100 animate-pulse rounded-xl bg-gray-100" />
    ),
  }
);

export default function PropertyMapLoader({
  properties,
}: {
  properties: MapProperty[];
}) {
  return <PropertyMap properties={properties} />;
}
