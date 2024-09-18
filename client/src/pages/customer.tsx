'use client'

import { useState } from 'react'
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Client {
  id: number
  name: string
  address: string
  gst: string
  state: string
}

export default function ClientManagement() {
  const [clients, setClients] = useState<Client[]>([
    { id: 1, name: "Tech Solutions Ltd", address: "123 Tech Park, Bangalore", gst: "29ABCDE1234F1Z5", state: "Karnataka" },
    { id: 2, name: "Green Energies Corp", address: "456 Eco Boulevard, Mumbai", gst: "27FGHIJ5678G1Z3", state: "Maharashtra" },
    { id: 3, name: "Foodie Delights Pvt Ltd", address: "789 Flavor Street, Delhi", gst: "07KLMNO9012H1Z1", state: "Delhi" },
    { id: 4, name: "Innovative Systems Inc", address: "101 Innovation Ave, Hyderabad", gst: "36PQRST3456I1Z7", state: "Telangana" },
    { id: 5, name: "Global Traders Co", address: "202 Export Lane, Chennai", gst: "33UVWXY7890J1Z9", state: "Tamil Nadu" },
    { id: 6, name: "Eco Friendly Products", address: "303 Green Road, Pune", gst: "27ZABCD1234K1Z2", state: "Maharashtra" },
    { id: 7, name: "Digital Solutions Ltd", address: "404 Cyber Street, Gurugram", gst: "06EFGHI5678L1Z4", state: "Haryana" },
    { id: 8, name: "Textile Exporters Pvt Ltd", address: "505 Fabric Lane, Surat", gst: "24JKLMN9012M1Z6", state: "Gujarat" },
    { id: 9, name: "Automotive Parts Co", address: "606 Engine Road, Coimbatore", gst: "33OPQRS3456N1Z8", state: "Tamil Nadu" },
    { id: 10, name: "Healthcare Innovations", address: "707 Wellness Ave, Ahmedabad", gst: "24TUVWX7890O1Z0", state: "Gujarat" },
    { id: 11, name: "Agro Products Ltd", address: "808 Farm Street, Chandigarh", gst: "04YZABC1234P1Z3", state: "Punjab" },
    { id: 12, name: "Education Tech Solutions", address: "909 Learning Lane, Kolkata", gst: "19DEFGH5678Q1Z5", state: "West Bengal" },
  ])
  const [isOpen, setIsOpen] = useState(false)
  const [newClient, setNewClient] = useState({ name: '', address: '', gst: '', state: '' })
  const [currentPage, setCurrentPage] = useState(1)
  const clientsPerPage = 10

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewClient({ ...newClient, [e.target.name]: e.target.value })
  }

  const handleAddClient = () => {
    if (newClient.name && newClient.address && newClient.gst && newClient.state) {
      setClients([...clients, { ...newClient, id: clients.length + 1 }])
      setNewClient({ name: '', address: '', gst: '', state: '' })
      setIsOpen(false)
    }
  }

  const indexOfLastClient = currentPage * clientsPerPage
  const indexOfFirstClient = indexOfLastClient - clientsPerPage
  const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient)
  const totalPages = Math.ceil(clients.length / clientsPerPage)

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Client Management</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" /> Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
              <DialogDescription>
                Enter the details of the new customer here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newClient.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={newClient.address}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gst" className="text-right">
                  GST
                </Label>
                <Input
                  id="gst"
                  name="gst"
                  value={newClient.gst}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="state" className="text-right">
                  State
                </Label>
                <Input
                  id="state"
                  name="state"
                  value={newClient.state}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddClient}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="bg-background rounded-lg shadow overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>GST</TableHead>
              <TableHead>State</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.address}</TableCell>
                <TableCell>{client.gst}</TableCell>
                <TableCell>{client.state}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <div className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}