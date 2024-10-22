// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { ArchiveIcon } from "lucide-react";

// interface Entity {
//   _id: string;
//   name: string;
//   address: [];
//   gst: string;
//   state: string;
//   stateCode: string;
// }
// interface InvoiceDetail {
//   sellerName: string;
//   customerName: string;
//   invoiceNumber: string;
//   invoiceDate: string;
//   totalAmount: number;
//   status: string;
//   userId: string;
// }

// export default function UserDetail() {
//   const { userId } = useParams();
//   const [user, setUser] = useState<User | null>(null);
//   const [suppliers, setSuppliers] = useState<Entity[]>([]);
//   const [customers, setCustomers] = useState<Entity[]>([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [newSupplier, setNewSupplier] = useState({
//     name: "",
//     addressLine1: "",
//     addressLine2: "",
//     addressLine3: "",
//     gst: "",
//     state: "",
//     stateCode: "",
//   });

//   useEffect(() => {
//     const fetchSuppliers = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:4000/getSupplier?userId=${userId}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch suppliers");
//         }
//         const data = await response.json();
//         setSuppliers(data);
//       } catch (error) {
//         console.error("Error fetching suppliers:", error);
//       }
//     };

//     const fetchCustomers = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:4000/getCustomer?userId=${userId}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch customers");
//         }
//         const data = await response.json();
//         setCustomers(data);
//       } catch (error) {
//         console.error("Error fetching customers:", error);
//       }
//     };

//     fetchSuppliers();
//     fetchCustomers();
//   }, [userId]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewSupplier({ ...newSupplier, [e.target.name]: e.target.value });
//   };

//   const handleAddSupplier = async () => {
//     if (
//       newSupplier.name &&
//       newSupplier.addressLine1 &&
//       newSupplier.gst &&
//       newSupplier.state &&
//       newSupplier.stateCode
//     ) {
//       try {
//         const response = await fetch("http://localhost:4000/insertSupplier", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             supplier_name: newSupplier.name,
//             supplier_address: [
//               newSupplier.addressLine1,
//               newSupplier.addressLine2,
//               newSupplier.addressLine3,
//             ],
//             supplier_gst: newSupplier.gst,
//             supplier_state: newSupplier.state,
//             supplier_state_code: newSupplier.stateCode,
//             userId: userId,
//           }),
//         });

//         if (!response.ok) {
//           throw new Error("Failed to add supplier");
//         }

//         fetchSuppliers(); // Refresh the supplier list
//         setNewSupplier({
//           name: "",
//           addressLine1: "",
//           addressLine2: "",
//           addressLine3: "",
//           gst: "",
//           state: "",
//           stateCode: "",
//         });
//         setIsOpen(false);
//       } catch (error) {
//         console.error("Error adding supplier:", error);
//       }
//     }
//   };

//   const [supplierPage, setSupplierPage] = useState(0);
//   const [customerPage, setCustomerPage] = useState(0);
//   const [invoicePage, setInvoicePage] = useState(0);
//   const itemsPerPage = 10;

//   const [invoices, setInvoices] = useState<InvoiceDetail[]>([]);

//   useEffect(() => {
//     const loadInvoices = async () => {
//       try {
//         // Check if userId is defined before making the request
//         if (!userId) {
//           console.warn("userId is not defined");
//           return;
//         }

//         // Make a GET request to fetch invoice details, passing userId as a query parameter
//         const response = await axios.get(
//           `http://localhost:4000/insert_full_invoice_detail?userId=${userId}`
//         );

//         // Set the fetched data into the invoices state
//         setInvoices(response.data);
//         console.log("Fetched invoices:", response.data);
//       } catch (err) {
//         console.error("Error fetching invoice details:", err);
//       }
//     };

