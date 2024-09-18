"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from 'axios'
import { useUser } from "@clerk/clerk-react"
import { Loader2, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"

const formSchema = z.object({
  bankName: z.string().min(2, {
    message: "Bank name must be at least 2 characters.",
  }),
  accountNumber: z.string().min(8, {
    message: "Account number must be at least 8 characters.",
  }),
  ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, {
    message: "Invalid IFSC code format.",
  }),
})

export default function BankDetail() {
  const { user } = useUser()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formProgress, setFormProgress] = useState(0)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bankName: "",
      accountNumber: "",
      ifscCode: "",
    },
  })

  useEffect(() => {
    const subscription = form.watch((value) => {
      const filledFields = Object.values(value).filter(Boolean).length
      setFormProgress((filledFields / 3) * 100)
    })
    return () => subscription.unsubscribe()
  }, [form])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "User not logged in",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      await axios.post("http://localhost:4000/api/bank-details", {
        name: values.bankName,
        Ac_No: values.accountNumber,
        branch_ifsc: values.ifscCode,
        userId: user.id,
      })
      toast({
        title: "Success",
        description: "Bank details submitted successfully",
      })
      form.reset()
      setFormProgress(0)
    } catch (error) {
      console.error("Error submitting bank details:", error)
      toast({
        title: "Error",
        description: "Failed to submit bank details",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Add Bank Details</CardTitle>
        <CardDescription>Please enter your bank information below</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter bank name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter account number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ifscCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IFSC Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter IFSC code" {...field} />
                  </FormControl>
                  <FormDescription>
                    Format: ABCD0123456 (4 letters followed by 0 and 6 alphanumeric characters)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <Progress value={formProgress} className="w-full" />
              <p className="text-sm text-center text-muted-foreground">{formProgress.toFixed(0)}% Complete</p>
            </div>
          </CardContent>
          <CardFooter>
            <AnimatePresence mode="wait">
              <motion.div
                key={isSubmitting ? 'submitting' : 'idle'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Submit Bank Details
                    </>
                  )}
                </Button>
              </motion.div>
            </AnimatePresence>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}