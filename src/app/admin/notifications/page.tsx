"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NotificationsPage() {
  const notifications = [
    {
      id: "N-1001",
      title: "Weekend Discount",
      message: "Get 25% off on all rides this weekend!",
      sentTo: "All Users",
      sentDate: "2023-05-19",
      status: "sent",
      openRate: "68%",
    },
    {
      id: "N-1002",
      title: "New Feature Alert",
      message: "You can now schedule rides in advance!",
      sentTo: "All Users",
      sentDate: "2023-05-15",
      status: "sent",
      openRate: "72%",
    },
    {
      id: "N-1003",
      title: "Driver App Update",
      message: "Please update your driver app to the latest version for improved features.",
      sentTo: "All Drivers",
      sentDate: "2023-05-12",
      status: "sent",
      openRate: "85%",
    },
    {
      id: "N-1004",
      title: "Holiday Schedule",
      message: "We will be operating with limited drivers during the upcoming holiday.",
      sentTo: "All Users",
      sentDate: "2023-05-10",
      status: "sent",
      openRate: "64%",
    },
    {
      id: "N-1005",
      title: "Summer Promotion",
      message: "Use code SUMMER15 for 15% off your rides all summer!",
      sentTo: "Draft",
      sentDate: "-",
      status: "draft",
      openRate: "-",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge className="bg-green-500">Sent</Badge>
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      case "scheduled":
        return <Badge variant="secondary">Scheduled</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Notification Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Notification
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Notification</DialogTitle>
              <DialogDescription>Create a notification to send to users or drivers.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Notification Title</Label>
                <Input id="title" placeholder="Enter notification title" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Enter notification message" rows={4} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="recipient">Send To</Label>
                  <Select>
                    <SelectTrigger id="recipient">
                      <SelectValue placeholder="Select recipients" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-users">All Users</SelectItem>
                      <SelectItem value="all-drivers">All Drivers</SelectItem>
                      <SelectItem value="active-users">Active Users</SelectItem>
                      <SelectItem value="active-drivers">Active Drivers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="send-option">Send Option</Label>
                  <Select>
                    <SelectTrigger id="send-option">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="send-now">Send Now</SelectItem>
                      <SelectItem value="schedule">Schedule</SelectItem>
                      <SelectItem value="save-draft">Save as Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="schedule-date">Schedule Date (if applicable)</Label>
                <Input id="schedule-date" type="datetime-local" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Create Notification</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Notifications</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification History</CardTitle>
              <CardDescription>View all notifications sent to users and drivers.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Sent To</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Open Rate</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell className="font-medium">{notification.id}</TableCell>
                      <TableCell>{notification.title}</TableCell>
                      <TableCell>{notification.sentTo}</TableCell>
                      <TableCell>{notification.sentDate}</TableCell>
                      <TableCell>{getStatusBadge(notification.status)}</TableCell>
                      <TableCell>{notification.openRate}</TableCell>
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
        </TabsContent>
        <TabsContent value="sent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sent Notifications</CardTitle>
              <CardDescription>View all notifications that have been sent.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Sent To</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Open Rate</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notifications
                    .filter((notification) => notification.status === "sent")
                    .map((notification) => (
                      <TableRow key={notification.id}>
                        <TableCell className="font-medium">{notification.id}</TableCell>
                        <TableCell>{notification.title}</TableCell>
                        <TableCell>{notification.sentTo}</TableCell>
                        <TableCell>{notification.sentDate}</TableCell>
                        <TableCell>{getStatusBadge(notification.status)}</TableCell>
                        <TableCell>{notification.openRate}</TableCell>
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
        </TabsContent>
        <TabsContent value="draft" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Draft Notifications</CardTitle>
              <CardDescription>View all notifications saved as drafts.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Sent To</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Open Rate</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notifications
                    .filter((notification) => notification.status === "draft")
                    .map((notification) => (
                      <TableRow key={notification.id}>
                        <TableCell className="font-medium">{notification.id}</TableCell>
                        <TableCell>{notification.title}</TableCell>
                        <TableCell>{notification.sentTo}</TableCell>
                        <TableCell>{notification.sentDate}</TableCell>
                        <TableCell>{getStatusBadge(notification.status)}</TableCell>
                        <TableCell>{notification.openRate}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              Send
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
        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Notifications</CardTitle>
              <CardDescription>View all notifications scheduled to be sent.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Sent To</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Open Rate</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notifications
                    .filter((notification) => notification.status === "scheduled")
                    .map((notification) => (
                      <TableRow key={notification.id}>
                        <TableCell className="font-medium">{notification.id}</TableCell>
                        <TableCell>{notification.title}</TableCell>
                        <TableCell>{notification.sentTo}</TableCell>
                        <TableCell>{notification.sentDate}</TableCell>
                        <TableCell>{getStatusBadge(notification.status)}</TableCell>
                        <TableCell>{notification.openRate}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              Cancel
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
    </div>
  )
}