//     // Load invoices when the component mounts or when userId changes
//     loadInvoices();
//   }, []);
//   const paginateData = (data: any, page: any) => {
//     const start = page * itemsPerPage;
//     return data.slice(start, start + itemsPerPage);
//   };
//   return (
//     <div className="container mx-auto p-8">
//       <div className="flex flex-col md:flex-row gap-4 mb-8">
//         {/* Supplier Card */}
//         <Card className="flex-1">
//           <CardHeader>
//             <CardTitle>Suppliers</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Name</TableHead>
//                   <TableHead>Address</TableHead>
//                   <TableHead>GST</TableHead>
//                   <TableHead>State</TableHead>

//                   <TableHead>Action</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {paginateData(suppliers, supplierPage).map((supplier: any) => (
//                   <TableRow key={supplier._id}>
//                     <TableCell className="font-medium">
//                       {supplier.name}
//                     </TableCell>
//                     <TableCell>{supplier.address.join(", ")}</TableCell>
//                     <TableCell>{supplier.gst}</TableCell>
//                     <TableCell>{supplier.state}</TableCell>

//                     <TableCell>
//                       <button className="text-gray-500 hover:text-gray-700">
//                         <ArchiveIcon className="w-5 h-5" />
//                       </button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//             {suppliers.length > itemsPerPage && (
//               <div className="mt-4 flex justify-end">
//                 <Button
//                   onClick={() => setSupplierPage((prev) => prev + 1)}
//                   disabled={
//                     supplierPage >=
//                     Math.ceil(suppliers.length / itemsPerPage) - 1
//                   }
//                 >
//                   Next
//                 </Button>
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         {/* Customer Card */}
//         <Card className="flex-1">
//           <CardHeader>
//             <CardTitle>Customers</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Name</TableHead>
//                   <TableHead>Address</TableHead>
//                   <TableHead>GST</TableHead>
//                   <TableHead>State</TableHead>

//                   <TableHead>Action</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {paginateData(customers, customerPage).map((customer: any) => (
//                   <TableRow key={customer._id}>
//                     <TableCell className="font-medium">
//                       {customer.name}
//                     </TableCell>
//                     <TableCell>{customer.address.join(", ")}</TableCell>
//                     <TableCell>{customer.gst}</TableCell>
//                     <TableCell>{customer.state}</TableCell>

