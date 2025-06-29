
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, MapPin, Clock, DollarSign, Navigation } from 'lucide-react';

// Trip type definition
export interface Trip {
  id: string;
  pickup: string;
  dropoff: string;
  status: string;
  amount: number;
  commission: number;
  driverAmount: number;
  date: string;
}

interface ActiveTripsTabProps {
  pendingTrips: Trip[];
  setPendingTrips: React.Dispatch<React.SetStateAction<Trip[]>>;
  setCompletedTrips: React.Dispatch<React.SetStateAction<Trip[]>>;
}

export const ActiveTripsTab = ({ pendingTrips, setPendingTrips, setCompletedTrips }: ActiveTripsTabProps) => {
  const { toast } = useToast();
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [rejectionReason, setRejectionReason] = useState("distance");
  const [rejectionRegion, setRejectionRegion] = useState("north");

  // Handle trip acceptance
  const handleTripAcceptance = (trip: Trip) => {
    const updatedTrip = {...trip, status: 'completed'};
    setCompletedTrips(prev => [...prev, updatedTrip]);
    setPendingTrips(pendingTrips.filter(t => t.id !== trip.id));
    toast({
      title: "Trip Accepted! 🎉",
      description: `You have successfully accepted trip ${trip.id}`,
    });
  };

  // Handle trip rejection
  const handleTripRejection = (trip: Trip) => {
    setPendingTrips(pendingTrips.filter(t => t.id !== trip.id));
    toast({
      title: "Trip Rejected",
      description: `Trip ${trip.id} has been rejected - ${rejectionReason}`,
      variant: "destructive",
    });
  };

  // Mobile Card Component
  const TripCard = ({ trip }: { trip: Trip }) => (
    <Card className="mb-4 hover:shadow-md transition-all duration-200 border-l-4 border-l-blue-500">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="font-mono text-xs">
              {trip.id}
            </Badge>
            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
              Pending
            </Badge>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-green-600">₹{trip.amount}</div>
            <div className="text-xs text-gray-500">You earn: ₹{trip.driverAmount}</div>
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-start space-x-3">
            <div className="w-3 h-3 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">Pickup Location</div>
              <div className="text-sm font-medium text-gray-900 leading-tight">{trip.pickup}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 pl-1">
            <div className="w-1 h-8 bg-gray-300"></div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-3 h-3 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></div>
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">Drop-off Location</div>
              <div className="text-sm font-medium text-gray-900 leading-tight">{trip.dropoff}</div>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                <CheckCircle className="mr-2 h-4 w-4" />
                Accept
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Accept Trip</span>
                </DialogTitle>
                <DialogDescription>
                  Confirm trip acceptance and start your journey
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Trip ID:</span>
                    <Badge variant="secondary" className="font-mono">{trip.id}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Total Amount:</span>
                    <span className="text-lg font-bold text-green-600">₹{trip.amount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Your Earnings:</span>
                    <span className="text-lg font-bold text-blue-600">₹{trip.driverAmount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Commission:</span>
                    <span className="text-sm text-gray-500">₹{trip.commission}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium">Pickup:</span>
                  </div>
                  <p className="text-sm text-gray-600 pl-4">{trip.pickup}</p>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium">Drop-off:</span>
                  </div>
                  <p className="text-sm text-gray-600 pl-4">{trip.dropoff}</p>
                </div>
              </div>
              <DialogFooter className="space-x-2">
                <DialogTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogTrigger>
                <DialogTrigger asChild>
                  <Button 
                    onClick={() => handleTripAcceptance(trip)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Navigation className="mr-2 h-4 w-4" />
                    Start Trip
                  </Button>
                </DialogTrigger>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1 border-red-200 text-red-600 hover:bg-red-50">
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2 text-red-600">
                  <XCircle className="h-5 w-5" />
                  <span>Reject Trip</span>
                </DialogTitle>
                <DialogDescription>
                  Please provide a reason for rejecting this trip
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-red-800 mb-1">Trip: {trip.id}</div>
                  <div className="text-xs text-red-600">{trip.pickup} → {trip.dropoff}</div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Reason for Rejection</label>
                    <Select value={rejectionReason} onValueChange={setRejectionReason}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="distance">Distance too far</SelectItem>
                        <SelectItem value="traffic">Heavy traffic expected</SelectItem>
                        <SelectItem value="vehicle">Vehicle maintenance issue</SelectItem>
                        <SelectItem value="personal">Personal emergency</SelectItem>
                        <SelectItem value="time">Not available at pickup time</SelectItem>
                        <SelectItem value="other">Other reason</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Preferred Region</label>
                    <Select value={rejectionRegion} onValueChange={setRejectionRegion}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="north">North Bangalore</SelectItem>
                        <SelectItem value="south">South Bangalore</SelectItem>
                        <SelectItem value="east">East Bangalore</SelectItem>
                        <SelectItem value="west">West Bangalore</SelectItem>
                        <SelectItem value="central">Central Bangalore</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter className="space-x-2">
                <DialogTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogTrigger>
                <DialogTrigger asChild>
                  <Button 
                    variant="destructive"
                    onClick={() => handleTripRejection(trip)}
                  >
                    Confirm Rejection
                  </Button>
                </DialogTrigger>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">Active Trips</CardTitle>
              <CardDescription className="text-gray-600">
                View and manage your current assigned trips
              </CardDescription>
            </div>
            {pendingTrips.length > 0 && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {pendingTrips.length} Active
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {pendingTrips.length > 0 ? (
            <>
              {/* Mobile Card Layout */}
              <div className="md:hidden space-y-4">
                {pendingTrips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} />
                ))}
              </div>

              {/* Desktop Table Layout */}
              <div className="hidden md:block overflow-hidden rounded-lg border border-gray-200">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold text-gray-900">Trip Details</TableHead>
                      <TableHead className="font-semibold text-gray-900">Route</TableHead>
                      <TableHead className="font-semibold text-gray-900">Earnings</TableHead>
                      <TableHead className="font-semibold text-gray-900 text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingTrips.map((trip) => (
                      <TableRow key={trip.id} className="hover:bg-gray-50 transition-colors">
                        <TableCell className="py-4">
                          <div className="space-y-1">
                            <Badge variant="secondary" className="font-mono text-xs">
                              {trip.id}
                            </Badge>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                                Pending
                              </Badge>
                              <span className="text-xs text-gray-500">{trip.date}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="space-y-2 max-w-xs">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                              <span className="text-sm text-gray-900 truncate">{trip.pickup}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                              <span className="text-sm text-gray-900 truncate">{trip.dropoff}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="space-y-1">
                            <div className="text-lg font-bold text-green-600">₹{trip.amount}</div>
                            <div className="text-sm text-blue-600 font-medium">You: ₹{trip.driverAmount}</div>
                            <div className="text-xs text-gray-500">Fee: ₹{trip.commission}</div>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex space-x-2 justify-center">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                  <CheckCircle className="mr-1 h-4 w-4" />
                                  Accept
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                {/* Same dialog content as mobile */}
                                <DialogHeader>
                                  <DialogTitle className="flex items-center space-x-2">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    <span>Accept Trip</span>
                                  </DialogTitle>
                                  <DialogDescription>
                                    Confirm trip acceptance and start your journey
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                                    <div className="flex justify-between items-center">
                                      <span className="text-sm font-medium text-gray-600">Trip ID:</span>
                                      <Badge variant="secondary" className="font-mono">{trip.id}</Badge>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-sm font-medium text-gray-600">Total Amount:</span>
                                      <span className="text-lg font-bold text-green-600">₹{trip.amount}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-sm font-medium text-gray-600">Your Earnings:</span>
                                      <span className="text-lg font-bold text-blue-600">₹{trip.driverAmount}</span>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                      <span className="text-sm font-medium">Pickup:</span>
                                    </div>
                                    <p className="text-sm text-gray-600 pl-4">{trip.pickup}</p>
                                    
                                    <div className="flex items-center space-x-2 pt-2">
                                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                      <span className="text-sm font-medium">Drop-off:</span>
                                    </div>
                                    <p className="text-sm text-gray-600 pl-4">{trip.dropoff}</p>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <DialogTrigger asChild>
                                    <Button variant="outline">Cancel</Button>
                                  </DialogTrigger>
                                  <DialogTrigger asChild>
                                    <Button 
                                      onClick={() => handleTripAcceptance(trip)}
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      <Navigation className="mr-2 h-4 w-4" />
                                      Start Trip
                                    </Button>
                                  </DialogTrigger>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50">
                                  <XCircle className="mr-1 h-4 w-4" />
                                  Reject
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                {/* Same rejection dialog as mobile */}
                                <DialogHeader>
                                  <DialogTitle className="flex items-center space-x-2 text-red-600">
                                    <XCircle className="h-5 w-5" />
                                    <span>Reject Trip</span>
                                  </DialogTitle>
                                  <DialogDescription>
                                    Please provide a reason for rejecting this trip
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="bg-red-50 p-4 rounded-lg">
                                    <div className="text-sm font-medium text-red-800 mb-1">Trip: {trip.id}</div>
                                    <div className="text-xs text-red-600">{trip.pickup} → {trip.dropoff}</div>
                                  </div>
                                  
                                  <div className="space-y-4">
                                    <div>
                                      <label className="text-sm font-medium text-gray-700 mb-2 block">Reason</label>
                                      <Select value={rejectionReason} onValueChange={setRejectionReason}>
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="distance">Distance too far</SelectItem>
                                          <SelectItem value="traffic">Heavy traffic expected</SelectItem>
                                          <SelectItem value="vehicle">Vehicle maintenance issue</SelectItem>
                                          <SelectItem value="personal">Personal emergency</SelectItem>
                                          <SelectItem value="time">Not available at pickup time</SelectItem>
                                          <SelectItem value="other">Other reason</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    
                                    <div>
                                      <label className="text-sm font-medium text-gray-700 mb-2 block">Preferred Region</label>
                                      <Select value={rejectionRegion} onValueChange={setRejectionRegion}>
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="north">North Bangalore</SelectItem>
                                          <SelectItem value="south">South Bangalore</SelectItem>
                                          <SelectItem value="east">East Bangalore</SelectItem>
                                          <SelectItem value="west">West Bangalore</SelectItem>
                                          <SelectItem value="central">Central Bangalore</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <DialogTrigger asChild>
                                    <Button variant="outline">Cancel</Button>
                                  </DialogTrigger>
                                  <DialogTrigger asChild>
                                    <Button 
                                      variant="destructive"
                                      onClick={() => handleTripRejection(trip)}
                                    >
                                      Confirm Rejection
                                    </Button>
                                  </DialogTrigger>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Navigation className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Trips</h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                You don't have any active trips at the moment. New trip requests will appear here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ActiveTripsTab;
