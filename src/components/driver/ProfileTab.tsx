
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Phone } from 'lucide-react';

// Define validation schema for profile update
const profileUpdateSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  vehicleNumber: z.string().optional(),
  vehicleModel: z.string().optional(),
});

export const ProfileTab = () => {
  const { toast } = useToast();

  // Profile update form
  const profileUpdateForm = useForm({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      phoneNumber: "9876543210",
      vehicleNumber: "KA-01-AB-1234",
      vehicleModel: "Honda Activa",
    },
  });

  // Handle profile update submission
  const onProfileUpdateSubmit = (data: z.infer<typeof profileUpdateSchema>) => {
    console.log("Profile Update Data:", data);
    
    toast({
      title: "Profile Update Request Sent",
      description: "Your changes have been submitted for admin approval",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>
          Update your profile and vehicle information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...profileUpdateForm}>
          <form onSubmit={profileUpdateForm.handleSubmit(onProfileUpdateSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Information</h3>
              
              <FormField
                control={profileUpdateForm.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input placeholder="Your phone number" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="pt-6 border-t space-y-4">
              <h3 className="text-lg font-medium">Vehicle Information</h3>
              
              <FormField
                control={profileUpdateForm.control}
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
                control={profileUpdateForm.control}
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
              
              <p className="text-sm text-amber-600 mt-2">
                Note: Vehicle information changes require admin approval before taking effect
              </p>
            </div>
            
            <Button type="submit">
              Save Changes
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileTab;