//                     <TableCell>
//                       <button className="text-gray-500 hover:text-gray-700">
//                         <ArchiveIcon className="w-5 h-5" />
//                       </button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//             {customers.length > itemsPerPage && (
//               <div className="mt-4 flex justify-end">
//                 <Button
//                   onClick={() => setCustomerPage((prev) => prev + 1)}
//                   disabled={
//                     customerPage >=
//                     Math.ceil(customers.length / itemsPerPage) - 1
//                   }
//                 >
//                   Next
//                 </Button>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//       <Card>
//         <CardHeader>
//           <CardTitle>Generated Invoices</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Invoice Number</TableHead>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Supplier</TableHead>
//                 <TableHead>Customer</TableHead>
//                 <TableHead>Total Amount</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Action</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {paginateData(invoices, invoicePage).map((invoice: any) => (
//                 <TableRow key={invoice._id}>
//                   <TableCell className="font-medium">
//                     {invoice.invoiceNumber}
//                   </TableCell>
//                   <TableCell>{invoice.invoiceDate}</TableCell>
//                   <TableCell>{invoice.sellerName}</TableCell>
//                   <TableCell>{invoice.customerName}</TableCell>
//                   <TableCell>{invoice.totalAmount}</TableCell>
//                   <TableCell>
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs ${
//                         invoice.status === "Paid"
//                           ? "bg-green-100 text-green-800"
//                           : invoice.status === "Pending"
//                           ? "bg-yellow-100 text-yellow-800"
//                           : "bg-red-100 text-red-800"
//                       }`}
//                     >
//                       {invoice.status}
//                     </span>
//                   </TableCell>
//                   <TableCell>
//                     <button className="text-gray-500 hover:text-gray-700">
//                       <ArchiveIcon className="w-5 h-5" />
//                     </button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//           {invoices.length > itemsPerPage && (
//             <div className="mt-4 flex justify-end">
//               <Button
//                 onClick={() => setInvoicePage((prev) => prev + 1)}
//                 disabled={
//                   invoicePage >= Math.ceil(invoices.length / itemsPerPage) - 1
//                 }
//               >
//                 Next
//               </Button>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }









// import { useParams } from "react-router-dom"
// import { useEffect, useState } from "react"
// import axios from "axios"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Button } from "@/components/ui/button"
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
// import { ArchiveIcon, PlusIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// interface Entity {
//   _id: string
//   name: string
//   address: string[]
//   gst: string
//   state: string
//   stateCode: string
// }

// interface InvoiceDetail {
//   _id: string
//   sellerName: string
//   customerName: string
//   invoiceNumber: string
//   invoiceDate: string
//   totalAmount: number
//   status: string
//   userId: string
// }



// export default function UserDetail() {
//   const { userId } = useParams<{ userId: string }>()
//   const [suppliers, setSuppliers] = useState<Entity[]>([])
//   const [customers, setCustomers] = useState<Entity[]>([])
//   const [invoices, setInvoices] = useState<InvoiceDetail[]>([])
//   const [supplierPage, setSupplierPage] = useState(0)
//   const [customerPage, setCustomerPage] = useState(0)
//   const [invoicePage, setInvoicePage] = useState(0)
//   const [isAddSupplierOpen, setIsAddSupplierOpen] = useState(false)
//   const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false)
//   const [newSupplier, setNewSupplier] = useState({
//     name: "",
//     addressLine1: "",
//     addressLine2: "",
//     addressLine3: "",
//     gst: "",
//     state: "",
//     stateCode: "",
//   })
//   const [newCustomer, setNewCustomer] = useState({
//     name: "",
//     addressLine1: "",
//     addressLine2: "",
//     addressLine3: "",
//     gst: "",
//     state: "",
//     stateCode: "",
//   })

//   const itemsPerPage = 10
//   const apiBaseUrl = "http://localhost:4000"

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!userId) return

//       try {
//         const [suppliersRes, customersRes, invoicesRes] = await Promise.all([
//           axios.get(`${apiBaseUrl}/getSupplier?userId=${userId}`),
//           axios.get(`${apiBaseUrl}/getCustomer?userId=${userId}`),
//           axios.get(`${apiBaseUrl}/insert_full_invoice_detail?userId=${userId}`),
//         ])

//         setSuppliers(suppliersRes.data)
//         setCustomers(customersRes.data)
//         setInvoices(invoicesRes.data)
//       } catch (error) {
//         console.error("Error fetching data:", error)
//       }
//     }

//     fetchData()
//   }, [userId])

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewSupplier({ ...newSupplier, [e.target.name]: e.target.value })
//   }
//   const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value })
//   }

//   const handleAddSupplier = async () => {
//     if (newSupplier.name && newSupplier.addressLine1 && newSupplier.gst && newSupplier.state && newSupplier.stateCode) {
//       try {
//         await axios.post(`${apiBaseUrl}/insertSupplier`, {
//           supplier_name: newSupplier.name,
//           supplier_address: [newSupplier.addressLine1, newSupplier.addressLine2, newSupplier.addressLine3],
//           supplier_gst: newSupplier.gst,
//           supplier_state: newSupplier.state,
//           supplier_state_code: newSupplier.stateCode,
//           userId: userId,
//         })

//         const updatedSuppliers = await axios.get(`${apiBaseUrl}/getSupplier?userId=${userId}`)
//         setSuppliers(updatedSuppliers.data)
//         setIsAddSupplierOpen(false)
//         setNewSupplier({
//           name: "",
//           addressLine1: "",
//           addressLine2: "",
//           addressLine3: "",
//           gst: "",
//           state: "",
//           stateCode: "",
//         })
//       } catch (error) {
//         console.error("Error adding supplier:", error)
//       }
//     }
//   }

