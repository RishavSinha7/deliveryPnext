"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from 'next/link';
import { ArrowLeft, Truck, Navigation, Wallet, History, Package, Settings, Menu, User, LogOut } from 'lucide-react';

// Import refactored components
import ActiveTripsTab from '@/components/driver/ActiveTripsTab';
import CompletedTripsTab from '@/components/driver/CompletedTripsTab';
import WalletTab from '@/components/driver/WalletTab';
import VehicleTab from '@/components/driver/VehicleTab';
import TripUpdateTab from '@/components/driver/TripUpdateTab';
import ProfileTab from '@/components/driver/ProfileTab';

import { useDriverData } from '@/hooks/use-driver-data';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

export default function DriverPanelPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const {
    driverProfile,
    trips,
    availableBookings,
    earnings,
    vehicles,
    isLoading,
    error,
    updateOnlineStatus,
    acceptBooking,
    startTrip,
    completeTrip,
    updateLocation,
    refreshData,
  } = useDriverData();

  const [activeTab, setActiveTab] = useState("active-trips");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if user is authenticated and redirect if not
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, router]);

  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const navigationItems = [
    { id: "active-trips", label: "Active Trips", icon: Package },
    { id: "completed-trips", label: "Trip History", icon: History },
    { id: "wallet", label: "Wallet", icon: Wallet },
    { id: "vehicle", label: "Vehicle", icon: Truck },
    { id: "trip-update", label: "Location", icon: Navigation },
    { id: "profile", label: "Profile", icon: Settings },
  ];

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setIsMobileMenuOpen(false);
  };

  const handleStartTrip = async (bookingId: string) => {
    try {
      await startTrip(bookingId);
      toast({
        title: "Trip Started",
        description: "You have successfully started the trip",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to start trip",
        variant: "destructive",
      });
    }
  };

  const handleCompleteTrip = async (bookingId: string, data: any) => {
    try {
      await completeTrip(bookingId, data);
      toast({
        title: "Trip Completed",
        description: "Trip has been completed successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to complete trip",
        variant: "destructive",
      });
    }
  };

  const handleUpdateLocation = async (bookingId: string, latitude: number, longitude: number) => {
    try {
      await updateLocation(bookingId, { latitude, longitude });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update location",
        variant: "destructive",
      });
    }
  };

  const handleAcceptBooking = async (bookingId: string) => {
    try {
      await acceptBooking(bookingId);
      toast({
        title: "Booking Accepted",
        description: "You have successfully accepted the booking",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to accept booking",
        variant: "destructive",
      });
    }
  };

  const handleStatusToggle = async () => {
    if (!driverProfile) return;
    
    try {
      await updateOnlineStatus(!driverProfile.isOnline);
      toast({
        title: "Status Updated",
        description: `You are now ${!driverProfile.isOnline ? 'online' : 'offline'}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update status",
        variant: "destructive",
      });
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading driver data...</p>
        </div>
      </div>
    );
  }

  // Show error state if driver profile is not found
  if (!driverProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Driver Profile Not Found</h1>
          <p className="text-gray-600 mb-4">Please complete your driver profile setup</p>
          <Button onClick={() => router.push('/auth')}>
            Go to Authentication
          </Button>
        </div>
      </div>
    );
  }

  const walletBalance = earnings?.totalEarnings || 0;
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from 'next/link';
import { ArrowLeft, Truck, Navigation, Wallet, History, Package, Settings, Menu, User, LogOut } from 'lucide-react';

// Import refactored components
import ActiveTripsTab from '@/components/driver/ActiveTripsTab';
import CompletedTripsTab from '@/components/driver/CompletedTripsTab';
import WalletTab from '@/components/driver/WalletTab';
import VehicleTab from '@/components/driver/VehicleTab';
import TripUpdateTab from '@/components/driver/TripUpdateTab';
import ProfileTab from '@/components/driver/ProfileTab';

import { useDriverData } from '@/hooks/use-driver-data';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

export default function DriverPanelPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const {
    driverProfile,
    trips,
    availableBookings,
    earnings,
    vehicles,
    isLoading,
    error,
    updateOnlineStatus,
    acceptBooking,
    startTrip,
    completeTrip,
    updateLocation,
    refreshData,
  } = useDriverData();

  const [activeTab, setActiveTab] = useState("active-trips");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if user is authenticated and redirect if not
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, router]);

  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const navigationItems = [
    { id: "active-trips", label: "Active Trips", icon: Package },
    { id: "completed-trips", label: "Trip History", icon: History },
    { id: "wallet", label: "Wallet", icon: Wallet },
    { id: "vehicle", label: "Vehicle", icon: Truck },
    { id: "trip-update", label: "Location", icon: Navigation },
    { id: "profile", label: "Profile", icon: Settings },
  ];

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setIsMobileMenuOpen(false);
  };

  const handleStartTrip = async (bookingId: string) => {
    try {
      await startTrip(bookingId);
      toast({
        title: "Trip Started",
        description: "You have successfully started the trip",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to start trip",
        variant: "destructive",
      });
    }
  };

  const handleCompleteTrip = async (bookingId: string, data: any) => {
    try {
      await completeTrip(bookingId, data);
      toast({
        title: "Trip Completed",
        description: "Trip has been completed successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to complete trip",
        variant: "destructive",
      });
    }
  };

  const handleUpdateLocation = async (bookingId: string, latitude: number, longitude: number) => {
    try {
      await updateLocation(bookingId, { latitude, longitude });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update location",
        variant: "destructive",
      });
    }
  };

  const handleAcceptBooking = async (bookingId: string) => {
    try {
      await acceptBooking(bookingId);
      toast({
        title: "Booking Accepted",
        description: "You have successfully accepted the booking",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to accept booking",
        variant: "destructive",
      });
    }
  };

  const handleStatusToggle = async () => {
    if (!driverProfile) return;
    
    try {
      await updateOnlineStatus(!driverProfile.isOnline);
      toast({
        title: "Status Updated",
        description: `You are now ${!driverProfile.isOnline ? 'online' : 'offline'}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update status",
        variant: "destructive",
      });
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading driver data...</p>
        </div>
      </div>
    );
  }

  // Show error state if driver profile is not found
  if (!driverProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Driver Profile Not Found</h1>
          <p className="text-gray-600 mb-4">Please complete your driver profile setup</p>
          <Button onClick={() => router.push('/auth')}>
            Go to Authentication
          </Button>
        </div>
      </div>
    );
  }

  const walletBalance = earnings?.totalEarnings || 0;
  const activeTrips = trips.filter(trip => trip.status === 'ACTIVE' || trip.status === 'ACCEPTED');
  const completedTrips = trips.filter(trip => trip.status === 'COMPLETED');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Desktop Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="inline-flex items-center text-gray-600 hover:text-blue-700 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Back</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                Driver Panel
              </h1>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:flex items-center bg-blue-50 px-3 py-1 rounded-full">
                <Wallet className="h-4 w-4 text-blue-600 mr-1" />
                <span className="text-sm font-medium text-blue-800">₹{walletBalance}</span>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => router.push('/')} 
                className="hidden sm:flex text-gray-600 hover:text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
              
              {/* Mobile Menu Button */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="sm:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center space-x-3 pb-4 border-b">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{driverProfile.user.fullName}</p>
                        <p className="text-sm text-gray-500">{driverProfile.isOnline ? 'Online' : 'Offline'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between py-4 bg-blue-50 rounded-lg mt-4 px-3">
                      <span className="text-sm font-medium text-blue-900">Wallet Balance</span>
                      <span className="text-lg font-bold text-blue-600">₹{walletBalance}</span>
                    </div>
                    
                    <nav className="flex-1 mt-6">
                      <div className="space-y-2">
                        {navigationItems.map((item) => {
                          const IconComponent = item.icon;
                          return (
                            <button
                              key={item.id}
                              onClick={() => handleTabChange(item.id)}
                              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
                                activeTab === item.id
                                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                  : 'text-gray-600 hover:bg-gray-100'
                              }`}
                            >
                              <IconComponent className="h-5 w-5" />
                              <span className="font-medium">{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </nav>
                    
                    <div className="border-t pt-4">
                      <Button 
                        variant="ghost" 
                        onClick={() => router.push('/')}
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Logout
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-grow">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          {/* Desktop Navigation */}
          <div className="hidden sm:block bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <TabsList className="h-auto p-0 bg-transparent border-0 w-full justify-start">
                {navigationItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <TabsTrigger
                      key={item.id}
                      value={item.id}
                      className="flex items-center space-x-2 px-4 py-3 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent rounded-none hover:text-blue-600 transition-colors"
                    >
                      <IconComponent className="h-4 w-4" />
                      <span className="hidden md:inline font-medium">{item.label}</span>
                      <span className="md:hidden font-medium">{item.label.split(' ')[0]}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>
          </div>

          {/* Content Area */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">          
            {/* Active Trips Tab */}
            <TabsContent value="active-trips" className="mt-0">
              <ActiveTripsTab 
                trips={activeTrips}
                availableBookings={availableBookings}
                onAcceptBooking={handleAcceptBooking}
                onStartTrip={handleStartTrip}
              />
            </TabsContent>
            
            {/* Completed Trips Tab */}
            <TabsContent value="completed-trips" className="mt-0">
              <CompletedTripsTab trips={completedTrips} />
            </TabsContent>
            
            {/* Wallet Tab */}
            <TabsContent value="wallet" className="mt-0">
              <WalletTab 
                earnings={earnings}
                isLoading={isLoading}
              />
            </TabsContent>
            
            {/* Vehicle Tab */}
            <TabsContent value="vehicle" className="mt-0">
              <VehicleTab 
                vehicles={vehicles}
                onRefresh={refreshData}
              />
            </TabsContent>
            
            {/* Trip Update Tab */}
            <TabsContent value="trip-update" className="mt-0">
              <TripUpdateTab 
                activeTrips={activeTrips}
                onUpdateLocation={handleUpdateLocation}
              />
            </TabsContent>
            
            {/* Profile Tab */}
            <TabsContent value="profile" className="mt-0">
              <ProfileTab 
                driverProfile={driverProfile}
                isLoading={isLoading}
                onUpdateProfile={async (data) => {
                  // TODO: Implement update profile functionality
                  console.log('Update profile:', data);
                }}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
