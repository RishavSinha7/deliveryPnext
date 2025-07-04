"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Edit, Plus, Search, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function VehiclesPage() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null)

  const vehicles = [
    {
      id: "V-2001",
      model: "Toyota Camry",
      type: "Sedan",
      year: 2020,
      licensePlate: "ABC-1234",
      driver: "David Johnson",
      status: "active",
      lastMaintenance: "2023-04-15",
    },
    {
      id: "V-2002",
      model: "Honda CR-V",
      type: "SUV",
      year: 2021,
      licensePlate: "DEF-5678",
      driver: "Michael Brown",
      status: "active",
      lastMaintenance: "2023-04-22",
    },
    {
      id: "V-2003",
      model: "Toyota Corolla",
      type: "Sedan",
      year: 2019,
      licensePlate: "GHI-9012",
      driver: "Sarah Davis",
      status: "active",
      lastMaintenance: "2023-04-10",
    },
    {
      id: "V-2004",
      model: "Honda Odyssey",
      type: "Minivan",
      year: 2022,
      licensePlate: "JKL-3456",
      driver: "James Wilson",
      status: "maintenance",
      lastMaintenance: "2023-05-18",
    },
    {
      id: "V-2005",
      model: "Mercedes-Benz E-Class",
      type: "Luxury",
      year: 2021,
      licensePlate: "MNO-7890",
      driver: "Robert Taylor",
      status: "active",
      lastMaintenance: "2023-04-30",
    },
    {
      id: "V-2006",
      model: "Toyota Prius",
      type: "Sedan",
      year: 2020,
      licensePlate: "PQR-1234",
      driver: "Thomas Anderson",
      status: "active",
      lastMaintenance: "2023-05-05",
    },
    {
      id: "V-2007",
      model: "Ford Explorer",
      type: "SUV",
      year: 2021,
      licensePlate: "STU-5678",
      driver: "Christopher Lee",
      status: "inactive",
      lastMaintenance: "2023-03-15",
    },
    {
      id: "V-2008",
      model: "Toyota Camry",
      type: "Sedan",
      year: 2022,
      licensePlate: "VWX-9012",
      driver: "Daniel White",
      status: "pending-approval",
      lastMaintenance: "2023-05-10",
    },
  ]

  const pendingVehicles = [
    {
      id: "V-2009",
      model: "Honda Civic",
      type: "Sedan",
      year: 2021,
      licensePlate: "YZA-3456",
      driver: "Jennifer Adams",
      status: "pending-approval",
      submittedDate: "2023-05-18",
    },
    {
      id: "V-2010",
      model: "Toyota RAV4",
      type: "SUV",
      year: 2022,
      licensePlate: "BCD-7890",
      driver: "William Scott",
      status: "pending-approval",
      submittedDate: "2023-05-19",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>
      case "maintenance":
        return <Badge variant="secondary">Maintenance</Badge>
      case "pending-approval":
        return <Badge className="bg-yellow-500">Pending Approval</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const handleEditVehicle = (vehicle: any) => {
    setSelectedVehicle(vehicle)
    setIsEditDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Vehicle Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Vehicle
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Vehicle</DialogTitle>
              <DialogDescription>Enter the details of the new vehicle to add it to the system.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="model">Vehicle Model</Label>
                  <Input id="model" placeholder="Enter vehicle model" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Vehicle Type</Label>
                  <Select>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedan">Sedan</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="minivan">Minivan</SelectItem>
                      <SelectItem value="luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="year">Year</Label>
                  <Input id="year" type="number" placeholder="Enter year" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="license">License Plate</Label>
                  <Input id="license" placeholder="Enter license plate" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="driver">Assign Driver</Label>
                <Select>
                  <SelectTrigger id="driver">
                    <SelectValue placeholder="Select driver" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="david">David Johnson</SelectItem>
                    <SelectItem value="michael">Michael Brown</SelectItem>
                    <SelectItem value="sarah">Sarah Davis</SelectItem>
                    <SelectItem value="james">James Wilson</SelectItem>
                    <SelectItem value="robert">Robert Taylor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Add Vehicle</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Vehicles</CardTitle>
          <CardDescription>
            View and filter vehicles by type, status, or search by model or license plate.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="grid gap-2">
              <label htmlFor="type-filter" className="text-sm font-medium">
                Vehicle Type
              </label>
              <Select>
                <SelectTrigger id="type-filter">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="minivan">Minivan</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="status-filter" className="text-sm font-medium">
                Status
              </label>
              <Select>
                <SelectTrigger id="status-filter">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="pending-approval">Pending Approval</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="search-vehicles" className="text-sm font-medium">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="search-vehicles" type="search" placeholder="Search vehicles..." className="pl-8" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Vehicles</TabsTrigger>
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>License Plate</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Maintenance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell className="font-medium">{vehicle.id}</TableCell>
                      <TableCell>{vehicle.model}</TableCell>
                      <TableCell>{vehicle.type}</TableCell>
                      <TableCell>{vehicle.licensePlate}</TableCell>
                      <TableCell>{vehicle.driver}</TableCell>
                      <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
                      <TableCell>{vehicle.lastMaintenance}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditVehicle(vehicle)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>License Plate</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Submitted Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingVehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell className="font-medium">{vehicle.id}</TableCell>
                      <TableCell>{vehicle.model}</TableCell>
                      <TableCell>{vehicle.type}</TableCell>
                      <TableCell>{vehicle.licensePlate}</TableCell>
                      <TableCell>{vehicle.driver}</TableCell>
                      <TableCell>{vehicle.submittedDate}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-green-50 hover:bg-green-100 text-green-600 hover:text-green-700"
                          >
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Approve</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Reject</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Vehicle</DialogTitle>
            <DialogDescription>Update the vehicle&apos;s information.</DialogDescription>
          </DialogHeader>
          {selectedVehicle && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-model">Vehicle Model</Label>
                  <Input id="edit-model" defaultValue={selectedVehicle.model} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-type">Vehicle Type</Label>
                  <Select defaultValue={selectedVehicle.type.toLowerCase()}>
                    <SelectTrigger id="edit-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedan">Sedan</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="minivan">Minivan</SelectItem>
                      <SelectItem value="luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-year">Year</Label>
                  <Input id="edit-year" type="number" defaultValue={selectedVehicle.year} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-license">License Plate</Label>
                  <Input id="edit-license" defaultValue={selectedVehicle.licensePlate} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-driver">Assign Driver</Label>
                <Select>
                  <SelectTrigger id="edit-driver">
                    <SelectValue placeholder={selectedVehicle.driver} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="david">David Johnson</SelectItem>
                    <SelectItem value="michael">Michael Brown</SelectItem>
                    <SelectItem value="sarah">Sarah Davis</SelectItem>
                    <SelectItem value="james">James Wilson</SelectItem>
                    <SelectItem value="robert">Robert Taylor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select defaultValue={selectedVehicle.status}>
                  <SelectTrigger id="edit-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-maintenance">Last Maintenance Date</Label>
                <Input id="edit-maintenance" type="date" defaultValue={selectedVehicle.lastMaintenance} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsEditDialogOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
