"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Edit, Plus, Search, Trash } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function CouponsPage() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null)

  const coupons = [
    {
      id: "C-1001",
      code: "WELCOME20",
      discount: "20%",
      maxDiscount: "$50",
      validFrom: "2023-05-01",
      validTo: "2023-06-30",
      usageLimit: 1,
      usageCount: 45,
      status: "active",
    },
    {
      id: "C-1002",
      code: "SUMMER15",
      discount: "15%",
      maxDiscount: "$30",
      validFrom: "2023-06-01",
      validTo: "2023-08-31",
      usageLimit: 2,
      usageCount: 28,
      status: "active",
    },
    {
      id: "C-1003",
      code: "FLAT10",
      discount: "$10",
      maxDiscount: "$10",
      validFrom: "2023-05-15",
      validTo: "2023-07-15",
      usageLimit: 1,
      usageCount: 56,
      status: "active",
    },
    {
      id: "C-1004",
      code: "WEEKEND25",
      discount: "25%",
      maxDiscount: "$40",
      validFrom: "2023-05-01",
      validTo: "2023-05-31",
      usageLimit: 1,
      usageCount: 32,
      status: "expired",
    },
    {
      id: "C-1005",
      code: "NEWUSER30",
      discount: "30%",
      maxDiscount: "$60",
      validFrom: "2023-06-15",
      validTo: "2023-07-15",
      usageLimit: 1,
      usageCount: 0,
      status: "scheduled",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "expired":
        return <Badge variant="outline">Expired</Badge>
      case "scheduled":
        return <Badge variant="secondary">Scheduled</Badge>
      case "disabled":
        return <Badge variant="destructive">Disabled</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const handleEditCoupon = (coupon: any) => {
    setSelectedCoupon(coupon)
    setIsEditDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Coupon Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Coupon</DialogTitle>
              <DialogDescription>Create a new coupon code for your customers.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="code">Coupon Code</Label>
                  <Input id="code" placeholder="e.g., SUMMER25" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="discount-type">Discount Type</Label>
                  <Select>
                    <SelectTrigger id="discount-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="discount-value">Discount Value</Label>
                  <Input id="discount-value" placeholder="e.g., 25 or 10" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="max-discount">Max Discount</Label>
                  <Input id="max-discount" placeholder="e.g., 50" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="valid-from">Valid From</Label>
                  <Input id="valid-from" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="valid-to">Valid To</Label>
                  <Input id="valid-to" type="date" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="usage-limit">Usage Limit Per User</Label>
                  <Input id="usage-limit" type="number" placeholder="e.g., 1" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Add Coupon</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Coupons</CardTitle>
          <CardDescription>View and filter coupons by status or search by code.</CardDescription>
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
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="disabled">Disabled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="search-coupons" className="text-sm font-medium">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="search-coupons" type="search" placeholder="Search coupons..." className="pl-8" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Coupon List</CardTitle>
          <CardDescription>Manage your discount coupons and promotions.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Max Discount</TableHead>
                <TableHead>Valid Period</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-medium">{coupon.id}</TableCell>
                  <TableCell>{coupon.code}</TableCell>
                  <TableCell>{coupon.discount}</TableCell>
                  <TableCell>{coupon.maxDiscount}</TableCell>
                  <TableCell>
                    {coupon.validFrom} to {coupon.validTo}
                  </TableCell>
                  <TableCell>
                    {coupon.usageCount} / {coupon.usageLimit === -1 ? "∞" : coupon.usageLimit}
                  </TableCell>
                  <TableCell>{getStatusBadge(coupon.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditCoupon(coupon)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Coupon</DialogTitle>
            <DialogDescription>Update the coupon&apos;s details.</DialogDescription>
          </DialogHeader>
          {selectedCoupon && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-code">Coupon Code</Label>
                  <Input id="edit-code" defaultValue={selectedCoupon.code} disabled />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-discount">Discount</Label>
                  <Input id="edit-discount" defaultValue={selectedCoupon.discount} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-max-discount">Max Discount</Label>
                  <Input id="edit-max-discount" defaultValue={selectedCoupon.maxDiscount} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-usage-limit">Usage Limit Per User</Label>
                  <Input id="edit-usage-limit" type="number" defaultValue={selectedCoupon.usageLimit} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-valid-from">Valid From</Label>
                  <Input id="edit-valid-from" type="date" defaultValue={selectedCoupon.validFrom} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-valid-to">Valid To</Label>
                  <Input id="edit-valid-to" type="date" defaultValue={selectedCoupon.validTo} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select defaultValue={selectedCoupon.status}>
                  <SelectTrigger id="edit-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="disabled">Disabled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="show-on-web" defaultChecked />
                <Label htmlFor="show-on-web">Show on website (visible to users)</Label>
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
