"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function UsersPage() {
  const users = [
    {
      id: "U-3001",
      name: "John Smith",
      phone: "+1 (555) 123-4567",
      email: "john.smith@example.com",
      registrationDate: "2023-01-15",
      trips: 12,
      status: "active",
    },
    {
      id: "U-3002",
      name: "Sarah Williams",
      phone: "+1 (555) 234-5678",
      email: "sarah.williams@example.com",
      registrationDate: "2023-02-20",
      trips: 8,
      status: "active",
    },
    {
      id: "U-3003",
      name: "Robert Davis",
      phone: "+1 (555) 345-6789",
      email: "robert.davis@example.com",
      registrationDate: "2023-02-28",
      trips: 5,
      status: "active",
    },
    {
      id: "U-3004",
      name: "Jennifer Miller",
      phone: "+1 (555) 456-7890",
      email: "jennifer.miller@example.com",
      registrationDate: "2023-03-10",
      trips: 3,
      status: "inactive",
    },
    {
      id: "U-3005",
      name: "Michael Garcia",
      phone: "+1 (555) 567-8901",
      email: "michael.garcia@example.com",
      registrationDate: "2023-03-15",
      trips: 7,
      status: "active",
    },
    {
      id: "U-3006",
      name: "Lisa Rodriguez",
      phone: "+1 (555) 678-9012",
      email: "lisa.rodriguez@example.com",
      registrationDate: "2023-04-05",
      trips: 2,
      status: "active",
    },
    {
      id: "U-3007",
      name: "William Martinez",
      phone: "+1 (555) 789-0123",
      email: "william.martinez@example.com",
      registrationDate: "2023-04-12",
      trips: 4,
      status: "blocked",
    },
    {
      id: "U-3008",
      name: "Elizabeth Taylor",
      phone: "+1 (555) 890-1234",
      email: "elizabeth.taylor@example.com",
      registrationDate: "2023-04-20",
      trips: 1,
      status: "active",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>
      case "blocked":
        return <Badge variant="destructive">Blocked</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">User Management</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Users</CardTitle>
          <CardDescription>View and filter users by status or search by name, email, or phone.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
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
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="search-users" className="text-sm font-medium">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="search-users" type="search" placeholder="Search users..." className="pl-8" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
          <CardDescription>A list of all users who have registered with OTP.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Trips</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.registrationDate}</TableCell>
                  <TableCell>{user.trips}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
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
