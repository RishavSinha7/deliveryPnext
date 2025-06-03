
"use client";

"use client";

import { Truck, Bike, Package, User, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";

const FeaturesSection = () => {
  const services = [
    {
      title: "Truck",
      icon: Truck,
      link: "/trucks"
    },
    {
      title: "Two Wheeler",
      icon: Bike,
      link: "/bikes"
    },
    {
      title: "Packers & Movers",
      icon: Package,
      link: "/packers-movers"
    },
    {
      title: "Intercity Courier Service",
      icon: User,
      link: "/intercity"
    }
  ];

  return (
    <div className="relative bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 min-h-screen flex items-center justify-center">
      {/* Background overlay with delivery person and vehicles */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      {/* Left side text */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-white z-10">
        <h1 className="text-4xl font-bold mb-2">Delivery hai?</h1>
        <h2 className="text-3xl font-bold">#Done Samjho</h2>
      </div>

      {/* Center card */}
      <div className="relative z-20 bg-white rounded-2xl shadow-2xl p-8 mx-4 max-w-md w-full">
        {/* City selector */}
        <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
          <MapPin className="h-5 w-5 text-blue-600 mr-2" />
          <span className="text-gray-700 font-medium">City: Bihar</span>
          <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <button
                key={index}
                onClick={() => window.location.href = service.link}
                className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-2 group-hover:bg-blue-200 transition-colors">
                  <IconComponent className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-xs text-gray-700 text-center font-medium leading-tight">
                  {service.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Get an Estimate button */}
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 text-lg rounded-xl shadow-lg"
        >
          Get an Estimate
          <div className="ml-2 text-sm opacity-90">
            Book your ride
          </div>
        </Button>
      </div>
    </div>
  );
};

export default FeaturesSection;
