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
  // Use provided trips or fallback to mock data
  const trips = propTrips || [
    {
      id: "T-5678",
      customer: "Emily Johnson",
      driver: "Michael Brown",
      pickup: "123 Main St",
      dropoff: "456 Oak Ave",
      status: "in-progress",
      startTime: "10:30 AM",
      estimatedArrival: "10:55 AM",
    },
    {
      id: "T-5679",
      customer: "Daniel Wilson",
      driver: "Sarah Davis",
      pickup: "789 Pine Rd",
      dropoff: "321 Elm St",
      status: "in-progress",
      startTime: "10:15 AM",
      estimatedArrival: "10:45 AM",
    },
    {
      id: "T-5680",
      customer: "Jessica Martinez",
      driver: "Robert Taylor",
      pickup: "555 Cedar Ln",
      dropoff: "777 Maple Dr",
      status: "pending",
      startTime: "10:45 AM",
      estimatedArrival: "11:15 AM",
    },
  ]

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
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 in progress, 1 pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Drivers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Out of 42 total drivers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Trip Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24 min</div>
            <p className="text-xs text-muted-foreground">-2 min from yesterday</p>
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
            {trips.map((trip) => (
              <TableRow key={trip.id}>
                <TableCell className="font-medium">{trip.id}</TableCell>
                <TableCell>{trip.customer}</TableCell>
                <TableCell>{trip.driver}</TableCell>
                <TableCell>{getStatusBadge(trip.status)}</TableCell>
                <TableCell>{trip.startTime}</TableCell>
                <TableCell>{trip.estimatedArrival}</TableCell>
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
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Contact Driver</DropdownMenuItem>
                      <DropdownMenuItem>Contact Customer</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
