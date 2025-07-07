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

// Import refactored components with named exports
import { ActiveTripsTab } from '@/components/driver/ActiveTripsTab';
import { CompletedTripsTab } from '@/components/driver/CompletedTripsTab';
import { WalletTab } from '@/components/driver/WalletTab';
import { VehicleTab } from '@/components/driver/VehicleTab';
import { TripUpdateTab } from '@/components/driver/TripUpdateTab';
import { ProfileTab } from '@/components/driver/ProfileTab';

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

  const activeTrips = trips.filter(trip => trip.status !== 'COMPLETED');
  const completedTrips = trips.filter(trip => trip.status === 'COMPLETED');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Back Button */}
            <Link href="/">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Home</span>
              </Button>
            </Link>

            {/* Title */}
            <div className="flex-1 text-center">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Driver Panel</h1>
            </div>

            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-6">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.id}
                        variant={activeTab === item.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => handleTabChange(item.id)}
                      >
                        <Icon className="mr-3 h-4 w-4" />
                        {item.label}
                      </Button>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <TabsList className="grid w-full grid-cols-6 mb-6">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <TabsTrigger
                    key={item.id}
                    value={item.id}
                    className="flex items-center space-x-2 px-4 py-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden lg:inline">{item.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          <div className="space-y-6">
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
              <CompletedTripsTab trips={trips} />
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
