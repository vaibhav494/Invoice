import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InvoiceDetail {
  sellerName: string;
  customerName: string;
  invoiceNumber: string;
  invoiceDate: string;
  totalAmount: number;
}

export default function Bill_detail() {
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
        console.log('this is the data available', response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let data = [...detail];
    if (sellerName !== "all") {
      data = data.filter((invoice) => invoice.sellerName === sellerName);
    }
    if (buyerName !== "all") {
      data = data.filter((invoice) => invoice.customerName === buyerName);
    }
    if (sortOrder !== "none") {
      data = data.sort((a, b) => 
        sortOrder === "asc" ? a.totalAmount - b.totalAmount : b.totalAmount - a.totalAmount
      );
    }
    setFilteredDetail(data);
  }, [buyerName, sortOrder, sellerName, detail]);

  return (
    <div className="h-full w-full">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            Seller Name
            <Select value={sellerName} onValueChange={setSellerName}>
              <SelectTrigger>
                <SelectValue placeholder="Select seller" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">all</SelectItem>
                {Array.from(new Set(detail.map(invoice => invoice.sellerName)))
                  .map((sellerName, index) => (
                    <SelectItem key={index} value={sellerName}>
                      {sellerName}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </TableHead>
          <TableHead>
            Buyer Name
            <Select value={buyerName} onValueChange={setBuyerName}>
              <SelectTrigger>
                <SelectValue placeholder="Select buyer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">all</SelectItem>
                {Array.from(new Set(detail.map(invoice => invoice.customerName)))
                  .map((buyerName, index) => (
                    <SelectItem key={index} value={buyerName}>
                      {buyerName}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </TableHead>
          <TableHead>Invoice Number</TableHead>
          <TableHead>Invoice Date</TableHead>
          <TableHead>
            Total Amount
            <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as "asc" | "desc" | "none")}>
              <SelectTrigger>
                <SelectValue placeholder="Sort order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredDetail.map((invoice, index) => (
          <TableRow key={index}>
            <TableCell>{invoice.sellerName}</TableCell>
            <TableCell>{invoice.customerName}</TableCell>
            <TableCell>{invoice.invoiceNumber}</TableCell>
            <TableCell>{invoice.invoiceDate}</TableCell>
            <TableCell>{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
}
