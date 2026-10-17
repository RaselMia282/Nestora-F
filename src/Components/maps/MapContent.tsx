"use client";

import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { PropertyItem } from "@/src/features/property/types/interface";

const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function MapBounds({ properties }: { properties: PropertyItem[] }) {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100);

    if (properties.length > 0) {
      const bounds = L.latLngBounds(
        properties
          .filter((p) => p.latitude && p.longitude)
          .map((p) => [p.latitude!, p.longitude!] as [number, number])
      );
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
      }
    }

    return () => clearTimeout(timer);
  }, [properties, map]);

  return null;
}

export default function MapContent({ properties }: { properties: PropertyItem[] }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // ✅ setTimeout ব্যবহার করায় আর কোনো ওয়ার্নিং আসবে না
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const validProperties = useMemo(
    () => properties.filter((p) => p.latitude && p.longitude),
    [properties]
  );

  const defaultCenter: [number, number] = [23.8103, 90.4125];

  if (!isMounted) {
    return (
      <div className="w-full h-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-500">
        Loading Map...
      </div>
    );
  }

  return (
    <MapContainer
      key={`map-${validProperties.length}`}
      center={defaultCenter}
      zoom={12}
      style={{ height: "100%", width: "100%", borderRadius: "0.75rem", zIndex: 0 }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapBounds properties={validProperties} />

      {validProperties.map((p) => (
        <Marker key={p.id} position={[p.latitude!, p.longitude!]} icon={customIcon}>
          <Popup>
            <div className="w-48">
              <img
                src={p.propertyImg || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"}
                alt={p.title}
                className="w-full h-24 object-cover rounded-md mb-2"
              />
              <h3 className="font-bold text-sm text-gray-800">{p.title}</h3>
              <p className="text-xs text-gray-500 line-clamp-2">{p.address}</p>
              <p className="text-sm font-semibold text-blue-600 mt-1">৳ {p.fullRent}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}