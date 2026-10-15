
"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

export type MapProperty = {
  id: string;
  title: string;
  latitude: number;
  longitude: number;
  rentAmount: number;
};

type Props = {
  properties: MapProperty[];
};

export default function PropertyMap({ properties }: Props) {
  const center: [number, number] =
    properties.length > 0
      ? [properties[0].latitude, properties[0].longitude]
      : [23.8103, 90.4125];

  return (
    <div className="h-[400px] w-full overflow-hidden rounded-xl lg:h-[calc(100vh-140px)]">
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {properties.map((property) => (
          <Marker
            key={property.id}
            position={[
              property.latitude,
              property.longitude,
            ]}
          >
            <Popup>
              <strong>{property.title}</strong>
              <br />
              ৳{property.rentAmount.toLocaleString()}/month
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
