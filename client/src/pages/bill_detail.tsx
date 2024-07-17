import { useEffect, useState } from "react";
import axios from "axios";

interface InvoiceDetail {
  Seller_Name: string;
  Buyer_Name: string;
  Invoice_Number: string;
  Invoice_Date: string;
  Total_Amount: number;
}
function Bill_detail() {
    const [detail, setDetail] = useState<InvoiceDetail[]>([]);

    useEffect(() => {
        axios
            .get("http://localhost:4000/insert_full_invoice_detail")
            .then((response) => setDetail(response.data))
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <table className="bill_detail_main">
                <thead>
                    <tr>
                        <th>Seller Name</th>
                        <th>Buyer Name</th>
                        <th>Invoice Number</th>
                        <th>Invoice Date</th>
                        <th>Total Amount</th>
                    </tr>
                </thead>
                <tbody className="bill_detail_content">
                    {detail.map((invoice, index) => (
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
