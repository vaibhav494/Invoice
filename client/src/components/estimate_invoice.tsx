import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


function Estimate_Invoice() {
  const downloadPDF = () => {
    const input = document.getElementById('invoice-table');
    if (input) {  // Add null check here
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save("invoice.pdf");
      });
    } else {
      console.error('Element not found!');
    }
  };

  return (
    <>
      <div className="table-div" id="invoice-table">
        <table border={1}>
          {/* First Table */}
          <tr>
            <td rowSpan={3}>
              <input type="text" placeholder="Enter Business Name" />
              <br />
              <textarea
                name="address"
                id="address"
                placeholder="Enter Address"
              ></textarea>
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
              <textarea
                name="address"
                id="address"
                placeholder="Enter Address"
              ></textarea>
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
              <textarea
                name="address"
                id="address"
                placeholder="Enter Address"
              ></textarea>
              <br />
              GST: <input type="text" placeholder="Enter GST" />
              <br />
              State Code: <input type="text" placeholder="Enter State Code" />
            </td>
            <td colSpan={2} className="terms-of-delivery">
              Terms of Delivery
              <br />
              <textarea
                name="terms-of-delivery"
                id="terms-of-delivery"
                placeholder="Enter"
              ></textarea>
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
            <td colSpan={7}>
              Amount Chargeable(in words) <br />
              AMOUNT
            </td>
          </tr>
        </table>

        {/* Third Table */}
        <table border={1}>
          <tr>
            <td rowSpan={2} className="tax-hsn-sac">
              HSN/SAC
            </td>
            <td rowSpan={2} className="tax">
              Taxable Value
            </td>
            <td colSpan={2} className="tax">
              Integrated Tax
            </td>
            <td rowSpan={2} className="tax">
              Total Tax Amount
            </td>
          </tr>
          <tr>
            <td className="tax">Rate</td>
            <td className="tax">Amount</td>
          </tr>
          <tr>
            <td className="tax"></td>
            <td className="tax">90,000</td>
            <td className="tax">18%</td>
            <td className="tax">16,200</td>
            <td className="tax">16,200</td>
          </tr>
          <tr>
            <td className="total">Total</td>
            <td className="tax">90,000</td>
            <td className="tax"></td>
            <td className="tax">16,200</td>
            <td className="tax">16,200</td>
          </tr>
          <tr>
            <td colSpan={5} className="noborder">
              Tax Amount (in Words): Indian Rupee Sixteen Thousand Two Hundred
              Only
            </td>
          </tr>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <tr>
            <td className="noborder"></td>
            <td colSpan={4}>hello</td>
          </tr>
        </table>
      </div>
      <button onClick={downloadPDF}>Download PDF</button>
    </>
  );
}
export default Estimate_Invoice;
