"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/admin/date-picker"
import { Download, Filter, Search } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function BookingsPage() {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  const bookings = [
    {
      id: "B-1234",
      customer: "John Smith",
      driver: "David Johnson",
      date: "2023-05-21",
      amount: "$45.00",
      status: "completed",
    },
    {
      id: "B-1235",
      customer: "Sarah Williams",
      driver: "Michael Brown",
      date: "2023-05-21",
      amount: "$32.50",
      status: "completed",
    },
    {
      id: "B-1236",
      customer: "Robert Davis",
      driver: "James Wilson",
      date: "2023-05-21",
      amount: "$28.75",
      status: "in-progress",
    },
    {
      id: "B-1237",
      customer: "Jennifer Miller",
      driver: "Pending Assignment",
      date: "2023-05-22",
      amount: "$52.25",
      status: "pending",
    },
    {
      id: "B-1238",
      customer: "Michael Garcia",
      driver: "Pending Assignment",
      date: "2023-05-22",
      amount: "$38.00",
      status: "pending",
    },
    {
      id: "B-1239",
      customer: "Lisa Rodriguez",
      driver: "Thomas Anderson",
      date: "2023-05-20",
      amount: "$42.75",
      status: "completed",
    },
    {
      id: "B-1240",
      customer: "William Martinez",
      driver: "Christopher Lee",
      date: "2023-05-20",
      amount: "$35.50",
      status: "completed",
    },
    {
      id: "B-1241",
      customer: "Elizabeth Taylor",
      driver: "Daniel White",
      date: "2023-05-19",
      amount: "$48.25",
      status: "completed",
    },
    {
      id: "B-1242",
      customer: "James Johnson",
      driver: "Matthew Harris",
      date: "2023-05-19",
      amount: "$29.75",
      status: "cancelled",
    },
    {
      id: "B-1243",
      customer: "Patricia Brown",
      driver: "Andrew Wilson",
      date: "2023-05-18",
      amount: "$37.50",
      status: "completed",
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
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Booking Details</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Bookings</CardTitle>
          <CardDescription>View and filter booking details by date, status, or search terms.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="grid gap-2">
              <label htmlFor="start-date" className="text-sm font-medium">
                Start Date
              </label>
              <DatePicker
                id="start-date"
                selected={startDate}
                onSelect={setStartDate}
                placeholder="Select start date"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="end-date" className="text-sm font-medium">
                End Date
              </label>
              <DatePicker id="end-date" selected={endDate} onSelect={setEndDate} placeholder="Select end date" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="status" className="text-sm font-medium">
                Status
              </label>
              <Select>
                <SelectTrigger id="status">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="search" className="text-sm font-medium">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="search" type="search" placeholder="Search bookings..." className="pl-8" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Booking List</CardTitle>
          <CardDescription>A list of all bookings with their details.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>{booking.customer}</TableCell>
                  <TableCell>{booking.driver}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>{booking.amount}</TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Filter className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Booking</DropdownMenuItem>
                        <DropdownMenuItem>Contact Customer</DropdownMenuItem>
                        <DropdownMenuItem>Contact Driver</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
