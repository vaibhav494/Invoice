// // import Payment from '@/components/Payment'
// // import React from 'react'

// // function Dashboard() {
// //   return (
// //     <div className=' w-full h-full '>
// //         <div className='flex align-center justify-center gap-24 w-full'>
// //           <div className='bg-red-200 rounded-md'><Payment></Payment></div>
// //           <div className='bg-red-200 rounded-md'><Payment></Payment></div>
// //         </div>

// //     </div>
// //   )
// // }

// // export default Dashboard
// import { useState } from 'react'
// import { Bell, ChevronDown, Search, MoreHorizontal, Calendar } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Select } from "@/components/ui/select"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Badge } from "@/components/ui/badge"

// export default function Dashboard() {
//   const [activeTab, setActiveTab] = useState('Invoices')

//   return (
//     <div className="w-full max-w-7xl mx-auto">
//       <header className="flex items-center justify-between py-4 border-b">
//         <div className="flex items-center space-x-6">
//           <h1 className="text-2xl font-bold">ENVOICE</h1>
//           <nav className="flex space-x-4">
//             <Button variant="ghost" className={activeTab === 'Invoices' ? 'text-primary border-b-2 border-primary' : ''}>Invoices</Button>
//             <Button variant="ghost">Clients</Button>
//             <Button variant="ghost">Service Items</Button>
//           </nav>
//         </div>
//         <div className="flex items-center space-x-4">
//           <Bell className="w-5 h-5" />
//           <img src="/placeholder.svg?height=32&width=32" alt="User avatar" className="w-8 h-8 rounded-full" />
//           <ChevronDown className="w-4 h-4" />
//         </div>
//       </header>

//       <main className="py-8">
//         <div className="grid grid-cols-4 gap-4 mb-8">
//           <div className="p-4 bg-white rounded-lg shadow">
//             <h2 className="text-sm text-gray-500">Overdue</h2>
//             <p className="text-2xl font-bold">₹4455.00 <span className="text-sm font-normal">RS</span></p>
//           </div>
//           <div className="p-4 bg-white rounded-lg shadow">
//             <h2 className="text-sm text-gray-500">Total outstanding</h2>
//             <p className="text-2xl font-bold">₹7727.00 <span className="text-sm font-normal">RS</span></p>
//           </div>
//           <div className="p-4 bg-white rounded-lg shadow">
//             <h2 className="text-sm text-gray-500">Get paid</h2>
//             <p className="text-2xl font-bold">₹1747.00 <span className="text-sm font-normal">RS</span></p>
//           </div>
//           <div className="p-4 bg-white rounded-lg shadow">
//             <h2 className="text-sm text-gray-500">Uncollectible</h2>
//             <p className="text-2xl font-bold">₹0.00 <span className="text-sm font-normal">RS</span></p>
//           </div>
//         </div>

//         <div className="flex justify-between items-center mb-4">
//           <div className="flex space-x-2">
//             <Button variant="ghost" className={activeTab === 'Invoices' ? 'text-primary border-b-2 border-primary' : ''}>Invoices</Button>
//             <Button variant="ghost">Draft</Button>
//           </div>
//           <Button className="bg-primary text-white">+ New Invoice</Button>
//         </div>

//         <div className="flex space-x-2 mb-4">
//           <Button variant="ghost" className="text-primary border-b-2 border-primary">All (40)</Button>
//           <Button variant="ghost">Outstanding (5)</Button>
//           <Button variant="ghost">Paid (33)</Button>
//           <Button variant="ghost">Uncollectible(2)</Button>
//         </div>

//         <div className="flex justify-between items-center mb-4">
//           <div className="flex space-x-2">
//             <Select>
//               <option>All clients</option>
//             </Select>
//             <Select>
//               <option>All Status</option>
//             </Select>
//             <Button variant="outline" className="flex items-center">
//               All Time
//               <Calendar className="ml-2 h-4 w-4" />
//             </Button>
//           </div>
//           <div className="flex items-center space-x-2">
//             <span className="text-sm text-gray-500">Sort by:</span>
//             <Select>
//               <option>Invoice#</option>
//             </Select>
//           </div>
//         </div>

//         <div className="relative">
//           <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
//           <Input placeholder="Try invoice# or client name" className="pl-8" />
//         </div>

