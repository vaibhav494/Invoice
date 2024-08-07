import { FC, useState, useEffect } from "react";
import { invoice, product_line_1 } from "../data/types";
import { initial_invoice, initial_product_line } from "../data/initial_data";
import Input from "./input";
import Select from "./select";
import Textarea from "./textarea";
import Calendar from "./calendar";
import gst_list from "../data/dropdown_data/gst_list";
import state_list from "../data/dropdown_data/state_list";
import Document from "./document";
import Page from "./page";
import View from "./view";
import Text from "./text";
import { Font } from "@react-pdf/renderer";
import Download from "./download_pdf";
import { format } from "date-fns/format";
// import { useCommonContext } from "../context_common/context";
import axios from "axios";
import Axios  from "axios";
import { ToWords } from 'to-words';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../style/table_style.css";

Font.register({
  family: "Nunito",
  fonts: [
    { src: "https://fonts.gstatic.com/s/nunito/v12/XRXV3I6Li01BKofINeaE.ttf" },
    {
      src: "https://fonts.gstatic.com/s/nunito/v12/XRXW3I6Li01BKofA6sKUYevN.ttf",
      fontWeight: 600,
    },
  ],
});

interface Props {
  data?: invoice;
  pdfMode?: boolean;
  onChange?: (invoice: invoice) => void;
  fstate:string[];
}

const MainInvoice: FC<Props> = ({ data, pdfMode, onChange, fstate }) => {
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
  const [invoiceState, setInvoiceState] = useState<invoice>(
    //use the comment section to remember data when reload
    //data ? { ...data } : { ...initial_invoice }
    initial_invoice
  );
  // will be using this seller_name here

  //  const { sname } = useCommonContext();

  const seller_name_list = fstate.map((seller: any) => ({
    value: seller.id,
    text: seller.name,
  }));

  const [subTotal, setSubTotal] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [Total_GST, setTotalGST] = useState<number>(0);
  const toWords = new ToWords();

  let words = toWords.convert(subTotal, { currency: true });
  const date_format = "MMM dd, yyyy";
  const invoiceDate =
    invoiceState.invoice_date !== ""
      ? new Date(invoiceState.invoice_date)
      : new Date();

  const data_add_db = (e : any)=>{
    e.preventDefault();
    Axios.post("http://localhost:4000/insert_full_invoice_detail", {
      Seller_name:invoiceState.buyer_company_name,
      Buyer_name:invoiceState.seller_billing_company_name,
      Invoice_number: invoiceState.invoice_number,
      Invoice_date:invoiceState.invoice_date,
      Total_amount:subTotal
    
    }).then((data) => {
      console.log(data);
    });
  }

  const handleChange = (name: keyof invoice, value: string | number) => {
    if (name !== "product_all_detail") {
      const newInvoice = { ...invoiceState };
      if (typeof value === "string") {
        newInvoice[name] = value;
      }
      setInvoiceState(newInvoice);
    }
  };

  const handleProductLineChange = (
    index: number,
    name: keyof product_line_1,
    value: string
  ) => {
    const product_all_detail = invoiceState.product_all_detail.map(
      (Product_line_1, i) => {
        if (i === index) {
          const newProductLine = { ...Product_line_1 };

          if (name === "particulars") {
            newProductLine[name] = value;
          } else {
            if (
              value[value.length - 1] === "." ||
              (value[value.length - 1] === "0" && value.includes("."))
            ) {
              newProductLine[name] = value;
            } else {
              const n = parseFloat(value);

              newProductLine[name] = (n ? n : 0).toString();
            }
          }

          return newProductLine;
        }

        return { ...Product_line_1 };
      }
    );

    setInvoiceState({ ...invoiceState, product_all_detail });
  };

  const handleRemove = (i: number) => {
    const product_all_detail = invoiceState.product_all_detail.filter(
      (_, index) => index !== i
    );

    setInvoiceState({ ...invoiceState, product_all_detail });
  };

  const handleAdd = () => {
    const product_all_detail = [
      ...invoiceState.product_all_detail,
      { ...initial_product_line },
    ];

    setInvoiceState({ ...invoiceState, product_all_detail });
  };

  const calculateAmount = (quantity: string, rate: string) => {
    const quantityNumber = parseFloat(quantity);
    const rateNumber = parseFloat(rate);
    const amount =
      quantityNumber && rateNumber ? quantityNumber * rateNumber : 0;

    return amount.toFixed(2);
  };
  
  //GST Calculation
  useEffect(()=>{
    let gst = 0;
    invoiceState.product_all_detail?.forEach((Product_line_1) => {  
      const quantityNumber = parseFloat(Product_line_1.quantity);
      const rateNumber = parseFloat(Product_line_1.rate);
      const amount =
        quantityNumber && rateNumber ? quantityNumber * rateNumber : 0;
      if (rateNumber < 1000){
        gst += amount * 5 / 100
      }
      if (rateNumber > 1000){
        gst += amount * 12 /100
      }
    });
    setTotalGST(gst);
    console.log('this is gst'+Total_GST)
  },[invoiceState.product_all_detail])
  useEffect(() => {
    let sub_total = 0;

    invoiceState.product_all_detail?.forEach((Product_line_1) => {
      const quantityNumber = parseFloat(Product_line_1.quantity);
      const rateNumber = parseFloat(Product_line_1.rate);
      const amount =
        quantityNumber && rateNumber ? quantityNumber * rateNumber : 0;

      sub_total += amount;
    });

    setSubTotal(sub_total);
  }, [invoiceState.product_all_detail]);

  useEffect(() => {
    if (subTotal && invoiceState.product_discount) {
      const discount =
        (subTotal * parseFloat(invoiceState.product_discount)) / 100;
      setDiscount(discount);
    } else {
      setDiscount(0);
    }
  }, [subTotal, invoiceState.product_discount]);

  useEffect(() => {
    if (onChange) {
      onChange(invoiceState);
    }
  }, [onChange, invoiceState]);

  // seller billing details update based on seller name
  useEffect(() => {
    if (invoiceState.seller_billing_company_name) {
      const url = `http://localhost:4000/get_seller_detail/${invoiceState.seller_billing_company_name}`;

      axios
        .get(url)
        .then((response: any) => {
          const sellerDetail = response.data;

          const updatedInvoiceState = {
            ...invoiceState,
            seller_billing_address: sellerDetail.address || "",
            seller_billing_gstin: sellerDetail.gst || "",
            seller_billing_state_name: sellerDetail.state || "",
          };

          setInvoiceState(updatedInvoiceState);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [invoiceState.seller_billing_company_name]);

  // seller shipping details update based on seller name
  useEffect(() => {
    if (invoiceState.seller_shipping_company_name) {
      const url = `http://localhost:4000/get_seller_detail/${invoiceState.seller_shipping_company_name}`;
      
      axios
        .get(url)
        .then((response: any) => {
          const sellerDetail = response.data;

          const updatedInvoiceState = {
            ...invoiceState,
            seller_shipping_address: sellerDetail.address || "",
            seller_shipping_gstin: sellerDetail.gst || "",
            seller_shipping_state_name: sellerDetail.state || "",
          };

          setInvoiceState(updatedInvoiceState);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [invoiceState.seller_shipping_company_name]);

  return(
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
};

export default MainInvoice;