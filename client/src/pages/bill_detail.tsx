import { useEffect, useState } from "react";
import axios from "axios";

// Interface for InvoiceDetail
interface InvoiceDetail {
  Seller_Name: string;
  Buyer_Name: string;
  Invoice_Number: string;
  Invoice_Date: string;
  Total_Amount: number;
}

function Bill_detail() {
  const [detail, setDetail] = useState<InvoiceDetail[]>([]);
  const [filteredDetail, setFilteredDetail] = useState<InvoiceDetail[]>([]);
  const [buyerName, setBuyerName] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");
  const [sellerName, setSellerName] = useState("all");

  // Fetching details
  useEffect(() => {
    axios
      .get("http://localhost:4000/insert_full_invoice_detail")
      .then((response) => {
        setDetail(response.data);
        setFilteredDetail(response.data); // Initialize filteredDetail with full data
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Update filtered details when buyerName or sortOrder changes
  useEffect(() => {
    let data = [...detail];
    if (sellerName !== "all") {
      data = data.filter((invoice) => invoice.Seller_Name === sellerName);
    }
    if (buyerName !== "all") {
      data = data.filter((invoice) => invoice.Buyer_Name === buyerName);
    }
    if (sortOrder !== "none") {
      data = data.sort((a, b) => sortOrder === "asc" ? a.Total_Amount - b.Total_Amount : b.Total_Amount - a.Total_Amount);
    }
    setFilteredDetail(data);
  }, [buyerName, sortOrder, sellerName, detail]);

  return (
    <>
      <table className="bill_detail_main">
        <thead>
          <tr>
            <th>Seller Name
            <select
                id="seller_select"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
              >
                <option value="all">all</option>
                {detail
                  .map((invoice) => invoice.Seller_Name)
                  .filter((value, index, self) => self.indexOf(value) === index)
                  .map((sellerName, index) => (
                    <option key={index} value={sellerName}>
                      {sellerName}
                    </option>
                  ))}
              </select>
            </th>
            <th>
              Buyer Name
              <select
                id="buyer_select"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
              >
                <option value="all">all</option>
                {detail
                  .map((invoice) => invoice.Buyer_Name)
                  .filter((value, index, self) => self.indexOf(value) === index)
                  .map((buyerName, index) => (
                    <option key={index} value={buyerName}>
                      {buyerName}
                    </option>
                  ))}
              </select>
            </th>
            <th>Invoice Number</th>
            <th>Invoice Date</th>
            <th>
              Total Amount
              <select
                id="sort_order"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as "asc" | "desc" | "none")}
              >
                <option value="none">None</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </th>
          </tr>
        </thead>
        <tbody className="bill_detail_content">
          {filteredDetail.map((invoice, index) => (
            <tr key={index}>
              <td>{invoice.Seller_Name}</td>
              <td>{invoice.Buyer_Name}</td>
              <td>{invoice.Invoice_Number}</td>
              <td>{invoice.Invoice_Date}</td>
              <td>{invoice.Total_Amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Bill_detail;
