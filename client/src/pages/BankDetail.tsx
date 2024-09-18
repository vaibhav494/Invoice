import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import axios from 'axios';
import { useUser } from "@clerk/clerk-react";

export default function BankDetail() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    bankName: '',
    accountNumber: '',
    ifscCode: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post("http://localhost:4000/api/bank-details", {
        name: formData.bankName,
        Ac_No: formData.accountNumber,
        branch_ifsc: formData.ifscCode,
        userId: user?.id, // Ensure user is logged in and userId is available
      });
      console.log('Bank details submitted:', formData);
      // Reset form after successful submission
      setFormData({
        bankName: '',
        accountNumber: '',
        ifscCode: '',
      });
    } catch (error) {
      console.error("Error submitting bank details:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Add Bank Details</CardTitle>
        <CardDescription>Please enter your bank information below</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bankName">Bank Name</Label>
            <Input
              id="bankName"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              placeholder="Enter bank name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              id="accountNumber"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              placeholder="Enter account number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ifscCode">IFSC Code</Label>
            <Input
              id="ifscCode"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
              placeholder="Enter IFSC code"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Bank Details'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}