//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[40px]"><input type="checkbox" /></TableHead>
//               <TableHead>Invoice#</TableHead>
//               <TableHead>Invoice Date</TableHead>
//               <TableHead>Client</TableHead>
//               <TableHead>Text</TableHead>
//               <TableHead>Due Date</TableHead>
//               <TableHead>Total</TableHead>
//               <TableHead>Amount Due</TableHead>
//               <TableHead></TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {[
//               { id: '00015', date: '10 Oct 2023', client: 'Telekitty', status: 'Awaiting Payment', dueDate: '21 Oct 2023', total: '₹2,414', amountDue: '₹2,414' },
//               { id: '00014', date: '08 Oct 2023', client: 'Fast Company', status: 'Paid', dueDate: '15 Oct 2023', total: '₹1,747', amountDue: '₹0' },
//               { id: '00013', date: '02 Oct 2023', client: 'Off-Grid', status: 'Awaiting Payment', dueDate: '30 Oct 2023', total: '₹2,141', amountDue: '₹2,141' },
//               { id: '00012', date: '15 Sep 2023', client: 'Figma', status: 'Awaiting Payment', dueDate: '15 Oct 2023', total: '₹3,181', amountDue: '₹3,181' },
//               { id: '00011', date: '10 Sep 2023', client: 'Fast Company', status: 'Overdue', dueDate: '30 Sep 2023', total: '₹1,747', amountDue: '₹1,747' },
//             ].map((invoice) => (
//               <TableRow key={invoice.id}>
//                 <TableCell><input type="checkbox" /></TableCell>
//                 <TableCell className="text-primary">{invoice.id}</TableCell>
//                 <TableCell>{invoice.date}</TableCell>
//                 <TableCell>{invoice.client}</TableCell>
//                 <TableCell>
//                   <Badge variant={invoice.status === 'Paid' ? 'success' : invoice.status === 'Overdue' ? 'destructive' : 'secondary'}>
//                     {invoice.status}
//                   </Badge>
//                 </TableCell>
//                 <TableCell>{invoice.dueDate}</TableCell>
//                 <TableCell>{invoice.total}</TableCell>
//                 <TableCell>{invoice.amountDue}</TableCell>
//                 <TableCell>
//                   <Button variant="ghost" size="icon">
//                     <MoreHorizontal className="h-4 w-4" />
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>

//         <div className="flex justify-between items-center mt-4">
//           <div className="flex items-center space-x-2">
//             <span className="text-sm text-gray-500">Showing</span>
//             <Select defaultValue="10">
//               <option>10</option>
//             </Select>
//             <span className="text-sm text-gray-500">invoices per page</span>
//           </div>
//           <div className="flex space-x-2">
//             <Button variant="outline" className="bg-primary text-white">1</Button>
//             <Button variant="outline">2</Button>
//             <Button variant="outline">3</Button>
//             <Button variant="outline">4</Button>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }

