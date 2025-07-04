'use client';

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import { ArrowRight } from "lucide-react";

import { useJsApiLoader } from "@react-google-maps/api";
import { MAPS_API_KEY } from "./utils/mapsApiKey";
import LocationInput from "./LocationInput";
import { BikeRateCards } from "./ratecards/TwoWheelerRateCards";
import { TruckRateCards } from "./ratecards/TruckRateCards";
import { PackersMoversCards } from "./ratecards/pmCards";
import { IntercityCourierCards } from "./ratecards/icCards";

// Props to control what to show
interface AppUIProps {
  show?: 'bike' | 'truck' | 'pm' | 'ic'| 'both';
}

export default function AppUI({ show = 'both' }: AppUIProps) {
  const router = useRouter();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: MAPS_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const originRef = useRef<HTMLInputElement>(null!);
  const destRef = useRef<HTMLInputElement>(null!);

  const handleGetEstimate = () => {
    const pickupValue = originRef.current?.value || '';
    const dropValue = destRef.current?.value || '';
    
    if (!pickupValue || !dropValue) {
      alert('Please enter both pickup and drop locations');
      return;
    }
    
    // Determine vehicle type based on show prop
    const vehicleType = show === 'bike' ? 'bike' : 'truck';
    
    // Redirect to ride status page with pickup, drop, and vehicle type parameters
    router.push(`/ride-status?pickup=${encodeURIComponent(pickupValue)}&drop=${encodeURIComponent(dropValue)}&type=${vehicleType}`);
  };

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
              <LocationInput placeholder="Pickup Address " inputRef={originRef} />
            </div>
            <div className="flex-2">
              <LocationInput placeholder="Drop Address " inputRef={destRef} />
            </div>
            <div className="flex-2">
              <input type="text" placeholder="Phone Number" className="px-2 py-1 border border-gray-300 rounded text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div className="flex-1">
              <input type="text" placeholder="Name" className="px-2 py-1 border border-gray-300 rounded text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div className="flex-1">
              <select className="px-2 py-1 border border-gray-300 rounded text-sm text-gray-500 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer">
                <option>What describes you best? *</option>
                <option>Business</option>
                <option>Individual</option>
              </select>
            </div>
            <button 
              onClick={handleGetEstimate}
              className="bg-blue-600 text-white px-6 py-2 font-bold font-md rounded-2xl cursor-pointer inline-flex items-center gap-2 text-sm hover:bg-blue-700 transition-colors"
            >
              Book Ride <ArrowRight className="w-4 h-4" />
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
