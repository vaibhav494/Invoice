import { useState, useEffect } from 'react'
import { Plus, ChevronLeft, ChevronRight, Check } from 'lucide-react'
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
import { useUser } from '@clerk/clerk-react'
import { toast } from "@/hooks/use-toast"

interface Supplier {
  _id: string;
  name: string;
  address: string[];
  gst: string;
  state: string;
  stateCode: string;
  isDefault?: boolean;
}

export default function Supplier() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [newSupplier, setNewSupplier] = useState({ 
    name: '', 
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    gst: '', 
    state: '', 
    stateCode: '' 
  })
  const [currentPage, setCurrentPage] = useState(1)
  const suppliersPerPage = 10
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchSuppliers();
    }
  }, [user]);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch(`http://localhost:4000/getSupplier?userId=${user?.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch suppliers');
      }
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSupplier({ ...newSupplier, [e.target.name]: e.target.value });
  }

  const handleAddSupplier = async () => {
    if (newSupplier.name && newSupplier.addressLine1 && newSupplier.gst && newSupplier.state && newSupplier.stateCode) {
      try {
        const response = await fetch('http://localhost:4000/insertSupplier', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            supplier_name: newSupplier.name,
            supplier_address: [newSupplier.addressLine1, newSupplier.addressLine2, newSupplier.addressLine3],
            supplier_gst: newSupplier.gst,
            supplier_state: newSupplier.state,
            supplier_state_code: newSupplier.stateCode,
            userId: user?.id,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to add supplier');
        }

        fetchSuppliers();
        setNewSupplier({ name: '', addressLine1: '', addressLine2: '', addressLine3: '', gst: '', state: '', stateCode: '' });
        setIsOpen(false);
      } catch (error) {
        console.error('Error adding supplier:', error);
      }
    }
  }

  const handleSetDefaultSupplier = async (supplierId: string) => {
    try {
      const response = await fetch('http://localhost:4000/setDefaultSupplier', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          supplierId: supplierId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to set default supplier');
      }

      fetchSuppliers(); // Refresh the supplier list
      toast({
        title: "Default Supplier Set",
        description: "The selected supplier has been set as the default.",
      })
    } catch (error) {
      console.error('Error setting default supplier:', error);
      toast({
        title: "Error",
        description: "Failed to set default supplier. Please try again.",
        variant: "destructive",
      })
    }
  }

  const indexOfLastSupplier = currentPage * suppliersPerPage
  const indexOfFirstSupplier = indexOfLastSupplier - suppliersPerPage
  const currentSuppliers = suppliers.slice(indexOfFirstSupplier, indexOfLastSupplier)
  const totalPages = Math.ceil(suppliers.length / suppliersPerPage)

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Supplier Management</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" /> Add Supplier
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            {/* Dialog content remains the same */}
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
              <TableHead>State Code</TableHead>
              <TableHead>Default</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentSuppliers.map((supplier) => (
              <TableRow key={supplier._id}>
                <TableCell className="font-medium">{supplier.name}</TableCell>
                <TableCell>{supplier.address.join(', ')}</TableCell>
                <TableCell>{supplier.gst}</TableCell>
                <TableCell>{supplier.state}</TableCell>
                <TableCell>{supplier.stateCode}</TableCell>
                <TableCell>
                  {supplier.isDefault ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSetDefaultSupplier(supplier._id)}
                    >
                      Set as Default
                    </Button>
                  )}
                </TableCell>
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