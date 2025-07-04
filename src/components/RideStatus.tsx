'use client';

import { useSearchParams } from 'next/navigation';
import { MapPin, Clock, CheckCircle, User, ArrowRight, ArrowDown } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function RideStatus() {
  const searchParams = useSearchParams();
  const pickup = searchParams.get('pickup') || 'Pickup Location';
  const drop = searchParams.get('drop') || 'Drop Location';
  const vehicleType = searchParams.get('type') || 'truck'; // Default to truck

  // Vehicle data based on type
  const truckOptions = [
    { name: 'Mini 3W', price: '₹430 - ₹460', capacity: '50 Kg', image: '/truck.png' },
    { name: 'Eeco', price: '₹1205 - ₹1235', capacity: '500 kg', image: '/truck.png' },
    { name: '3 Wheeler', price: '₹1080 - ₹1110', capacity: '500 kg', image: '/truck.png' },
    { name: 'Tata Ace', price: '₹1315 - ₹1345', capacity: '750 kg', image: '/truck.png' },
    { name: 'Pickup 8Ft', price: '₹1635 - ₹1665', capacity: '1250 kg', image: '/truck.png' },
    { name: 'Tata 1.7t', price: '₹3225 - ₹3255', capacity: '1500 kg', image: '/truck.png' },
  ];

  const bikeOptions = [
    { name: '2 Wheeler', price: '₹32.5', capacity: '20 kg', image: '/bike.png' },
    { name: 'Bike Express', price: '₹45 - ₹55', capacity: '25 kg', image: '/bike.png' },
    { name: 'Bike Premium', price: '₹65 - ₹75', capacity: '30 kg', image: '/bike.png' },
  ];

  const currentVehicles = vehicleType === 'bike' ? bikeOptions : truckOptions;

  const statusSteps = [
    {
      id: 1,
      title: 'Your ride is waiting for confirmation',
      icon: Clock,
      completed: true,
      current: false,
    },
    {
      id: 2,
      title: 'Waiting for the driver to accept the ride',
      icon: User,
      completed: false,
      current: true,
    },
    {
      id: 3,
      title: 'A driver has been assigned to your location. It will arrive shortly',
      icon: CheckCircle,
      completed: false,
      current: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Location Card */}
        <Card className="mb-8 shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center text-xl">
              <MapPin className="mr-2 h-5 w-5" />
              Trip Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm text-gray-500">Pickup Location</p>
                  <p className="text-lg font-semibold text-gray-900">{pickup}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-12 bg-gray-400"></div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div>
                  <p className="text-sm text-gray-500">Drop Location</p>
                  <p className="text-lg font-semibold text-gray-900">{drop}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Steps and Vehicle Selection - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Status Steps */}
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-lg">
              <CardTitle className="flex items-center text-xl">
                <Clock className="mr-2 h-5 w-5" />
                Ride Status
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {/* Alert/Info Box */}
              <Alert className="border-blue-200 bg-blue-50 mb-6">
                <Clock className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Your ride request is being processed.</strong> We are confirming your pickup and drop locations. Please wait while we assign a driver to your ride.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-6">
                {statusSteps.map((step, index) => (
                  <div key={step.id} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step.completed 
                          ? 'bg-green-100 text-green-600' 
                          : step.current 
                            ? 'bg-blue-100 text-blue-600' 
                            : 'bg-gray-100 text-gray-400'
                      }`}>
                        <step.icon className="h-5 w-5" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className={`text-sm font-medium ${
                          step.completed 
                            ? 'text-green-800' 
                            : step.current 
                              ? 'text-blue-800' 
                              : 'text-gray-500'
                        }`}>
                          {step.title}
                        </p>
                        {step.completed && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Completed
                          </Badge>
                        )}
                        {step.current && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            In Progress
                          </Badge>
                        )}
                      </div>
                      
                      {index < statusSteps.length - 1 && (
                        <div className="mt-4 ml-5 w-px h-6 bg-gray-200"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Vehicle Selection Card */}
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-lg">
              <CardTitle className="flex items-center text-xl">
                <MapPin className="mr-2 h-5 w-5" />
                Vehicle Selection
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm text-gray-500">Selected Vehicle Type</p>
                    <p className="text-lg font-semibold text-gray-900">{vehicleType === 'bike' ? 'Bike' : 'Truck'}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {currentVehicles.map((vehicle) => (
                    <div key={vehicle.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
                      <div className="flex items-center space-x-4">
                        <img src={vehicle.image} alt={vehicle.name} className="w-16 h-16 object-cover rounded-md" />
                        <div>
                          <p className="text-md font-semibold text-gray-900">{vehicle.name}</p>
                          <p className="text-sm text-gray-500">Capacity: {vehicle.capacity}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{vehicle.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Footer content can be added here if needed */}
        </div>
      </footer>
    </div>
  );
}