//   const handleAddCustomer = async () => {
//     if (newCustomer.name && newCustomer.addressLine1 &&  newCustomer.gst && newCustomer.state && newCustomer.stateCode) {
//       try {
//         await axios.post(`${apiBaseUrl}/insertCustomer`, {
//           customer_name: newCustomer.name,
//           customer_address: [newCustomer.addressLine1, newCustomer.addressLine2, newCustomer.addressLine3],
//           customer_gst: newCustomer.gst,
//           customer_state: newCustomer.state,
//           customer_state_code: newCustomer.stateCode,
//           userId: userId,
//         })

//         const updatedCustomer = await axios.get(`${apiBaseUrl}/getCustomer?userId=${userId}`)
//         setCustomers(updatedCustomer.data)
//         setIsAddCustomerOpen(false)
//         setNewCustomer({
//           name: "",
//           addressLine1: "",
//           addressLine2: "",
//           addressLine3: "",
//           gst: "",
//           state: "",
//           stateCode: "",
//         })
//       } catch (error) {
//         console.error("Error adding supplier:", error)
//       }
//     }
//   }

//   const paginateData = <T,>(data: T[], page: number) => {
//     const start = page * itemsPerPage
//     return data.slice(start, start + itemsPerPage)
//   }

//   const renderPagination = (page: number, setPage: (page: number) => void, totalItems: number) => (
//     <div className="mt-4 flex justify-end items-center space-x-2">
//       <Button
//         variant="outline"
//         size="sm"
//         onClick={() => setPage(page - 1)}
//         disabled={page === 0}
//       >
//         <ChevronLeftIcon className="h-4 w-4" />
//       </Button>
//       <span className="text-sm">
//         Page {page + 1} of {Math.ceil(totalItems / itemsPerPage)}
//       </span>
//       <Button
//         variant="outline"
//         size="sm"
//         onClick={() => setPage(page + 1)}
//         disabled={page >= Math.ceil(totalItems / itemsPerPage) - 1}
//       >
//         <ChevronRightIcon className="h-4 w-4" />
//       </Button>
//     </div>
//   )

//   const renderTable = (data: Entity[] | InvoiceDetail[], page: number, columns: string[]) => (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           {columns.map((column) => (
//             <TableHead key={column}>{column}</TableHead>
//           ))}
//           <TableHead>Action</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {paginateData(data, page).map((item) => (
//           <TableRow key={item._id}>
//             {columns.map((column) => (
//               <TableCell key={column}>
//                 {column === "Address" && Array.isArray((item as Entity).address)
//                   ? (item as Entity).address.join(", ")
//                   : column === "Status"
//                   ? renderStatus((item as InvoiceDetail).status)
//                   : column === "Invoice Number"
//                   ? (item as InvoiceDetail).invoiceNumber
//                   : column === "Date"
//                   ? (item as InvoiceDetail).invoiceDate
//                   : column === "Supplier"
//                   ? (item as InvoiceDetail).sellerName
//                   : column === "Customer"
//                   ? (item as InvoiceDetail).customerName
//                   : column === "Total Amount"
//                   ? `$${(item as InvoiceDetail).totalAmount.toFixed(2)}`
//                   : (item as any)[column.toLowerCase()]}
//               </TableCell>
//             ))}
//             <TableCell>
//               <Button variant="ghost" size="sm">
//                 <ArchiveIcon className="h-4 w-4" />
//               </Button>
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   )

//   const renderStatus = (status: string) => (
//     <span
//       className={`px-2 py-1 rounded-full text-xs ${
//         status === "Paid"
//           ? "bg-green-100 text-green-800"
//           : status === "Pending"
//           ? "bg-yellow-100 text-yellow-800"
//           : "bg-red-100 text-red-800"
//       }`}
//     >
//       {status}
//     </span>
//   )

