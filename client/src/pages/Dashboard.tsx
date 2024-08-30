// import Payment from '@/components/Payment'
// import React from 'react'

// function Dashboard() {
//   return (
//     <div className=' w-full h-full '>
//         <div className='flex align-center justify-center gap-24 w-full'>
//           <div className='bg-red-200 rounded-md'><Payment></Payment></div>
//           <div className='bg-red-200 rounded-md'><Payment></Payment></div>
//         </div>
        
//     </div>
//   )
// }

// export default Dashboard
import { useState } from 'react'
import { Bell, ChevronDown, Search, MoreHorizontal, Calendar } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Invoices')

  return (
    <div className="w-full max-w-7xl mx-auto">
      <header className="flex items-center justify-between py-4 border-b">
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold">ENVOICE</h1>
          <nav className="flex space-x-4">
            <Button variant="ghost" className={activeTab === 'Invoices' ? 'text-primary border-b-2 border-primary' : ''}>Invoices</Button>
            <Button variant="ghost">Clients</Button>
            <Button variant="ghost">Service Items</Button>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Bell className="w-5 h-5" />
          <img src="/placeholder.svg?height=32&width=32" alt="User avatar" className="w-8 h-8 rounded-full" />
          <ChevronDown className="w-4 h-4" />
        </div>
      </header>

      <main className="py-8">
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-sm text-gray-500">Overdue</h2>
            <p className="text-2xl font-bold">₹4455.00 <span className="text-sm font-normal">RS</span></p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-sm text-gray-500">Total outstanding</h2>
            <p className="text-2xl font-bold">₹7727.00 <span className="text-sm font-normal">RS</span></p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-sm text-gray-500">Get paid</h2>
            <p className="text-2xl font-bold">₹1747.00 <span className="text-sm font-normal">RS</span></p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-sm text-gray-500">Uncollectible</h2>
            <p className="text-2xl font-bold">₹0.00 <span className="text-sm font-normal">RS</span></p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <Button variant="ghost" className={activeTab === 'Invoices' ? 'text-primary border-b-2 border-primary' : ''}>Invoices</Button>
            <Button variant="ghost">Draft</Button>
          </div>
          <Button className="bg-primary text-white">+ New Invoice</Button>
        </div>

        <div className="flex space-x-2 mb-4">
          <Button variant="ghost" className="text-primary border-b-2 border-primary">All (40)</Button>
          <Button variant="ghost">Outstanding (5)</Button>
          <Button variant="ghost">Paid (33)</Button>
          <Button variant="ghost">Uncollectible(2)</Button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <Select>
              <option>All clients</option>
            </Select>
            <Select>
              <option>All Status</option>
            </Select>
            <Button variant="outline" className="flex items-center">
              All Time
              <Calendar className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <Select>
              <option>Invoice#</option>
            </Select>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Try invoice# or client name" className="pl-8" />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"><input type="checkbox" /></TableHead>
              <TableHead>Invoice#</TableHead>
              <TableHead>Invoice Date</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Text</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Amount Due</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { id: '00015', date: '10 Oct 2023', client: 'Telekitty', status: 'Awaiting Payment', dueDate: '21 Oct 2023', total: '₹2,414', amountDue: '₹2,414' },
              { id: '00014', date: '08 Oct 2023', client: 'Fast Company', status: 'Paid', dueDate: '15 Oct 2023', total: '₹1,747', amountDue: '₹0' },
              { id: '00013', date: '02 Oct 2023', client: 'Off-Grid', status: 'Awaiting Payment', dueDate: '30 Oct 2023', total: '₹2,141', amountDue: '₹2,141' },
              { id: '00012', date: '15 Sep 2023', client: 'Figma', status: 'Awaiting Payment', dueDate: '15 Oct 2023', total: '₹3,181', amountDue: '₹3,181' },
              { id: '00011', date: '10 Sep 2023', client: 'Fast Company', status: 'Overdue', dueDate: '30 Sep 2023', total: '₹1,747', amountDue: '₹1,747' },
            ].map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell><input type="checkbox" /></TableCell>
                <TableCell className="text-primary">{invoice.id}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.client}</TableCell>
                <TableCell>
                  <Badge variant={invoice.status === 'Paid' ? 'success' : invoice.status === 'Overdue' ? 'destructive' : 'secondary'}>
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>{invoice.total}</TableCell>
                <TableCell>{invoice.amountDue}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Showing</span>
            <Select defaultValue="10">
              <option>10</option>
            </Select>
            <span className="text-sm text-gray-500">invoices per page</span>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="bg-primary text-white">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">4</Button>
          </div>
        </div>
      </main>
    </div>
  )
}