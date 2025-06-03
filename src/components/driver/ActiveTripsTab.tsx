
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
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle } from 'lucide-react';

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

  // Handle trip rejection
  const handleTripRejection = (trackingId: string, reason: string, region: string) => {
    console.log("Trip Rejected:", { trackingId, reason, region });
    
    // Update UI by removing the rejected trip from pending trips
    setPendingTrips(pendingTrips.filter(trip => trip.id !== trackingId));
    
    toast({
      title: "Trip Rejected",
      description: `Trip ${trackingId} has been rejected`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Trips</CardTitle>
        <CardDescription>
          View and manage your current assigned trips
        </CardDescription>
      </CardHeader>
      <CardContent>
        {pendingTrips.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tracking ID</TableHead>
                <TableHead>Pickup Location</TableHead>
                <TableHead>Dropoff Location</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingTrips.map((trip) => (
                <TableRow key={trip.id}>
                  <TableCell className="font-medium">{trip.id}</TableCell>
                  <TableCell>{trip.pickup}</TableCell>
                  <TableCell>{trip.dropoff}</TableCell>
                  <TableCell>₹{trip.amount}</TableCell>
                  <TableCell className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Accept
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Accept Trip</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to accept this trip?
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <p><strong>Tracking ID:</strong> {trip.id}</p>
                          <p><strong>Pickup:</strong> {trip.pickup}</p>
                          <p><strong>Dropoff:</strong> {trip.dropoff}</p>
                          <p><strong>Amount:</strong> ₹{trip.amount}</p>
                          <p><strong>You Earn:</strong> ₹{trip.driverAmount}</p>
                        </div>
                        <DialogFooter>
                          <Button type="button" variant="outline" onClick={() => {}}>
                            Cancel
                          </Button>
                          <Button 
                            onClick={() => {
                              // Add trip to completed, remove from pending
                              const updatedTrip = {...trip, status: 'completed'};
                              setCompletedTrips(prev => [...prev, updatedTrip]);
                              setPendingTrips(pendingTrips.filter(t => t.id !== trip.id));
                              toast({
                                title: "Trip Accepted",
                                description: `You have accepted trip ${trip.id}`,
                              });
                            }}
                          >
                            Accept Trip
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200">
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Reject Trip</DialogTitle>
                          <DialogDescription>
                            Please provide a reason for rejection.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4 space-y-4">
                          <div>
                            <label className="text-sm font-medium">Reason</label>
                            <Select defaultValue="distance">
                              <SelectTrigger>
                                <SelectValue placeholder="Select reason" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="distance">Too far</SelectItem>
                                <SelectItem value="traffic">Heavy traffic</SelectItem>
                                <SelectItem value="vehicle">Vehicle issue</SelectItem>
                                <SelectItem value="personal">Personal reason</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Region</label>
                            <Select defaultValue="north">
                              <SelectTrigger>
                                <SelectValue placeholder="Select region" />
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
                        <DialogFooter>
                          <Button type="button" variant="outline" onClick={() => {}}>
                            Cancel
                          </Button>
                          <Button 
                            variant="destructive"
                            onClick={() => handleTripRejection(trip.id, "distance", "north")}
                          >
                            Reject Trip
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500">No active trips at the moment</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActiveTripsTab;
