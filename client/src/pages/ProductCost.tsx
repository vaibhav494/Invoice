'use client'

import { useState } from 'react'
import { AlertCircle, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface Product {
  id: number;
  name: string;
  hsn?: string;
  cost: number;
}

export default function ProductPricePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [name, setName] = useState('')
  const [hsn, setHsn] = useState('')
  const [cost, setCost] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) {
      setError('Name is required')
      return
    }

    if (!cost || isNaN(Number(cost))) {
      setError('Valid cost is required')
      return
    }

    const newProduct: Product = {
      id: Date.now(),
      name: name.trim(),
      hsn: hsn.trim() || undefined,
      cost: Number(cost)
    }

    setProducts([...products, newProduct])
    setName('')
    setHsn('')
    setCost('')
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Price Page</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name (required)</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
              />
            </div>
            <div>
              <Label htmlFor="hsn">HSN (optional)</Label>
              <Input
                id="hsn"
                value={hsn}
                onChange={(e) => setHsn(e.target.value)}
                placeholder="Enter HSN"
              />
            </div>
            <div>
              <Label htmlFor="cost">Cost (required)</Label>
              <Input
                id="cost"
                type="number"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                placeholder="Enter cost"
                step="0.01"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>HSN</TableHead>
                <TableHead>Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.hsn || 'N/A'}</TableCell>
                  <TableCell>₹{product.cost.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {products.length === 0 && (
            <Alert className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>No products yet</AlertTitle>
              <AlertDescription>
                Add your first product using the form above.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}