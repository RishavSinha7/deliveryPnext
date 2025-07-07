'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MapPin, Clock, CheckCircle, User, ArrowRight, ArrowDown, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BookingData {
  id: string;
  bookingNumber: string;
  status: string;
  pickupAddress: string;
  dropoffAddress: string;
  estimatedFare: number;
  driver?: {
    user: {
      fullName: string;
      phoneNumber: string;
    };
  };
  createdAt: string;
}

export default function RideStatus() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const pickup = searchParams.get('pickup') || 'Pickup Location';
  const drop = searchParams.get('drop') || 'Drop Location';
  const vehicleType = searchParams.get('type') || 'truck';
  
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch booking data
  const fetchBookingData = async () => {
    if (!bookingId) return;
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/bookings/${bookingId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      if (response.ok) {
        const result = await response.json();
        setBookingData(result.data);
      } else {
        setError('Failed to fetch booking data');
      }
    } catch (err) {
      console.error('Error fetching booking:', err);
      setError('An error occurred while fetching booking data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingData();
    
    // Set up polling to refresh booking status every 10 seconds
    const interval = setInterval(fetchBookingData, 10000);
    
    return () => clearInterval(interval);
  }, [bookingId]);

  const getStatusSteps = (currentStatus: string) => {
    const steps = [
      {
        id: 1,
        title: 'Booking Confirmed',
        icon: CheckCircle,
        completed: true,
        current: currentStatus === 'PENDING',
        status: 'PENDING'
      },
      {
        id: 2,
        title: 'Driver Assigned',
        icon: User,
        completed: ['DRIVER_ASSIGNED', 'DRIVER_ARRIVED', 'IN_PROGRESS', 'COMPLETED'].includes(currentStatus),
        current: currentStatus === 'DRIVER_ASSIGNED',
        status: 'DRIVER_ASSIGNED'
      },
      {
        id: 3,
        title: 'Driver Arrived',
        icon: MapPin,
        completed: ['DRIVER_ARRIVED', 'IN_PROGRESS', 'COMPLETED'].includes(currentStatus),
        current: currentStatus === 'DRIVER_ARRIVED',
        status: 'DRIVER_ARRIVED'
      },
      {
        id: 4,
        title: 'In Progress',
        icon: Clock,
        completed: ['IN_PROGRESS', 'COMPLETED'].includes(currentStatus),
        current: currentStatus === 'IN_PROGRESS',
        status: 'IN_PROGRESS'
      },
      {
        id: 5,
        title: 'Completed',
        icon: CheckCircle,
        completed: currentStatus === 'COMPLETED',
        current: currentStatus === 'COMPLETED',
        status: 'COMPLETED'
      }
    ];
    
    return steps;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'DRIVER_ASSIGNED': return 'bg-blue-100 text-blue-800';
      case 'DRIVER_ARRIVED': return 'bg-green-100 text-green-800';
      case 'IN_PROGRESS': return 'bg-purple-100 text-purple-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafbfc] flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin h-8 w-8 mx-auto mb-4" />
          <p>Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fafbfc] flex items-center justify-center">
        <Alert className="max-w-md">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

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
  const currentStatus = bookingData?.status || 'PENDING';
  const statusSteps = getStatusSteps(currentStatus);

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Booking Info Card */}
        {bookingData && (
          <Card className="mb-8 shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-lg">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center text-xl">
                  <MapPin className="mr-2 h-5 w-5" />
                  Booking #{bookingData.bookingNumber}
                </CardTitle>
                <Badge className={`${getStatusColor(currentStatus)} border-0`}>
                  {currentStatus.replace('_', ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Trip Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm text-gray-500">Pickup Location</p>
                        <p className="text-lg font-semibold text-gray-900">{bookingData.pickupAddress}</p>
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
                        <p className="text-lg font-semibold text-gray-900">{bookingData.dropoffAddress}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {bookingData.driver && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Driver Details</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Name:</span> {bookingData.driver.user.fullName}</p>
                      <p><span className="font-medium">Phone:</span> {bookingData.driver.user.phoneNumber}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Location Card (fallback for when booking data is not available) */}
        {!bookingData && (
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
        )}

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
                  <strong>Booking Status: {currentStatus.replace('_', ' ')}</strong>
                  {currentStatus === 'PENDING' && ' - Waiting for admin to assign a driver.'}
                  {currentStatus === 'DRIVER_ASSIGNED' && ' - Driver is on the way to pickup location.'}
                  {currentStatus === 'DRIVER_ARRIVED' && ' - Driver has arrived at pickup location.'}
                  {currentStatus === 'IN_PROGRESS' && ' - Your item is being transported.'}
                  {currentStatus === 'COMPLETED' && ' - Delivery completed successfully!'}
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
              
              <div className="mt-6 text-center">
                <Button 
                  variant="outline" 
                  onClick={fetchBookingData}
                  className="w-full"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh Status
                </Button>
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