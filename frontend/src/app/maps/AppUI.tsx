'use client';

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import { ArrowRight, Calendar } from "lucide-react";

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
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    // Set default to current date and time
    const now = new Date();
    return now.toISOString().slice(0, 16); // Format for datetime-local input
  });
  const originRef = useRef<HTMLInputElement>(null!);
  const destRef = useRef<HTMLInputElement>(null!);

  const handleGetEstimate = async () => {
    const pickupValue = originRef.current?.value || '';
    const dropValue = destRef.current?.value || '';
    
    if (!pickupValue || !dropValue) {
      alert('Please enter both pickup and drop locations');
      return;
    }
    
    // Get form values
    const phoneNumber = document.querySelector<HTMLInputElement>('input[placeholder="Phone Number"]')?.value || '';
    const customerName = document.querySelector<HTMLInputElement>('input[placeholder="Name"]')?.value || '';
    const customerType = document.querySelector<HTMLSelectElement>('select')?.value || '';
    
    if (!phoneNumber || !customerName || !customerType) {
      alert('Please fill in all required fields');
      return;
    }

    // Validate pickup date
    if (!selectedDate) {
      alert('Please select a pickup date');
      return;
    }

    const pickupDate = new Date(selectedDate);
    const now = new Date();
    
    // Check if selected date is in the past
    if (pickupDate < now) {
      alert('Pickup date cannot be in the past');
      return;
    }
    
    try {
      // Check if user is authenticated
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Please log in to create a booking');
        router.push('/auth');
        return;
      }

      // Create booking via API
      const bookingData = {
        serviceType: show === 'bike' ? 'BIKE_DELIVERY' : 'TRUCK_DELIVERY',
        pickupAddress: pickupValue,
        pickupLatitude: 0, // You might want to get actual coordinates
        pickupLongitude: 0,
        dropoffAddress: dropValue,
        dropoffLatitude: 0,
        dropoffLongitude: 0,
        pickupDateTime: new Date(selectedDate).toISOString(),
        estimatedFare: 100, // Calculate based on distance
        notes: `Customer: ${customerName}, Phone: ${phoneNumber}, Type: ${customerType}`,
        paymentMethod: 'CASH',
        customerName,
        customerPhone: phoneNumber,
        customerType
      };
      
      // Make API call to create booking
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      });
      
      if (response.ok) {
        const result = await response.json();
        const bookingId = result.data.id;
        
        // Redirect to ride status page with booking ID and pickup date
        router.push(`/ride-status?bookingId=${bookingId}&pickup=${encodeURIComponent(pickupValue)}&drop=${encodeURIComponent(dropValue)}&type=${show === 'bike' ? 'bike' : 'truck'}&pickupDate=${encodeURIComponent(selectedDate)}`);
      } else {
        // Get error details from response
        const errorData = await response.json();
        console.error('Booking creation failed:', errorData);
        alert(`Failed to create booking: ${errorData.message || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Booking creation error:', error);
      alert('An error occurred while creating your booking. Please check your internet connection and try again.');
    }
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
        <div className="absolute left-1/2 -bottom-16 transform -translate-x-1/2 bg-white rounded-lg shadow-xl px-2 md:px-8 py-6 w-[95vw] md:w-[1000px] z-20">
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
            <div className="flex-2 relative">
              <input 
                type="datetime-local" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
                className="px-2 py-1 border border-gray-300 rounded text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                title="Select pickup date and time"
                placeholder="Pickup Date & Time"
              />
              <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
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
