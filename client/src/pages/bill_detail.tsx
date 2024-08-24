import { useEffect, useState } from "react";
import axios from "axios";

interface InvoiceDetail {
  supplier_company_name: string;
  customer_company_name: string;
  invoice_number: string;
  invoice_date: string;
  //Total_Amount: number;
}

function Bill_detail() {
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
      data = data.filter((invoice) => invoice.supplier_company_name === sellerName);
    }
    if (buyerName !== "all") {
      data = data.filter((invoice) => invoice.customer_company_name === buyerName);
    }
    // if (sortOrder !== "none") {
    //   data = data.sort((a, b) => sortOrder === "asc" ? a.Total_Amount - b.Total_Amount : b.Total_Amount - a.Total_Amount);
    // }
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
                  .map((invoice) => invoice.supplier_company_name)
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
                  .map((invoice) => invoice.supplier_company_name)
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
              <td>{invoice.supplier_company_name}</td>
              <td>{invoice.customer_company_name}</td>
              <td>{invoice.invoice_number}</td>
              <td>{invoice.invoice_date}</td>
              {/* <td>{invoice.Total_Amount}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Bill_detail;
