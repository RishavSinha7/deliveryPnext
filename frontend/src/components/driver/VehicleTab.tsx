import React, { useState } from 'react';
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
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { File, Upload, Car, Truck, Bike, Loader2 } from 'lucide-react';
import { vehicleApi } from '@/lib/api';

// Define validation schema for vehicle onboarding
const vehicleOnboardingSchema = z.object({
  vehicleType: z.enum(["BIKE", "AUTO", "CAR", "TRUCK", "VAN"]),
  vehicleNumber: z.string().min(1, "Vehicle number is required"),
  vehicleModel: z.string().min(1, "Vehicle model is required"),
  yearOfManufacture: z.string().min(1, "Year is required"),
  insuranceNumber: z.string().min(1, "Insurance number is required"),
});

// Define the type for form data
type VehicleFormData = z.infer<typeof vehicleOnboardingSchema>;

export interface Vehicle {
  id: string;
  vehicleType: string;
  vehicleNumber: string;
  vehicleModel: string;
  yearOfManufacture: string;
  insuranceNumber: string;
  isActive: boolean;
}

interface VehicleTabProps {
  vehicles: Vehicle[];
  onRefresh: () => Promise<void>;
  onAddVehicle?: (vehicleData: any) => Promise<any>;
}

export const VehicleTab = ({ vehicles, onRefresh, onAddVehicle }: VehicleTabProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rcFile, setRcFile] = useState<File | null>(null);
  const [insuranceFile, setInsuranceFile] = useState<File | null>(null);

  // Vehicle onboarding form
  const vehicleOnboardingForm = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleOnboardingSchema),
    defaultValues: {
      vehicleType: "BIKE" as const,
      vehicleNumber: "",
      vehicleModel: "",
      yearOfManufacture: "",
      insuranceNumber: "",
    },
  });

  // Handle vehicle onboarding submission
  const onVehicleOnboardingSubmit = async (data: VehicleFormData) => {
    try {
      setIsSubmitting(true);
      
      // Create FormData for file uploads
      const formData = new FormData();
      formData.append('vehicleType', data.vehicleType);
      formData.append('vehicleNumber', data.vehicleNumber);
      formData.append('vehicleModel', data.vehicleModel);
      formData.append('yearOfManufacture', data.yearOfManufacture);
      formData.append('insuranceNumber', data.insuranceNumber);
      
      if (rcFile) {
        formData.append('rcDocument', rcFile);
      }
      
      if (insuranceFile) {
        formData.append('insuranceDocument', insuranceFile);
      }

      // Use the passed onAddVehicle function if available, otherwise fallback to direct API call
      if (onAddVehicle) {
        const response = await onAddVehicle(formData);
        
        if (response.success) {
          toast({
            title: "Success",
            description: "Vehicle registered successfully and submitted for approval",
          });
          
          // Reset form and files
          vehicleOnboardingForm.reset();
          setRcFile(null);
          setInsuranceFile(null);
        } else {
          throw new Error(response.message || 'Failed to register vehicle');
        }
      } else {
        // Fallback to direct API call
        const response = await vehicleApi.createVehicle(formData);
        
        if (response.success) {
          toast({
            title: "Success",
            description: "Vehicle registered successfully and submitted for approval",
          });
          
          // Reset form and files
          vehicleOnboardingForm.reset();
          setRcFile(null);
          setInsuranceFile(null);
          
          // Refresh vehicle list
          await onRefresh();
        } else {
          throw new Error(response.message || 'Failed to register vehicle');
        }
      }
    } catch (error: any) {
      console.error('Error registering vehicle:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response,
        status: error.status,
        stack: error.stack
      });
      
      let errorMessage = "Failed to register vehicle. Please try again.";
      
      if (error.message) {
        if (error.message.includes('403') || error.message.includes('Access denied')) {
          errorMessage = "Access denied. Please ensure you're logged in as a driver.";
        } else if (error.message.includes('404') || error.message.includes('profile not found')) {
          errorMessage = "Driver profile not found. Please complete your profile first.";
        } else if (error.message.includes('duplicate') || error.message.includes('already exists')) {
          errorMessage = "Vehicle number already exists. Please check your vehicle number.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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
          {vehicles.length > 0 ? (
            <div className="bg-gray-50 border rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Vehicle Type</p>
                  <p className="font-medium">{vehicles[0].vehicleModel} ({vehicles[0].vehicleType})</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Registration Number</p>
                  <p className="font-medium">{vehicles[0].vehicleNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Year of Manufacture</p>
                  <p className="font-medium">{vehicles[0].yearOfManufacture}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Insurance Number</p>
                  <p className="font-medium">{vehicles[0].insuranceNumber}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border rounded-lg p-4 text-center">
              <p className="text-gray-500">No vehicle registered yet. Please register a vehicle below.</p>
            </div>
          )}
        </div>
        
        {/* Existing Vehicles */}
        {vehicles.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Vehicles</CardTitle>
              <CardDescription>
                Manage your registered vehicles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {vehicles.map((vehicle) => (
                  <Card key={vehicle.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {vehicle.vehicleType === 'BIKE' && <Bike className="h-5 w-5 text-blue-600" />}
                          {vehicle.vehicleType === 'CAR' && <Car className="h-5 w-5 text-blue-600" />}
                          {vehicle.vehicleType === 'TRUCK' && <Truck className="h-5 w-5 text-blue-600" />}
                          <span className="font-semibold">{vehicle.vehicleType}</span>
                        </div>
                        <Badge variant={vehicle.isActive ? "default" : "secondary"}>
                          {vehicle.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div><strong>Number:</strong> {vehicle.vehicleNumber}</div>
                        <div><strong>Model:</strong> {vehicle.vehicleModel}</div>
                        <div><strong>Year:</strong> {vehicle.yearOfManufacture}</div>
                        <div><strong>Insurance:</strong> {vehicle.insuranceNumber}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

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
                        <SelectContent className="bg-white border border-gray-200 shadow-lg backdrop-blur-none opacity-100 z-50">
                          <SelectItem value="BIKE">Bike</SelectItem>
                          <SelectItem value="AUTO">Auto Rickshaw</SelectItem>
                          <SelectItem value="CAR">Car</SelectItem>
                          <SelectItem value="TRUCK">Truck</SelectItem>
                          <SelectItem value="VAN">Van</SelectItem>
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
                  name="insuranceNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Insurance Number</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., INS123456789" {...field} />
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
                    {rcFile && (
                      <p className="text-xs text-green-600 mt-1">
                        {rcFile.name}
                      </p>
                    )}
                    <Input 
                      type="file" 
                      className="hidden" 
                      id="rc-upload" 
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setRcFile(file);
                      }}
                    />
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
                    {insuranceFile && (
                      <p className="text-xs text-green-600 mt-1">
                        {insuranceFile.name}
                      </p>
                    )}
                    <Input 
                      type="file" 
                      className="hidden" 
                      id="insurance-upload" 
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setInsuranceFile(file);
                      }}
                    />
                    <label htmlFor="insurance-upload">
                      <Button type="button" variant="outline" size="sm" className="mt-2">
                        Choose File
                      </Button>
                    </label>
                  </div>
                </div>
              </div>
              
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <File className="mr-2 h-4 w-4" />
                    Submit for Approval
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};
