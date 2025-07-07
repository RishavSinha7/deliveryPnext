import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface LiveTripsProps {
  trips?: any[]
}

export function LiveTrips({ trips: propTrips }: LiveTripsProps) {
  // Use provided trips (no fallback to hardcoded data)
  const trips = propTrips || []

  // Calculate real-time stats from the actual trips data
  const liveTripsCount = trips.length
  const inProgressTrips = trips.filter(trip => trip.status === 'IN_PROGRESS' || trip.status === 'ACTIVE' || trip.status === 'ONGOING').length
  const pendingTrips = trips.filter(trip => trip.status === 'PENDING').length
  
  // Get unique active drivers from trips
  const activeDriversCount = new Set(trips.map(trip => trip.driverId || trip.driver?.id).filter(Boolean)).size
  
  // Calculate average trip time if we have trip duration data
  const completedTripsWithDuration = trips.filter(trip => trip.duration && trip.status === 'COMPLETED')
  const averageTripTime = completedTripsWithDuration.length > 0 
    ? Math.round(completedTripsWithDuration.reduce((sum, trip) => sum + trip.duration, 0) / completedTripsWithDuration.length)
    : 0

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "in-progress":
        return <Badge className="bg-blue-500">In Progress</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Live Trips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{liveTripsCount}</div>
            <p className="text-xs text-muted-foreground">
              {inProgressTrips} in progress, {pendingTrips} pending
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Drivers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeDriversCount}</div>
            <p className="text-xs text-muted-foreground">Currently on trips</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Trip Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averageTripTime > 0 ? `${averageTripTime} min` : 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              {completedTripsWithDuration.length > 0 
                ? `Based on ${completedTripsWithDuration.length} completed trips`
                : 'No completed trips data'
              }
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Trip ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>Est. Arrival</TableHead>
              <TableHead>Location</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trips.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No active trips found
                </TableCell>
              </TableRow>
            ) : (
              trips.map((trip) => (
                <TableRow key={trip.id}>
                  <TableCell className="font-medium">
                    {trip.bookingNumber || trip.id}
                  </TableCell>
                  <TableCell>
                    {trip.customer?.fullName || trip.customerName || 'N/A'}
                  </TableCell>
                  <TableCell>
                    {trip.driver?.user?.fullName || trip.driverName || 'N/A'}
                  </TableCell>
                  <TableCell>{getStatusBadge(trip.status)}</TableCell>
                  <TableCell>
                    {trip.startTime || trip.createdAt ? 
                      new Date(trip.startTime || trip.createdAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : 'N/A'
                    }
                  </TableCell>
                  <TableCell>
                    {trip.estimatedArrival || trip.estimatedDeliveryTime ? 
                      new Date(trip.estimatedArrival || trip.estimatedDeliveryTime).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : 'N/A'
                    }
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      Track
                    </Button>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-lg backdrop-blur-none opacity-100 z-50">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Contact Driver</DropdownMenuItem>
                        <DropdownMenuItem>Contact Customer</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
