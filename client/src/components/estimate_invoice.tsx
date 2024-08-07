import "../style/table_style.css";

function Estimate_Invoice() {
  return (
    <>
      <div className="table-div">
        <table border={1}>
          {/* First Table */}
          <tr>
            <td rowSpan={3}>
              <input type="text" placeholder="Enter Business Name" />
              <br />
              <textarea name="address" id="address" placeholder="Enter Address"></textarea>
              <br />
              GST: <input type="text" placeholder="Enter GST" />
              <br />
              State Code: <input type="text" placeholder="Enter State Code" />
            </td>

            <td className="top-right-td">
              Invoice Number
              <br />
              <input type="text" placeholder="Enter" />
            </td>
            <td className="top-right-td">
              Dated
              <br />
              <input type="text" placeholder="Enter" />
            </td>
          </tr>
          <tr>
            <td className="top-right-td">
              Delivery Note
              <br />
              <input type="text" placeholder="Enter" />
            </td>
            <td className="top-right-td">
              Mode/Terms of Payment
              <br />
              <input type="text" placeholder="Enter" />
            </td>
          </tr>
          <tr>
            <td className="top-right-td">
              Reference No. & Date.
              <br />
              <input type="text" placeholder="Enter" />
            </td>
            <td className="top-right-td">
              Other References
              <br />
              <input type="text" placeholder="Enter" />
            </td>
          </tr>

          <tr>
            <td rowSpan={3}>
              <input type="text" placeholder="Enter Business Name" />
              <br />
              <textarea name="address" id="address" placeholder="Enter Address"></textarea>
              <br />
              GST: <input type="text" placeholder="Enter GST" />
              <br />
              State Code: <input type="text" placeholder="Enter State Code" />
            </td>

            <td className="top-right-td">
              Buyer's Order No.
              <br />
              <input type="text" placeholder="Enter" />
            </td>
            <td className="top-right-td">
              Dated
              <br />
              <input type="text" placeholder="Enter" />
            </td>
          </tr>
          <tr>
            <td className="top-right-td">
              Dispatch Doc
              <br />
              <input type="text" placeholder="Enter" />
            </td>
            <td className="top-right-td">
              Delivery Note Date
              <br />
              <input type="text" placeholder="Enter" />
            </td>
          </tr>
          <tr>
            <td className="top-right-td">
              Dispatched through
              <br />
              <input type="text" placeholder="Enter" />
            </td>
            <td className="top-right-td">
              Destination
              <br />
              <input type="text" placeholder="Enter" />
            </td>
          </tr>

          <tr>
            <td>
              <input type="text" placeholder="Enter Business Name" />
              <br />
              <textarea name="address" id="address" placeholder="Enter Address"></textarea>
              <br />
              GST: <input type="text" placeholder="Enter GST" />
              <br />
              State Code: <input type="text" placeholder="Enter State Code" />
            </td>
            <td colSpan={2} className="terms-of-delivery">
              Terms of Delivery
              <br />
              <textarea name="terms-of-delivery" id="terms-of-delivery" placeholder="Enter"></textarea>
            </td>
          </tr>
        </table>

        {/* Second Table */}
        <table border={1}>
          {/* Duplicate the first table structure here */}
          <tr>
          <td className="sr-no">sr no</td>
          <td className="particulars">particulars</td>
          <td className="HSN-SAC">HSN/SAC</td>
          <td className="qty">qty</td>
          <td className="rate">rate</td>
          
          <td className="per">%</td>
          <td className="amount">amount</td>
          
        </tr>
        <tr>
          <td className="items"></td>
          <td className="items"></td>
          <td className="items"></td>
          <td className="items"></td>
          <td className="items"></td>
          <td className="items"></td>
          <td className="items"></td>
        </tr>
        <tr>
          <td className="items"></td>
          <td className="items"></td>
          <td className="items"></td>
          <td className="items"></td>
          <td className="items"></td>
          <td className="items"></td>
          <td className="items"></td>
        </tr>
        <tr>
          <td className="items"></td>
          <td className="items"></td>
          <td className="items"></td>
          <td className="items"></td>
          <td className="items"></td>
          <td className="items"></td>
          <td className="items"></td>
        </tr>
        <tr>
          <td className="items"></td>
          <td className="total">Total</td>
          <td className="items"></td>
          <td className="items"></td>
          <td className="items"></td>
          <td className="items"></td>
          <td className="total-amount">10000</td>
        </tr>
        <tr>
          <td colSpan={7}>Amount Chargeable(in words) <br />AMOUNT</td>
        </tr>
        
        
        </table>
      </div>
    </>
  );
}
export default Estimate_Invoice;