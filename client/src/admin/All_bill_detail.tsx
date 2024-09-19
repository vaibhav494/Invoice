import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  ChevronDown,
  ChevronUp,
  Search,
  ChevronLeft,
  ChevronRight,
  Pencil,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { useUser } from "@clerk/clerk-react";
interface InvoiceDetail {
  sellerName: string;
  customerName: string;
  invoiceNumber: string;
  invoiceDate: string;
  totalAmount: number;
  status: string;
  userId: string;
}

type StatusType = "all" | "Pending" | "Paid" | "Defaulted";
type SortOrder = "asc" | "desc" | "none";

const ITEMS_PER_PAGE = 10;

export default function All_bill_detail() {
  const [detail, setDetail] = useState<InvoiceDetail[]>([]);
  const [filteredDetail, setFilteredDetail] = useState<InvoiceDetail[]>([]);
  const [buyerName, setBuyerName] = useState("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");
  const [sellerName, setSellerName] = useState("all");
  const [status, setStatus] = useState<StatusType>("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingInvoice, setEditingInvoice] = useState<InvoiceDetail | null>(
    null
  );
  const { user } = useUser(); // Get user from Clerk

  useEffect(() => {
    if (user) {
      // Ensure user is available
      axios
        .get(
          `http://localhost:4000/admin/get_all_bill_details`
        ) // Pass userId as a query parameter
        .then((response) => {
          setDetail(response.data);
          console.log("this is the data available", response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]); // Add user as a dependency

  useEffect(() => {
    let data = [...detail];
    if (sellerName !== "all") {
      data = data.filter((invoice) => invoice.sellerName === sellerName);
    }
    if (buyerName !== "all") {
      data = data.filter((invoice) => invoice.customerName === buyerName);
    }
    if (status !== "all") {
      data = data.filter((invoice) => invoice.status === status);
    }
    if (search) {
      data = data.filter(
        (invoice) =>
          invoice.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
          invoice.invoiceDate.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (sortOrder !== "none") {
      data = data.sort((a, b) =>
        sortOrder === "asc"
          ? a.totalAmount - b.totalAmount
          : b.totalAmount - a.totalAmount
      );
    }
    setFilteredDetail(data);
    setCurrentPage(1); // Reset to first page when filters change
  }, [buyerName, sortOrder, sellerName, status, search, detail]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Defaulted":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalPages = Math.ceil(filteredDetail.length / ITEMS_PER_PAGE);
  const paginatedData = filteredDetail.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleStatusUpdate = useCallback(
    async (invoiceNumber: string, newStatus: string) => {
      try {
        await axios.put(`http://localhost:4000/update_invoice_status`, {
          invoiceNumber,
          newStatus,
          userId: user?.id, // Add user ID to the request
        });
        setDetail((prevDetail) =>
          prevDetail.map((invoice) =>
            invoice.invoiceNumber === invoiceNumber &&
            invoice.userId === user?.id
              ? { ...invoice, status: newStatus }
              : invoice
          )
        );
        toast({
          title: "Status Updated",
          description: `Invoice ${invoiceNumber} status changed to ${newStatus}`,
        });
      } catch (error) {
        console.error("Error updating status:", error);
        toast({
          title: "Error",
          description: "Failed to update invoice status",
          variant: "destructive",
        });
      }
    },
    [user?.id]
  ); // Add user.id to the dependency array

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Invoice Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <Select value={sellerName} onValueChange={setSellerName}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Select seller" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sellers</SelectItem>
              {Array.from(new Set(detail.map((invoice) => invoice.sellerName)))
                .filter((sellerName) => sellerName && sellerName.trim() !== "") // Filter out empty values
                .map((sellerName, index) => (
                  <SelectItem key={index} value={sellerName}>
                    {sellerName}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          <Select value={buyerName} onValueChange={setBuyerName}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Select buyer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Buyers</SelectItem>
              {Array.from(
                new Set(detail.map((invoice) => invoice.customerName))
              )
                .filter((customerName) => customerName && customerName.trim() !== "") // Filter out empty values
                .map((customerName, index) => (
                  <SelectItem key={index} value={customerName}>
                    {customerName}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          <Select
            value={status}
            onValueChange={(value: StatusType) => setStatus(value)}
          >
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Defaulted">Defaulted</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search invoice number or date"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>UserId</TableHead>
                <TableHead>Seller Name</TableHead>
                <TableHead>Buyer Name</TableHead>
                <TableHead>Invoice Number</TableHead>
                <TableHead>Invoice Date</TableHead>
                <TableHead className="text-right">
                  Total Amount
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2"
                    onClick={() =>
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                  >
                    {sortOrder === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((invoice, index) => (
                <TableRow key={index}>
                  <TableCell>{invoice.userId}</TableCell>
                  <TableCell>{invoice.sellerName}</TableCell>
                  <TableCell>{invoice.customerName}</TableCell>
                  <TableCell>{invoice.invoiceNumber}</TableCell>
                  <TableCell>{invoice.invoiceDate}</TableCell>
                  <TableCell className="text-right">
                    ${invoice.totalAmount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          invoice.status
                        )}`}
                      >
                        {invoice.status}
                      </span>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingInvoice(invoice)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Invoice Status</DialogTitle>
                          </DialogHeader>
                          <Select
                            value={editingInvoice?.status}
                            onValueChange={(value) => {
                              if (editingInvoice) {
                                handleStatusUpdate(
                                  editingInvoice.invoiceNumber,
                                  value
                                );
                                setEditingInvoice(null);
                              }
                            }}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select new status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Pending">Pending</SelectItem>
                              <SelectItem value="Paid">Paid</SelectItem>
                              <SelectItem value="Defaulted">
                                Defaulted
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredDetail.length)} of{" "}
            {filteredDetail.length} entries
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
