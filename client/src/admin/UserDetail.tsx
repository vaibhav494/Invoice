import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Entity {
  _id: string;
  name: string;
  address: [];
  gst: string;
  state: string;
  stateCode: string;
}
interface InvoiceDetail {
    sellerName: string;
    customerName: string;
    invoiceNumber: string;
    invoiceDate: string;
    totalAmount: number;
    status: string;
    userId: string;
  }

export default function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [suppliers, setSuppliers] = useState<Entity[]>([]);
  const [customers, setCustomers] = useState<Entity[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    addressLine1: "", 
    addressLine2: "", 
    addressLine3: "", 
    gst: "",
    state: "",
    stateCode: "",
  });

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/getSupplier?userId=${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch suppliers");
        }
        const data = await response.json();
        setSuppliers(data);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    const fetchCustomers = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/getCustomer?userId=${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch customers");
        }
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchSuppliers();
    fetchCustomers();
  }, [userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSupplier({ ...newSupplier, [e.target.name]: e.target.value });
  };

  const handleAddSupplier = async () => {
    if (
      newSupplier.name &&
      newSupplier.addressLine1 &&
      newSupplier.gst &&
      newSupplier.state &&
      newSupplier.stateCode
    ) {
      try {
        const response = await fetch("http://localhost:4000/insertSupplier", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            supplier_name: newSupplier.name,
            supplier_address: [
              newSupplier.addressLine1,
              newSupplier.addressLine2,
              newSupplier.addressLine3,
            ],
            supplier_gst: newSupplier.gst,
            supplier_state: newSupplier.state,
            supplier_state_code: newSupplier.stateCode,
            userId: user?.id,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to add supplier");
        }

        fetchSuppliers(); // Refresh the supplier list
        setNewSupplier({
          name: "",
          addressLine1: "",
          addressLine2: "",
          addressLine3: "",
          gst: "",
          state: "",
          stateCode: "",
        });
        setIsOpen(false);
      } catch (error) {
        console.error("Error adding supplier:", error);
      }
    }
  };

  const [supplierPage, setSupplierPage] = useState(0)
  const [customerPage, setCustomerPage] = useState(0)
  const [invoicePage, setInvoicePage] = useState(0)
  const itemsPerPage = 10

  
  const [invoices, setInvoices] = useState<InvoiceDetail[]>([]);;


  useEffect(() => {
    const loadInvoices = async () => {
      try {
        // Make a GET request to fetch invoice details, passing userId as a query parameter
        const response = await axios.get(`/insert_full_invoice_detail?userId=${userId}`);
        
        // Set the fetched data into the invoices state
        setInvoices(response.data);
      } catch (err) {
        console.error('Error fetching invoice details:', err);

      } 
    };

    // Load invoices when the component mounts or when userId changes
    loadInvoices();
  }, []);
  const paginateData = (data:any, page:any) => {
    const start = page * itemsPerPage
    return data.slice(start, start + itemsPerPage)
  }
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Supplier Card */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Suppliers</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>GST</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>State Code</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginateData(suppliers, supplierPage).map((supplier:any) => (
                  <TableRow key={supplier._id}>
                    <TableCell className="font-medium">{supplier.name}</TableCell>
                    <TableCell>{supplier.address.join(", ")}</TableCell>
                    <TableCell>{supplier.gst}</TableCell>
                    <TableCell>{supplier.state}</TableCell>
                    <TableCell>{supplier.stateCode}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {suppliers.length > itemsPerPage && (
              <div className="mt-4 flex justify-end">
                <Button 
                  onClick={() => setSupplierPage(prev => prev + 1)}
                  disabled={supplierPage >= Math.ceil(suppliers.length / itemsPerPage) - 1}
                >
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Customer Card */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>GST</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>State Code</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginateData(customers, customerPage).map((customer:any) => (
                  <TableRow key={customer._id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.address.join(", ")}</TableCell>
                    <TableCell>{customer.gst}</TableCell>
                    <TableCell>{customer.state}</TableCell>
                    <TableCell>{customer.stateCode}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {customers.length > itemsPerPage && (
              <div className="mt-4 flex justify-end">
                <Button 
                  onClick={() => setCustomerPage(prev => prev + 1)}
                  disabled={customerPage >= Math.ceil(customers.length / itemsPerPage) - 1}
                >
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
