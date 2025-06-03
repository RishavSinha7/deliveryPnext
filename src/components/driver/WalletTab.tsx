
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
import { Wallet } from 'lucide-react';

// Define validation schema for wallet recharge
const walletRechargeSchema = z.object({
  amount: z.string().min(1, "Amount is required").refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number",
  }),
  paymentMethod: z.enum(["upi", "card", "netbanking"]),
});

// Define the type for form data
type WalletRechargeFormData = z.infer<typeof walletRechargeSchema>;

interface WalletTabProps {
  walletBalance: number;
  setWalletBalance: React.Dispatch<React.SetStateAction<number>>;
}

export const WalletTab = ({ walletBalance, setWalletBalance }: WalletTabProps) => {
  const { toast } = useToast();

  // Wallet recharge form
  const walletRechargeForm = useForm<WalletRechargeFormData>({
    resolver: zodResolver(walletRechargeSchema),
    defaultValues: {
      amount: "",
      paymentMethod: "upi" as const,
    },
  });

  // Handle wallet recharge submission
  const onWalletRechargeSubmit = (data: WalletRechargeFormData) => {
    console.log("Wallet Recharge Data:", data);
    
    // Simulate API call and update balance
    const amount = Number(data.amount);
    setWalletBalance(prev => prev + amount);
    
    toast({
      title: "Wallet Recharged",
      description: `₹${amount} added to your wallet successfully`,
    });
    
    walletRechargeForm.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wallet</CardTitle>
        <CardDescription>
          Manage your earnings and recharge your wallet
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Current Balance</h3>
            <p className="text-3xl font-bold text-green-600">₹{walletBalance}</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              Withdraw Funds
            </Button>
            <Button>
              View Transactions
            </Button>
          </div>
        </div>
        
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Recharge Wallet</h3>
          <Form {...walletRechargeForm}>
            <form onSubmit={walletRechargeForm.handleSubmit(onWalletRechargeSubmit)} className="space-y-4">
              <FormField
                control={walletRechargeForm.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">₹</span>
                        </div>
                        <Input placeholder="500" className="pl-8" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={walletRechargeForm.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="upi">UPI</SelectItem>
                        <SelectItem value="card">Debit/Credit Card</SelectItem>
                        <SelectItem value="netbanking">Net Banking</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit">
                <Wallet className="mr-2 h-4 w-4" />
                Recharge Now
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletTab;