//   return (
//     <div className="container mx-auto p-8 space-y-8">
//       <div className="grid md:grid-cols-2 gap-8">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between">
//             <CardTitle>Suppliers</CardTitle>
//             <Dialog open={isAddSupplierOpen} onOpenChange={setIsAddSupplierOpen}>
//               <DialogTrigger asChild>
//                 <Button variant="outline" size="sm">
//                   <PlusIcon className="h-4 w-4 mr-2" />
//                   Add Supplier
//                 </Button>
//               </DialogTrigger>
//               <DialogContent>
//                 <DialogHeader>
//                   <DialogTitle>Add New Supplier</DialogTitle>
//                 </DialogHeader>
//                 <div className="grid gap-4 py-4">
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-right">
//                       Name
//                     </Label>
//                     <Input id="name" name="name" value={newSupplier.name} onChange={handleInputChange} className="col-span-3" />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="addressLine1" className="text-right">
//                       Address Line 1
//                     </Label>
//                     <Input
//                       id="addressLine1"
//                       name="addressLine1"
//                       value={newSupplier.addressLine1}
//                       onChange={handleInputChange}
//                       className="col-span-3"
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="gst" className="text-right">
//                       GST
//                     </Label>
//                     <Input id="gst" name="gst" value={newSupplier.gst} onChange={handleInputChange} className="col-span-3" />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="state" className="text-right">
//                       State
//                     </Label>
//                     <Input id="state" name="state" value={newSupplier.state} onChange={handleInputChange} className="col-span-3" />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="stateCode" className="text-right">
//                       State Code
//                     </Label>
//                     <Input
//                       id="stateCode"
//                       name="stateCode"
//                       value={newSupplier.stateCode}
//                       onChange={handleInputChange}
//                       className="col-span-3"
//                     />
//                   </div>
//                 </div>
//                 <Button onClick={handleAddSupplier}>Add Supplier</Button>
//               </DialogContent>
//             </Dialog>
//           </CardHeader>
//           <CardContent>
//             {renderTable(suppliers, supplierPage, ["Name", "Address", "GST", "State"])}
//             {renderPagination(supplierPage, setSupplierPage, suppliers.length)}
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between">
//             <CardTitle>Customers</CardTitle>
//             <Dialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
//               <DialogTrigger asChild>
//                 <Button variant="outline" size="sm">
//                   <PlusIcon className="h-4 w-4 mr-2" />
//                   Add Customer
//                 </Button>
//               </DialogTrigger>
//               <DialogContent>
//                 <DialogHeader>
//                   <DialogTitle>Add New Customer</DialogTitle>
//                 </DialogHeader>
//                 <div className="grid gap-4 py-4">
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-right">
//                       Name
//                     </Label>
//                     <Input id="name" name="name" value={newCustomer.name} onChange={handleCustomerChange} className="col-span-3" />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="addressLine1" className="text-right">
//                       Address Line 1
//                     </Label>
//                     <Input
//                       id="addressLine1"
//                       name="addressLine1"
//                       value={newCustomer.addressLine1}
//                       onChange={handleCustomerChange}
//                       className="col-span-3"
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="gst" className="text-right">
//                       GST
//                     </Label>
//                     <Input id="gst" name="gst" value={newCustomer.gst} onChange={handleCustomerChange} className="col-span-3" />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="state" className="text-right">
//                       State
//                     </Label>
//                     <Input id="state" name="state" value={newCustomer.state} onChange={handleCustomerChange} className="col-span-3" />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="stateCode" className="text-right">
//                       State Code
//                     </Label>
//                     <Input
//                       id="stateCode"
//                       name="stateCode"
//                       value={newCustomer.stateCode}
//                       onChange={handleCustomerChange}
//                       className="col-span-3"
//                     />
//                   </div>
//                 </div>
//                 <Button onClick={handleAddCustomer}>Add Customer</Button>
//               </DialogContent>
//             </Dialog>
//           </CardHeader>
//           <CardContent>
//             {renderTable(customers, customerPage, ["Name", "Address", "GST", "State"])}
//             {renderPagination(customerPage, setCustomerPage, customers.length)}
//           </CardContent>
//         </Card>
//       </div>
//       <Card>
//         <CardHeader>
//           <CardTitle>Generated Invoices</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {renderTable(invoices, invoicePage, ["Invoice Number", "Date", "Supplier", "Customer", "Total Amount", "Status"])}
//           {renderPagination(invoicePage, setInvoicePage, invoices.length)}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }













