'use client';

import React, { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/maps/ui/skeleton";

import { useJsApiLoader } from "@react-google-maps/api";
import { MAPS_API_KEY } from "@/components/maps/utils/mapsApiKey";
import LocationInput from "@/components/maps/LocationInput";
import { BikeRateCards } from "@/components/maps/ratecards/TwoWheelerRateCards";
import { TruckRateCards } from "@/components/maps/ratecards/TruckRateCards";
import { PackersMoversCards } from "@/components/maps/ratecards/pmCards";
import { IntercityCourierCards } from "@/components/maps/ratecards/icCards";

// Props to control what to show
interface AppUIProps {
  show?: 'bike' | 'truck' | 'pm' | 'ic'| 'both';
}

export default function AppUI({ show = 'both' }: AppUIProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: MAPS_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const originRef = useRef<HTMLInputElement>(null!);
  const destRef = useRef<HTMLInputElement>(null!);

  if (!isLoaded) return <Skeleton className="h-6 w-32" />;

  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        const latlng = { lat: latitude, lng: longitude };
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: latlng }, (results, status) => {
          if (status === "OK" && results?.[0]) {
            if (originRef.current)
              originRef.current.value = results[0].formatted_address;
            map?.panTo(latlng);
            map?.setZoom(8);
            setTimeout(() => map?.setZoom(15), 300);
          } else {
            alert("No address found.");
          }
        });
      });
    } else {
      alert("Geolocation not supported.");
    }
  }

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <div className="font-bold text-2xl text-[#2474ff] tracking-wide">DELIVERY PARTNERS</div>
        <div className="flex gap-8 font-medium text-sm">
          <a href="#" className="hover:underline">Support</a>
        </div>
      </div>

      {/* Hero Section with background */}
      <div
        className="relative w-full h-[320px] md:h-[380px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('https://ik.imagekit.io/vf1wtj1uk/deliverypartners/3d-rendering-buddha-statue-cave.jpg?updatedAt=1748935408872')"
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black/45" />
        <div className="relative z-10 text-center text-white">
          <div className="text-2xl md:text-3xl font-bold mb-2">Reliable Goods Transportation Services</div>
        </div>

        {/* Floating Card */}
        <div className="absolute left-1/2 -bottom-16 transform -translate-x-1/2 bg-white rounded-lg shadow-xl px-2 md:px-8 py-6 w-[95vw] md:w-[900px] z-20">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
            <div className="flex-2">
              <LocationInput placeholder="Pickup Address *" inputRef={originRef} />
            </div>
            <div className="flex-2">
              <LocationInput placeholder="Drop Address *" inputRef={destRef} />
            </div>
            <div className="flex-2">
              <input type="text" placeholder="Phone Number *" className="input input-bordered w-full" />
            </div>
            <div className="flex-1">
              <input type="text" placeholder="Name *" className="input input-bordered w-full" />
            </div>
            <div className="flex-1">
              <select className="select select-bordered w-full">
                <option>What describes you best? *</option>
                <option>Business</option>
                <option>Individual</option>
              </select>
            </div>
            <button className="btn btn-primary px-8 py-6 font-bold font-md border-radius-md">
              Get an estimate
            </button>
          </div>
        </div>
      </div>

      <div className="mt-32 px-4">
        {show === 'bike' && <BikeRateCards />}
        {show === 'truck' && <TruckRateCards />}
        {show === 'pm' && <PackersMoversCards />}
        {show === 'ic' && <IntercityCourierCards />}
        {show === 'both' && (
          <>
            <BikeRateCards />
            <TruckRateCards />
            <PackersMoversCards />
            <IntercityCourierCards />
          </>
        )}
      </div>

    </div>
  );
}
