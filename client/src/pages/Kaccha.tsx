import React from 'react'

function Kaccha() {
  return (
        <div className="table-div">
        <table border={1}>
          {/* First Table */}
          <tr>
            <td >
              <input type="text" placeholder="Enter Business Name" />
              <br />
              <textarea placeholder="Enter Address"></textarea>
              <br />
              GST:{" "}
              <select>
                <option>Select GST</option>
              </select>
              <br />
              State Code:{" "}
              <select>
                <option>Select State Code</option>
              </select>
            </td>
      
            <td className="top-right-td">
              Invoice Number <br />
              <input type="text" placeholder="Enter" />
            </td>
            
          </tr>
          
      
          <tr>
            <td >
              <select>
                <option>Select Company Name</option>
              </select>
              <br />
              <textarea placeholder="Enter Address"></textarea>
              <br />
              GST:{" "}
              <select>
                <option>Select GST</option>
              </select>
              <br />
              State Code:{" "}
              <select>
                <option>Select State Code</option>
              </select>
            </td>
            
            <td className="top-right-td">
              Dated <br />
              <input type="text" placeholder="Enter" />
            </td>
          </tr>
        </table>
      
        {/* Second Table */}
        <table border={1}>
          <tr>
            <td className="sr-no">Sr No</td>
            <td className="particulars">Particulars</td>
            <td className="HSN-SAC">HSN/SAC</td>
            <td className="qty">Qty</td>
            <td className="rate">Rate</td>
            <td className="per">%</td>
            <td className="amount">Amount</td>
          </tr>
          <tr>
            <td className="items">1</td>
            <td className="items">
              <input type="text" placeholder="Enter" />
            </td>
            <td className="items">
              <input type="text" placeholder="Enter" />
            </td>
            <td className="items">
              <input type="number" />
            </td>
            <td className="items">
              <input type="number" />
            </td>
            <td className="items"></td>
            <td className="items">0.00</td>
          </tr>
      
          <tr>
            <td colSpan={6} className="total">
              Total
            </td>
            <td className="total-amount">0.00</td>
          </tr>
          <tr>
            <td colSpan={7}>
              Amount Chargeable (in words) <br />
              Zero Rupees Only
            </td>
          </tr>
        </table>
      
      </div>
      

  )
}

export default Kaccha