import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ArchiveIcon, PlusIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Entity {
  _id: string
  name: string
  address: string[]
  gst: string
  state: string
  stateCode: string
}

interface InvoiceDetail {
  _id: string
  sellerName: string
  customerName: string
  invoiceNumber: string
  invoiceDate: string
  totalAmount: number
  status: string
  userId: string
}

export default function UserDetail() {
  const { userId } = useParams<{ userId: string }>()
  const [suppliers, setSuppliers] = useState<Entity[]>([])
  const [customers, setCustomers] = useState<Entity[]>([])
  const [invoices, setInvoices] = useState<InvoiceDetail[]>([])
  const [supplierPage, setSupplierPage] = useState(0)
  const [customerPage, setCustomerPage] = useState(0)
  const [invoicePage, setInvoicePage] = useState(0)
  const [isAddSupplierOpen, setIsAddSupplierOpen] = useState(false)
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false)
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    gst: "",
    state: "",
    stateCode: "",
  })
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    gst: "",
    state: "",
    stateCode: "",
  })

  const itemsPerPage = 10
  const apiBaseUrl = "http://localhost:4000"

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return

      try {
        const [suppliersRes, customersRes, invoicesRes] = await Promise.all([
          axios.get(`${apiBaseUrl}/getSupplier?userId=${userId}`),
          axios.get(`${apiBaseUrl}/getCustomer?userId=${userId}`),
          axios.get(`${apiBaseUrl}/insert_full_invoice_detail?userId=${userId}`),
        ])

        setSuppliers(suppliersRes.data)
        setCustomers(customersRes.data)
        setInvoices(invoicesRes.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [userId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'supplier' | 'customer') => {
    const setter = type === 'supplier' ? setNewSupplier : setNewCustomer
    setter(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleAdd = async (type: 'supplier' | 'customer') => {
    const data = type === 'supplier' ? newSupplier : newCustomer
    if (data.name && data.addressLine1 && data.gst && data.state && data.stateCode) {
      try {
        await axios.post(`${apiBaseUrl}/insert${type.charAt(0).toUpperCase() + type.slice(1)}`, {
          [`${type}_name`]: data.name,
          [`${type}_address`]: [data.addressLine1, data.addressLine2, data.addressLine3],
          [`${type}_gst`]: data.gst,
          [`${type}_state`]: data.state,
          [`${type}_state_code`]: data.stateCode,
          userId: userId,
        })

        const updatedData = await axios.get(`${apiBaseUrl}/get${type.charAt(0).toUpperCase() + type.slice(1)}?userId=${userId}`)
        type === 'supplier' ? setSuppliers(updatedData.data) : setCustomers(updatedData.data)
        type === 'supplier' ? setIsAddSupplierOpen(false) : setIsAddCustomerOpen(false)
        const setter = type === 'supplier' ? setNewSupplier : setNewCustomer
        setter({
          name: "",
          addressLine1: "",
          addressLine2: "",
          addressLine3: "",
          gst: "",
          state: "",
          stateCode: "",
        })
      } catch (error) {
        console.error(`Error adding ${type}:`, error)
      }
    }
  }

  const paginateData = <T,>(data: T[], page: number) => {
    const start = page * itemsPerPage
    return data.slice(start, start + itemsPerPage)
  }

  const renderPagination = (page: number, setPage: (page: number) => void, totalItems: number) => (
    <div className="mt-4 flex justify-end items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setPage(page - 1)}
        disabled={page === 0}
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
      <span className="text-sm">
        Page {page + 1} of {Math.ceil(totalItems / itemsPerPage)}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setPage(page + 1)}
        disabled={page >= Math.ceil(totalItems / itemsPerPage) - 1}
      >
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  )

  const renderTable = (data: Entity[] | InvoiceDetail[], page: number, columns: string[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column}>{column}</TableHead>
          ))}
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {paginateData(data, page).map((item) => (
          <TableRow key={item._id}>
            {columns.map((column) => (
              <TableCell key={column}>
                {column === "Address" && Array.isArray((item as Entity).address)
                  ? (item as Entity).address.join(", ")
                  : column === "Status"
                  ? renderStatus((item as InvoiceDetail).status)
                  : column === "Invoice Number"
                  ? (item as InvoiceDetail).invoiceNumber
                  : column === "Date"
                  ? (item as InvoiceDetail).invoiceDate
                  : column === "Supplier"
                  ? (item as InvoiceDetail).sellerName
                  : column === "Customer"
                  ? (item as InvoiceDetail).customerName
                  : column === "Total Amount"
                  ? `$${(item as InvoiceDetail).totalAmount.toFixed(2)}`
                  : (item as any)[column.toLowerCase()]}
              </TableCell>
            ))}
            <TableCell>
              <Button variant="ghost" size="sm">
                <ArchiveIcon className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  const renderStatus = (status: string) => (
    <span
      className={`px-2 py-1 rounded-full text-xs ${
        status === "Paid"
          ? "bg-green-100 text-green-800"
          : status === "Pending"
          ? "bg-yellow-100 text-yellow-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      {status}
    </span>
  )

  const renderAddDialog = (type: 'supplier' | 'customer') => {
    const isOpen = type === 'supplier' ? isAddSupplierOpen : isAddCustomerOpen
    const setIsOpen = type === 'supplier' ? setIsAddSupplierOpen : setIsAddCustomerOpen
    const data = type === 'supplier' ? newSupplier : newCustomer

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <PlusIcon className="h-4 w-4 mr-2" />
            Add {type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New {type.charAt(0).toUpperCase() + type.slice(1)}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {['name', 'addressLine1', 'gst', 'state', 'stateCode'].map((field) => (
              <div key={field} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={field} className="text-right">
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                </Label>
                <Input
                  id={field}
                  name={field}
                  value={data[field as keyof typeof data]}
                  onChange={(e) => handleInputChange(e, type)}
                  className="col-span-3"
                />
              </div>
            ))}
          </div>
          <Button onClick={() => handleAdd(type)}>Add {type.charAt(0).toUpperCase() + type.slice(1)}</Button>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <div className="container mx-auto p-8 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">User Details</h1>
      <Tabs defaultValue="suppliers" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>
        <TabsContent value="suppliers">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Suppliers</CardTitle>
              {renderAddDialog('supplier')}
            </CardHeader>
            <CardContent>
              {renderTable(suppliers, supplierPage, ["Name", "Address", "GST", "State"])}
              {renderPagination(supplierPage, setSupplierPage, suppliers.length)}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="customers">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Customers</CardTitle>
              {renderAddDialog('customer')}
            </CardHeader>
            <CardContent>
              {renderTable(customers, customerPage, ["Name", "Address", "GST", "State"])}
              {renderPagination(customerPage, setCustomerPage, customers.length)}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <CardTitle>Generated Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              {renderTable(invoices, invoicePage, ["Invoice Number", "Date", "Supplier", "Customer", "Total Amount", "Status"])}
              {renderPagination(invoicePage, setInvoicePage, invoices.length)}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}