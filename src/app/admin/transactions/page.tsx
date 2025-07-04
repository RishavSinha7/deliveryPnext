"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/admin/date-picker"
import { useState } from "react"

export default function TransactionsPage() {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  const transactions = [
    {
      id: "T-5001",
      bookingId: "B-1234",
      customer: "John Smith",
      driver: "David Johnson",
      date: "2023-05-21",
      amount: "$45.00",
      driverCommission: "$36.00",
      platformFee: "$9.00",
      paymentMethod: "Credit Card",
      status: "completed",
    },
    {
      id: "T-5002",
      bookingId: "B-1235",
      customer: "Sarah Williams",
      driver: "Michael Brown",
      date: "2023-05-21",
      amount: "$32.50",
      driverCommission: "$26.00",
      platformFee: "$6.50",
      paymentMethod: "Credit Card",
      status: "completed",
    },
    {
      id: "T-5003",
      bookingId: "B-1236",
      customer: "Robert Davis",
      driver: "James Wilson",
      date: "2023-05-21",
      amount: "$28.75",
      driverCommission: "$23.00",
      platformFee: "$5.75",
      paymentMethod: "Wallet",
      status: "completed",
    },
    {
      id: "T-5004",
      bookingId: "B-1239",
      customer: "Lisa Rodriguez",
      driver: "Thomas Anderson",
      date: "2023-05-20",
      amount: "$42.75",
      driverCommission: "$34.20",
      platformFee: "$8.55",
      paymentMethod: "Credit Card",
      status: "completed",
    },
    {
      id: "T-5005",
      bookingId: "B-1240",
      customer: "William Martinez",
      driver: "Christopher Lee",
      date: "2023-05-20",
      amount: "$35.50",
      driverCommission: "$28.40",
      platformFee: "$7.10",
      paymentMethod: "Cash",
      status: "completed",
    },
    {
      id: "T-5006",
      bookingId: "B-1241",
      customer: "Elizabeth Taylor",
      driver: "Daniel White",
      date: "2023-05-19",
      amount: "$48.25",
      driverCommission: "$38.60",
      platformFee: "$9.65",
      paymentMethod: "Credit Card",
      status: "completed",
    },
    {
      id: "T-5007",
      bookingId: "B-1243",
      customer: "Patricia Brown",
      driver: "Andrew Wilson",
      date: "2023-05-18",
      amount: "$37.50",
      driverCommission: "$30.00",
      platformFee: "$7.50",
      paymentMethod: "Wallet",
      status: "completed",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      case "refunded":
        return <Badge variant="secondary">Refunded</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Transaction Management</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Transactions</CardTitle>
          <CardDescription>View and filter transactions by date, driver, or payment method.</CardDescription>
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
              <label htmlFor="driver-filter" className="text-sm font-medium">
                Driver
              </label>
              <Select>
                <SelectTrigger id="driver-filter">
                  <SelectValue placeholder="All drivers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All drivers</SelectItem>
                  <SelectItem value="david">David Johnson</SelectItem>
                  <SelectItem value="michael">Michael Brown</SelectItem>
                  <SelectItem value="james">James Wilson</SelectItem>
                  <SelectItem value="thomas">Thomas Anderson</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="payment-method" className="text-sm font-medium">
                Payment Method
              </label>
              <Select>
                <SelectTrigger id="payment-method">
                  <SelectValue placeholder="All methods" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All methods</SelectItem>
                  <SelectItem value="credit-card">Credit Card</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="wallet">Wallet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction Summary</CardTitle>
          <CardDescription>Overview of all transactions and commissions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$270.25</div>
                <p className="text-xs text-muted-foreground">For selected period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Driver Commissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$216.20</div>
                <p className="text-xs text-muted-foreground">80% of total revenue</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Platform Fees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$54.05</div>
                <p className="text-xs text-muted-foreground">20% of total revenue</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction List</CardTitle>
          <CardDescription>A list of all transactions with their details.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Booking ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Driver Commission</TableHead>
                <TableHead>Platform Fee</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.bookingId}</TableCell>
                  <TableCell>{transaction.customer}</TableCell>
                  <TableCell>{transaction.driver}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.driverCommission}</TableCell>
                  <TableCell>{transaction.platformFee}</TableCell>
                  <TableCell>{transaction.paymentMethod}</TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
