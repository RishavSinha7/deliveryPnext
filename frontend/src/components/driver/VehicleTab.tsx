
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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { File, Upload } from 'lucide-react';

// Define validation schema for vehicle onboarding
const vehicleOnboardingSchema = z.object({
  vehicleType: z.enum(["bike", "auto", "car", "truck", "van"]),
  vehicleNumber: z.string().min(1, "Vehicle number is required"),
  vehicleModel: z.string().min(1, "Vehicle model is required"),
  yearOfManufacture: z.string().min(1, "Year is required"),
  licenseNumber: z.string().min(1, "License number is required"),
  insuranceNumber: z.string().min(1, "Insurance number is required"),
});

// Define the type for form data
type VehicleFormData = z.infer<typeof vehicleOnboardingSchema>;

export const VehicleTab = () => {
  const { toast } = useToast();

  // Vehicle onboarding form
  const vehicleOnboardingForm = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleOnboardingSchema),
    defaultValues: {
      vehicleType: "bike" as const,
      vehicleNumber: "",
      vehicleModel: "",
      yearOfManufacture: "",
      licenseNumber: "",
      insuranceNumber: "",
    },
  });

  // Handle vehicle onboarding submission
  const onVehicleOnboardingSubmit = (data: VehicleFormData) => {
    console.log("Vehicle Onboarding Data:", data);
    
    toast({
      title: "Vehicle Onboarding Request Sent",
      description: "Your request has been submitted for admin approval",
    });
    
    vehicleOnboardingForm.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicle Management</CardTitle>
        <CardDescription>
          Register a new vehicle or manage your existing vehicles
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Your Current Vehicle</h3>
          <div className="bg-gray-50 border rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Vehicle Type</p>
                <p className="font-medium">Honda Activa (Bike)</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Registration Number</p>
                <p className="font-medium">KA-01-AB-1234</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Year of Manufacture</p>
                <p className="font-medium">2021</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Insurance Valid Until</p>
                <p className="font-medium">Nov 15, 2025</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Register New Vehicle</h3>
          <Form {...vehicleOnboardingForm}>
            <form onSubmit={vehicleOnboardingForm.handleSubmit(onVehicleOnboardingSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={vehicleOnboardingForm.control}
                  name="vehicleType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select vehicle type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="bike">Bike</SelectItem>
                          <SelectItem value="auto">Auto Rickshaw</SelectItem>
                          <SelectItem value="car">Car</SelectItem>
                          <SelectItem value="truck">Truck</SelectItem>
                          <SelectItem value="van">Van</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={vehicleOnboardingForm.control}
                  name="vehicleNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Number</FormLabel>
                      <FormControl>
                        <Input placeholder="KA-01-XX-1234" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={vehicleOnboardingForm.control}
                  name="vehicleModel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Model</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Honda Activa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={vehicleOnboardingForm.control}
                  name="yearOfManufacture"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year of Manufacture</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 2021" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={vehicleOnboardingForm.control}
                  name="licenseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Number</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., KA0120210001234" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={vehicleOnboardingForm.control}
                  name="insuranceNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Insurance Policy Number</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., INS-12345-2023" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div>
                <FormLabel>Upload Documents</FormLabel>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="border border-dashed rounded-lg p-4 flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Upload Vehicle RC
                    </p>
                    <Input type="file" className="hidden" id="rc-upload" />
                    <label htmlFor="rc-upload">
                      <Button type="button" variant="outline" size="sm" className="mt-2">
                        Choose File
                      </Button>
                    </label>
                  </div>
                  <div className="border border-dashed rounded-lg p-4 flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Upload Insurance
                    </p>
                    <Input type="file" className="hidden" id="insurance-upload" />
                    <label htmlFor="insurance-upload">
                      <Button type="button" variant="outline" size="sm" className="mt-2">
                        Choose File
                      </Button>
                    </label>
                  </div>
                </div>
              </div>
              
              <Button type="submit">
                <File className="mr-2 h-4 w-4" />
                Submit for Approval
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleTab;
