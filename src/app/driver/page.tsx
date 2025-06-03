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
import Link from 'next/link';
import { ArrowLeft, Truck, Navigation, Wallet, History, Package, Settings } from 'lucide-react';

// Import TableFooter along with other table components
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Import refactored components
import ActiveTripsTab, { Trip } from '@/components/driver/ActiveTripsTab';
import CompletedTripsTab from '@/components/driver/CompletedTripsTab';
import WalletTab from '@/components/driver/WalletTab';
import VehicleTab from '@/components/driver/VehicleTab';
import TripUpdateTab from '@/components/driver/TripUpdateTab';
import ProfileTab from '@/components/driver/ProfileTab';

// Mock data for trips
const mockTrips = [
  { 
    id: 'TR-1001', 
    pickup: '123 Main St, Bangalore', 
    dropoff: '456 Park Ave, Bangalore', 
    status: 'pending', 
    amount: 450, 
    commission: 45,
    driverAmount: 405,
    date: '2024-05-11'
  },
  { 
    id: 'TR-1002', 
    pickup: '789 Church St, Bangalore', 
    dropoff: '321 MG Road, Bangalore', 
    status: 'completed', 
    amount: 350, 
    commission: 35,
    driverAmount: 315, 
    date: '2024-05-10'
  },
  { 
    id: 'TR-1003', 
    pickup: '555 Brigade Road, Bangalore', 
    dropoff: '777 Indiranagar, Bangalore', 
    status: 'completed', 
    amount: 550, 
    commission: 55,
    driverAmount: 495, 
    date: '2024-05-09'
  },
];

export default function DriverPanelPage() {
  const router = useRouter();
  const [isDriver, setIsDriver] = useState(true); // In a real app, this would come from authentication state
  const [completedTrips, setCompletedTrips] = useState<Trip[]>(mockTrips.filter(trip => trip.status === 'completed'));
  const [pendingTrips, setPendingTrips] = useState<Trip[]>(mockTrips.filter(trip => trip.status === 'pending'));
  const [walletBalance, setWalletBalance] = useState(750);

  // Check if user is a driver and redirect if not
  useEffect(() => {
    if (!isDriver) {
      router.push('/');
    }
  }, [isDriver, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="inline-flex items-center text-gray-600 hover:text-blue-700">
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span>Back to Home</span>
              </Link>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">Driver Panel</div>
            <div className="flex items-center">
              <div className="mr-4">
                <span className="font-medium">Wallet:</span> 
                <span className="text-blue-700">₹{walletBalance}</span>
              </div>
              <Button variant="ghost" onClick={() => router.push('/')} className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <Tabs defaultValue="active-trips">
          <TabsList className="grid grid-cols-6 mb-8 bg-gray-100">
            <TabsTrigger 
              value="active-trips" 
              className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white"
            >
              <Package className="mr-2 h-4 w-4" />
              <span>Active Trips</span>
            </TabsTrigger>
            <TabsTrigger 
              value="completed-trips" 
              className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white"
            >
              <History className="mr-2 h-4 w-4" />
              <span>Trip History</span>
            </TabsTrigger>
            <TabsTrigger 
              value="wallet" 
              className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white"
            >
              <Wallet className="mr-2 h-4 w-4" />
              <span>Wallet</span>
            </TabsTrigger>
            <TabsTrigger 
              value="vehicle" 
              className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white"
            >
              <Truck className="mr-2 h-4 w-4" />
              <span>Vehicle</span>
            </TabsTrigger>
            <TabsTrigger 
              value="trip-update" 
              className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white"
            >
              <Navigation className="mr-2 h-4 w-4" />
              <span>Trip Update</span>
            </TabsTrigger>
            <TabsTrigger 
              value="profile" 
              className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white"
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Active Trips Tab */}
          <TabsContent value="active-trips">
            <ActiveTripsTab 
              pendingTrips={pendingTrips} 
              setPendingTrips={setPendingTrips} 
              setCompletedTrips={setCompletedTrips} 
            />
          </TabsContent>
          
          {/* Completed Trips Tab */}
          <TabsContent value="completed-trips">
            <CompletedTripsTab completedTrips={completedTrips} />
          </TabsContent>
          
          {/* Wallet Tab */}
          <TabsContent value="wallet">
            <WalletTab walletBalance={walletBalance} setWalletBalance={setWalletBalance} />
          </TabsContent>
          
          {/* Vehicle Tab */}
          <TabsContent value="vehicle">
            <VehicleTab />
          </TabsContent>
          
          {/* Trip Update Tab */}
          <TabsContent value="trip-update">
            <TripUpdateTab />
          </TabsContent>
          
          {/* Profile Tab */}
          <TabsContent value="profile">
            <ProfileTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
