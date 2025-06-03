
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Navigation, Upload } from 'lucide-react';

// Define validation schema for trip update
const tripUpdateSchema = z.object({
  trackingId: z.string().min(1, "Tracking ID is required"),
  status: z.enum(["accept", "pickup", "out", "delivered"]),
  notes: z.string().optional(),
  image: z.any().optional(), // Changed from FileList to any for server-side compatibility
});

// Define the type for form data
type TripUpdateFormData = z.infer<typeof tripUpdateSchema>;

export const TripUpdateTab = () => {
  const { toast } = useToast();

  // Trip update form
  const tripUpdateForm = useForm<TripUpdateFormData>({
    resolver: zodResolver(tripUpdateSchema),
    defaultValues: {
      trackingId: "",
      status: "accept" as const,
      notes: "",
    },
  });

  // Handle trip update submission
  const onTripUpdateSubmit = (data: TripUpdateFormData) => {
    console.log("Trip Update Data:", data);
    
    // Simulate API call
    toast({
      title: "Trip Updated",
      description: `Trip ${data.trackingId} status updated to ${data.status}`,
    });
    
    tripUpdateForm.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trip Update</CardTitle>
        <CardDescription>
          Update the status of your current trip
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...tripUpdateForm}>
          <form onSubmit={tripUpdateForm.handleSubmit(onTripUpdateSubmit)} className="space-y-4">
            <FormField
              control={tripUpdateForm.control}
              name="trackingId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tracking ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter tracking ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={tripUpdateForm.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Update Status</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="accept">Accept Order</SelectItem>
                      <SelectItem value="pickup">Pickup Order</SelectItem>
                      <SelectItem value="out">Out for Delivery</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={tripUpdateForm.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any additional notes about the delivery" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {tripUpdateForm.watch("status") === "delivered" && (
              <div>
                <FormLabel>Upload Delivery Proof</FormLabel>
                <div className="border border-dashed rounded-lg p-8 mt-2 flex flex-col items-center justify-center">
                  <Upload className="h-12 w-12 text-gray-400 mb-3" />
                  <p className="text-sm text-gray-500 mb-2">
                    Upload an image as proof of delivery
                  </p>
                  <Input type="file" className="hidden" id="delivery-proof" />
                  <label htmlFor="delivery-proof">
                    <Button type="button" variant="outline">
                      Choose File
                    </Button>
                  </label>
                </div>
              </div>
            )}
            
            <Button type="submit">
              <Navigation className="mr-2 h-4 w-4" />
              Update Trip Status
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TripUpdateTab;