import React, { useEffect, useState } from "react";
import { Bell, ChevronDown, MoreHorizontal, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { link } from "fs";
interface InvoiceDetail {
  Supplier_Name: string;
  Customer_Name: string;
  Invoice_Number: string;
  Invoice_Date: string;
  Total_Amount: number;
}
export default function Dashboard() {
  
  const [detail, setDetail] = useState<InvoiceDetail[]>([]);
  const [filteredDetail, setFilteredDetail] = useState<InvoiceDetail[]>([]);
  const [buyerName, setBuyerName] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");
  const [sellerName, setSellerName] = useState("all");
  useEffect(() => {
    axios
      .get("http://localhost:4000/insert_full_invoice_detail")
      .then((response) => {
        setDetail(response.data);
        // setFilteredDetail(response.data);
        console.log('this is the data available'+detail)
      })
    
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    let data = [...detail];
    if (sellerName !== "all") {
      data = data.filter((invoice) => invoice.Supplier_Name === sellerName);
    }
    if (buyerName !== "all") {
      data = data.filter((invoice) => invoice.Customer_Name === buyerName);
    }
    if (sortOrder !== "none") {
      data = data.sort((a, b) => 
        sortOrder === "asc" ? a.Total_Amount - b.Total_Amount : b.Total_Amount - a.Total_Amount
      );
    }
    setFilteredDetail(data);
  }, [buyerName, sortOrder, sellerName, detail]);



  return (
    <div className="container mx-auto p-4 ">
      {/* <header className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold">ENVOICE</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="text-blue-600 border-b-2 border-blue-600 pb-1">Invoices</a></li>
              <li><a href="#" className="text-gray-600">Clients</a></li>
              <li><a href="#" className="text-gray-600">Service Items</a></li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Bell className="h-6 w-6 text-gray-600" />
          <img src="/placeholder.svg?height=32&width=32" alt="User avatar" className="w-8 h-8 rounded-full" />
          <ChevronDown className="h-4 w-4 text-gray-600" />
        </div>
      </header> */}

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-sm text-gray-600 mb-2">Overdue</h2>
          <p className="text-3xl font-bold">
            ₹4455.00{" "}
            <span className="text-sm font-normal text-gray-600">RS</span>
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-sm text-gray-600 mb-2">Total outstanding</h2>
          <p className="text-3xl font-bold">
            ₹7727.00{" "}
            <span className="text-sm font-normal text-gray-600">RS</span>
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-sm text-gray-600 mb-2">Get paid</h2>
          <p className="text-3xl font-bold">
            ₹1747.00{" "}
            <span className="text-sm font-normal text-gray-600">RS</span>
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-sm text-gray-600 mb-2">Uncollectible</h2>
          <p className="text-3xl font-bold">
            ₹0.00 <span className="text-sm font-normal text-gray-600">RS</span>
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <h2 className="text-xl font-semibold text-blue-600">Invoices</h2>
            <h2 className="text-xl font-semibold text-gray-400">Draft</h2>
          </div>
          <Link to={"/"}>
          <Button className="bg-blue-600 text-white">+ New Invoice</Button>
          </Link>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <Button variant="outline" className="text-blue-600 border-blue-600">
              All (40)
            </Button>
            <Button variant="outline">Outstanding (5)</Button>
            <Button variant="outline">Paid (33)</Button>
            <Button variant="outline">Uncollectible(2)</Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10"
              placeholder="Try invoice# or client name"
            />
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <Select>
              <option>All clients</option>
            </Select>
            <Select>
              <option>All Status</option>
            </Select>
            <Select>
              <option>All Time</option>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <Select>
              <option>Invoice#</option>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow >
              <TableHead className="w-[40px]"></TableHead>
              <TableHead>Invoice#</TableHead>
              <TableHead>Invoice Date</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Text</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Amount Due</TableHead>
              <TableHead className="w-[40px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              {
                id: "00015",
                date: "10 Oct 2023",
                client: "Telekitty",
                status: "Awaiting Payment",
                dueDate: "21 Oct 2023",
                total: "₹2,414",
                amountDue: "₹2,414",
              },
              {
                id: "00014",
                date: "08 Oct 2023",
                client: "Fast Company",
                status: "Paid",
                dueDate: "15 Oct 2023",
                total: "₹1,747",
                amountDue: "₹0",
              },
              {
                id: "00013",
                date: "02 Oct 2023",
                client: "Off-Grid",
                status: "Awaiting Payment",
                dueDate: "30 Oct 2023",
                total: "₹2,141",
                amountDue: "₹2,141",
              },
              {
                id: "00012",
                date: "15 Sep 2023",
                client: "Figma",
                status: "Awaiting Payment",
                dueDate: "15 Oct 2023",
                total: "₹3,181",
                amountDue: "₹3,181",
              },
              {
                id: "00011",
                date: "10 Sep 2023",
                client: "Fast Company",
                status: "Overdue",
                dueDate: "30 Sep 2023",
                total: "₹1,747",
                amountDue: "₹1,747",
              },
            ].map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>
                  <input type="checkbox" />
                </TableCell>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.client}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      invoice.status === "Paid"
                        ? "bg-green-100 text-green-800"
                        : invoice.status === "Overdue"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {invoice.status}
                  </span>
                </TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>{invoice.total}</TableCell>
                <TableCell>{invoice.amountDue}</TableCell>
                <TableCell>
                  <MoreHorizontal className="h-5 w-5" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Showing</span>
            <Select defaultValue="10">
              <option>10</option>
            </Select>
            <span className="text-sm text-gray-600">invoices per page</span>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="px-3 py-1">
              1
            </Button>
            <Button variant="outline" className="px-3 py-1">
              2
            </Button>
            <Button variant="outline" className="px-3 py-1">
              3
            </Button>
            <Button variant="outline" className="px-3 py-1">
              4
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
