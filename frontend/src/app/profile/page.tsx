"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { userApi, tokenManager } from "@/lib/api";

const customerProfileSchema = z.object({
  preferredPaymentMethod: z.string().optional(),
  defaultAddress: z.string().optional(),
  loyaltyPoints: z.number().min(0).optional(),
});

type CustomerProfileFormValues = z.infer<typeof customerProfileSchema>;

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [customerProfile, setCustomerProfile] = useState<any>(null);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<CustomerProfileFormValues>({
    resolver: zodResolver(customerProfileSchema),
    defaultValues: {
      preferredPaymentMethod: "",
      defaultAddress: "",
      loyaltyPoints: 0,
    },
  });

  useEffect(() => {
    if (!tokenManager.isAuthenticated()) {
      router.push("/auth");
      return;
    }

    loadUserProfile();
    loadCustomerProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const response = await userApi.getProfile();
      if (response.success) {
        setUserProfile(response.data);
      }
    } catch (error) {
      console.error("Failed to load user profile:", error);
    }
  };

  const loadCustomerProfile = async () => {
    try {
      const response = await userApi.getCustomerProfile();
      if (response.success && response.data) {
        setCustomerProfile(response.data);
        form.reset({
          preferredPaymentMethod: response.data.preferredPaymentMethod || "",
          defaultAddress: response.data.defaultAddress || "",
          loyaltyPoints: response.data.loyaltyPoints || 0,
        });
      }
    } catch (error) {
      console.error("Customer profile not found, can create new one");
    }
  };

  const onSubmit = async (data: CustomerProfileFormValues) => {
    setIsLoading(true);
    try {
      const response = await userApi.createCustomerProfile(data);
      
      if (response.success) {
        setCustomerProfile(response.data);
        toast({
          title: "Profile Updated",
          description: "Your customer profile has been saved successfully!",
        });
      }
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await userApi.getProfile(); // Just to test the token
      tokenManager.removeToken();
      router.push("/auth");
    } catch (error) {
      tokenManager.removeToken();
      router.push("/auth");
    }
  };

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
              <p className="text-gray-600 mt-2">Manage your account settings</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>

          {/* User Info */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">User Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <p className="mt-1 text-gray-900">{userProfile.fullName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-gray-900">{userProfile.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <p className="mt-1 text-gray-900">{userProfile.phoneNumber}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <p className="mt-1 text-gray-900 capitalize">{userProfile.role.toLowerCase()}</p>
              </div>
            </div>
          </div>

          {/* Customer Profile Form */}
          {userProfile.role === 'CUSTOMER' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Customer Profile</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="preferredPaymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Payment Method</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="CASH">Cash</SelectItem>
                            <SelectItem value="CARD">Card</SelectItem>
                            <SelectItem value="UPI">UPI</SelectItem>
                            <SelectItem value="WALLET">Wallet</SelectItem>
                            <SelectItem value="NET_BANKING">Net Banking</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="defaultAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Default Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your default address" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="loyaltyPoints"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Loyalty Points</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Customer Profile"}
                  </Button>
                </form>
              </Form>

              {/* Display current customer profile */}
              {customerProfile && (
                <div className="mt-8 p-4 bg-green-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Current Customer Profile</h3>
                  <div className="space-y-2">
                    <p><strong>Payment Method:</strong> {customerProfile.preferredPaymentMethod || 'Not set'}</p>
                    <p><strong>Default Address:</strong> {customerProfile.defaultAddress || 'Not set'}</p>
                    <p><strong>Loyalty Points:</strong> {customerProfile.loyaltyPoints}</p>
                    <p><strong>Created:</strong> {new Date(customerProfile.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
