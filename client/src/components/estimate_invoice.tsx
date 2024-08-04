import "../style/table_style.css";

function Estimate_Invoice() {
  return (
    <div className="table-div">
      <table border={1}>
        <tr>
          <td className="wide">
            <div>
            <input type="text" placeholder="Enter Name" />
            <br />
            <textarea placeholder="Enter Address"></textarea>
            <br />
            <input type="text" placeholder="Enter GST" />
            <br />
            <input type="text" placeholder="Enter State" />
            </div>
            
          </td>
          <td className="narrow">
            <div className="detail">1</div>
            <div className="detail">2</div>
            <div className="detail">3</div>
          </td>
          <td className="narrow">
            <div className="detail">1</div>
            <div className="detail">2</div>
            <div className="detail">3</div>
          </td>
        </tr>
        <tr>
          <td className="wide">1</td>
          <td className="narrow">
            <tr>1</tr>
            <tr>2</tr>
            <tr>3</tr>
          </td>
          <td className="narrow">
            <tr>4</tr>
            <tr>5</tr>
            <tr>6</tr>
          </td>
        </tr>
        <tr>
          <td className="wide"></td>
          <td className="wide" colSpan={2}></td>
        </tr>
      </table>
    </div>
  );
}
export default Estimate_Invoice;
