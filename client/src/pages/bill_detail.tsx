import { useEffect, useState } from "react";
import axios from "axios";
const [detail, setDetail] = useState<any>([])
function Bill_detail() {
    useEffect(() => {
        axios
            .get("http://localhost:4000/insert_full_invoice_detail")
            .then((invoice_detail) => setDetail(invoice_detail))
            .catch((err) => {
            console.log(err);
            });
    }, []); 
    function generate(){
        <tr>
            <th></th>
        </tr>
    }
    
  return (
    <>
      <table className="bill_detail_main">
        <tr>
          <th>Seller Name</th>
          <th>Buyer Name</th>
          <th>Invoice Number</th>
          <th>Invoice Date</th>
          <th>Total Amount</th>
          
        </tr>
        
      </table>
    </>
  );
}
export default Bill_detail;
