
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trip } from './ActiveTripsTab';

interface CompletedTripsTabProps {
  completedTrips: Trip[];
}

export const CompletedTripsTab = ({ completedTrips }: CompletedTripsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trip History</CardTitle>
        <CardDescription>
          View all your completed deliveries and earnings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking ID</TableHead>
              <TableHead>Pickup</TableHead>
              <TableHead>Dropoff</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead>Your Earning</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {completedTrips.map((trip) => (
              <TableRow key={trip.id}>
                <TableCell className="font-medium">{trip.id}</TableCell>
                <TableCell>{trip.pickup}</TableCell>
                <TableCell>{trip.dropoff}</TableCell>
                <TableCell>{trip.date}</TableCell>
                <TableCell>₹{trip.amount}</TableCell>
                <TableCell>₹{trip.commission}</TableCell>
                <TableCell>₹{trip.driverAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell>₹{completedTrips.reduce((acc, trip) => acc + trip.amount, 0)}</TableCell>
              <TableCell>₹{completedTrips.reduce((acc, trip) => acc + trip.commission, 0)}</TableCell>
              <TableCell>₹{completedTrips.reduce((acc, trip) => acc + trip.driverAmount, 0)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CompletedTripsTab;
