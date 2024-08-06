import "../style/table_style.css";

function Estimate_Invoice() {
  return (
    <div className="table-div">
      <table border={1}>
        <tr>
          <td rowSpan={3} colSpan={2}>
            <p>name: vaibhav</p>
            <p>address: vile parle</p>
          </td>
          <td >hello</td>
          <td>world</td>
        </tr>
        <tr>
          <td>hello</td>
          <td>world</td>
        </tr>
        <tr>
          <td>hello</td>
          <td>world</td>
        </tr>

        <tr>
          <td className="wide" colSpan={2}>
            name:vaibhav <br />
            address:vile parle
          </td>
          <td colSpan={3} className="wide">
            <tr>
              <td className="innertd">hello</td>
              <td className="innertd">world</td>
            </tr>
            <tr>
              <td className="innertd">hello</td>
              <td className="innertd">world</td>
            </tr>
            <tr>
              <td className="innertd">hello</td>
              <td className="innertd">world</td>
            </tr>
          </td>
        </tr>

        <tr>
          <td className="wide" colSpan={2}>
            name:vaibhav <br />
            address:vile parle
          </td>
          <td className="innertd" colSpan={3}>
            Terms of Delivery
          </td>
        </tr>

        <tr>
          <td className="items">sr no</td>
          <td className="items">particulars</td>
          <td className="items">rate</td>
          <td className="items">qty</td>
          <td className="items">amount</td>
        </tr>
        <tr>
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
        </tr>
        <tr>
          <td className="items"></td>
          <td className="items"></td>
          <td className="items"></td>
          <td className="items"></td>
          <td className="items"></td>
        </tr>
        <tr>
          <td className="noborder"></td>
          <td className="noborder"></td>
          <td className="noborder"></td>
          <td className="noborder"></td>
          <td>SubTotal: 20000rs</td>
        </tr>
        <tr>
          <td className="noborder"></td>
          <td className="noborder"></td>
          <td className="noborder"></td>
          <td className="noborder"></td>
          <td>GST: 20000rs</td>
        </tr>
        <tr>
          <td className="noborder"></td>
          <td className="noborder"></td>
          <td className="noborder"></td>
          <td className="noborder"></td>
          <td>Total: 20000rs</td>
        </tr>
      </table>
    </div>
  );
}
export default Estimate_Invoice;
