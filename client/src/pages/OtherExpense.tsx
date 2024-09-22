'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useUser } from '@clerk/clerk-react'

interface Expense {
  id: string;
  name: string;
  amount: number;
  date: string;
  userId: string;
}

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [expenseNames, setExpenseNames] = useState<string[]>([])
  const [selectedName, setSelectedName] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [newExpenseName, setNewExpenseName] = useState('')
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchExpenses()
      fetchExpenseNames()
    }
  }, [user])  

  const fetchExpenses = async () => {
    if (!user) return;
    try {
      const response = await fetch(`http://localhost:4000/api/expenses?userId=${user.id}`)
      if (response.ok) {
        const data = await response.json()
        setExpenses(data)
      } else {
        console.error('Failed to fetch expenses')
      }
    } catch (error) {
      console.error('Error fetching expenses:', error)
    }
  }

  const fetchExpenseNames = async () => {
    if (!user) return;
    try {
      const response = await fetch(`http://localhost:4000/api/expense-names?userId=${user.id}`)
      if (response.ok) {
        const data = await response.json()
        setExpenseNames(data)
      } else {
        console.error('Failed to fetch expense names')
      }
    } catch (error) {
      console.error('Error fetching expense names:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return;
    if (selectedName && amount && date) {
      const newExpense = {
        name: selectedName,
        amount: parseFloat(amount),
        date,
        userId: user.id
      }
      try {
        const response = await fetch('http://localhost:4000/api/expenses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newExpense),
        })
        if (response.ok) {
          fetchExpenses()
          setSelectedName('')
          setAmount('')
          setDate('')
        } else {
          console.error('Failed to add expense')
        }
      } catch (error) {
        console.error('Error adding expense:', error)
      }
    }
  }

  const handleAddExpenseName = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return;
    if (newExpenseName && !expenseNames.includes(newExpenseName)) {
      try {
        const response = await fetch('http://localhost:4000/api/expense-names', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newExpenseName, userId: user.id }),
        })
        if (response.ok) {
          fetchExpenseNames()
          setNewExpenseName('')
        } else {
          console.error('Failed to add expense name')
        }
      } catch (error) {
        console.error('Error adding expense name:', error)
      }
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="expenseName">Expense Name</Label>
              <Select value={selectedName} onValueChange={setSelectedName}>
                <SelectTrigger id="expenseName">
                  <SelectValue placeholder="Select expense name" />
                </SelectTrigger>
                <SelectContent>
                  {expenseNames.map((name) => (
                    <SelectItem key={name} value={name}>{name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
                step="0.01"
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Add Expense</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Manage Expense Names</CardTitle>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Add New Expense Name</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Expense Name</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddExpenseName} className="space-y-4">
                <div>
                  <Label htmlFor="newExpenseName">New Expense Name</Label>
                  <Input
                    id="newExpenseName"
                    value={newExpenseName}
                    onChange={(e) => setNewExpenseName(e.target.value)}
                    placeholder="Enter new expense name"
                    required
                  />
                </div>
                <Button type="submit">Add</Button>
              </form>
            </DialogContent>
          </Dialog>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Current Expense Names:</h3>
            <ul className="list-disc pl-5">
              {expenseNames.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expense List</CardTitle>
        </CardHeader>
        <CardContent>
          {expenses.length === 0 ? (
            <p className="text-center text-gray-500">No expenses added yet.</p>
          ) : (
            <ul className="space-y-2">
              {expenses.map((expense) => (
                <li key={expense.id} className="flex justify-between items-center border-b pb-2">
                  <span>{expense.name}</span>
                  <span className="flex space-x-4">
                    <span>INR {expense.amount.toFixed(2)}</span>
                    <span>{expense.date}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}