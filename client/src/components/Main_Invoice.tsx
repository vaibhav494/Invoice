import { FC, useState, useEffect } from "react";
import { invoice, product_line_1 } from "../data/types";
import { initial_invoice, initial_product_line } from "../data/initial_data";
import { Font } from "@react-pdf/renderer";
// import { useCommonContext } from "../context_common/context";
import axios from "axios";
import Axios from "axios";
import { ToWords } from "to-words";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../style/table_style.css";
import gst_list from "../data/dropdown_data/gst_list";
import state_list from "../data/dropdown_data/state_list";

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
  fstate: string[];
}

const MainInvoice: FC<Props> = ({ onChange, fstate }) => {
  const downloadPDF = () => {
    const input = document.getElementById("invoice-table");
    if (input) {
      // Add null check here
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("invoice.pdf");
      });
    } else {
      console.error("Element not found!");
    }
  };
  const [invoiceState, setInvoiceState] = useState<invoice>(
    // use the comment section to remember data when reload
    // data ? { ...data } : { ...initial_invoice }
    initial_invoice
  );
  // will be using this seller_name here

  //  const { sname } = useCommonContext();

  const customer_name_list = fstate.map((seller: any) => ({
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

  const data_add_db = (e: any) => {
    e.preventDefault();
    Axios.post("http://localhost:4000/insert_full_invoice_detail", {
      Supplier_name: invoiceState.supplier_company_name,
      Customer_name: invoiceState.customer_billing_company_name,
      Invoice_number: invoiceState.invoice_number,
      Invoice_date: invoiceState.invoice_date,
      Total_amount: subTotal,
    }).then((data) => {
      console.log(data);
    });
  };

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
  useEffect(() => {
    let gst = 0;
    invoiceState.product_all_detail?.forEach((Product_line_1) => {
      const quantityNumber = parseFloat(Product_line_1.quantity);
      const rateNumber = parseFloat(Product_line_1.rate);
      const amount =
        quantityNumber && rateNumber ? quantityNumber * rateNumber : 0;
      if (rateNumber < 1000) {
        gst += (amount * 5) / 100;
      }
      if (rateNumber > 1000) {
        gst += (amount * 12) / 100;
      }
    });
    setTotalGST(gst);
    console.log("this is gst" + Total_GST);
  }, [invoiceState.product_all_detail]);
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

  // customer billing details update based on customer name
  useEffect(() => {
    if (invoiceState.customer_billing_company_name) {
      const url = `http://localhost:4000/get_seller_detail/${invoiceState.customer_billing_company_name}`;

      axios
        .get(url)
        .then((response: any) => {
          const customerDetail = response.data;

          const updatedInvoiceState = {
            ...invoiceState,
            customer_billing_address: customerDetail.address || "",
            customer_billing_gstin: customerDetail.gst || "",
            customer_billing_state_name: customerDetail.state || "",
          };

          setInvoiceState(updatedInvoiceState);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [invoiceState.customer_billing_company_name]);

  // seller shipping details update based on seller name
  useEffect(() => {
    console.log(invoiceState.customer_shipping_company_name);
    if (invoiceState.customer_shipping_company_name) {
      const url = `http://localhost:4000/get_seller_detail/${invoiceState.customer_shipping_company_name}`;

      axios
        .get(url)
        .then((response: any) => {
          const customerDetail = response.data;

          const updatedInvoiceState = {
            ...invoiceState,
            customer_shipping_address: customerDetail.address || "",
            customer_shipping_gstin: customerDetail.gst || "",
            customer_shipping_state_name: customerDetail.state || "",
          };

          setInvoiceState(updatedInvoiceState);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [invoiceState.customer_shipping_company_name]);

  return (
    <>
      <div className="table-div" id="invoice-table">
        <table border={1}>
          {/* First Table */}
          <tr>
            <td rowSpan={3}>
              <input
                type="text"
                placeholder="Enter Business Name"
                value={invoiceState.supplier_company_name}
                onChange={(e) =>
                  handleChange("supplier_company_name", e.target.value)
                }
              />
              <br />
              <textarea
                value={invoiceState.supplier_billing_address}
                onChange={(e) =>
                  handleChange("supplier_billing_address", e.target.value)
                }
                name="address"
                id="address"
                placeholder="Enter Address"
              ></textarea>
              <br />
              GST:{" "}
              <select name="gst" id="gst" value={invoiceState.supplier_gstin}>
                {gst_list?.map((option) => (
                  <option key={option.text} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
              <br />
              State Code:{" "}
              <select
                name="state"
                id="state"
                value={invoiceState.supplier_state_name}
              >
                {state_list?.map((option) => (
                  <option key={option.text} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </td>

            <td className="top-right-td">
              Invoice Number <br />
              <input
                type="text"
                name="invoice-number"
                id="invoice-number"
                value={invoiceState.invoice_number}
                placeholder="Enter"
                onChange={(e) => handleChange("invoice_number", e.target.value)}
              />
            </td>
            <td className="top-right-td">
              Dated <br />
              <input
                type="text"
                name="invoice-date"
                id="invoice-date"
                value={invoiceState.invoice_date}
                placeholder="Enter"
                onChange={(e) => handleChange("invoice_date", e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td className="top-right-td">
              Delivery Note
              <br />
              <input
                type="text"
                name="delivery-note"
                id="delivery-note"
                value={invoiceState.delivery_note}
                placeholder="Enter"
                onChange={(e) => handleChange("delivery_note", e.target.value)}
              />
            </td>
            <td className="top-right-td">
              Mode/Terms of Payment
              <br />
              <input
                type="text"
                name="mode-terms-of-payment"
                id="mode-terms-of-payment-note"
                value={invoiceState.mode_terms_of_payment}
                placeholder="Enter"
                onChange={(e) =>
                  handleChange("mode_terms_of_payment", e.target.value)
                }
              />
            </td>
          </tr>
          <tr>
            <td className="top-right-td">
              Reference No. & Date.
              <br />
              <input
                type="text"
                name="reference-number-and-date"
                id="reference-number-and-date"
                value={invoiceState.reference_number_and_date}
                placeholder="Enter"
                onChange={(e) =>
                  handleChange("reference_number_and_date", e.target.value)
                }
              />
            </td>
            <td className="top-right-td">
              Other References
              <br />
              <input
                type="text"
                name="other-references"
                id="other-references"
                value={invoiceState.other_references}
                placeholder="Enter"
                onChange={(e) =>
                  handleChange("other_references", e.target.value)
                }
              />
            </td>
          </tr>

          <tr>
            <td rowSpan={3}>
              {/* <input
                type="text"
                placeholder="Enter Business Name"
                value={invoiceState.customer_billing_company_name}
                onChange={(e) =>
                  handleChange("customer_billing_company_name", e.target.value)
                }

              /> */}
              <select
                name="customer-billing-company-name"
                id="customer-billing-company-name"
                value={invoiceState.customer_billing_company_name}
                onChange={(e) =>
                  handleChange("customer_billing_company_name", e.target.value)
                }
              >
                <option>Select Company Name</option>
                {customer_name_list?.map((option) => (
                  <option key={option.text} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
              <br />
              <textarea
                value={invoiceState.customer_billing_address}
                onChange={(e) =>
                  handleChange("customer_billing_address", e.target.value)
                }
                name="address"
                id="address"
                placeholder="Enter Address"
              ></textarea>
              <br />
              GST:{" "}
              <select
                name="gst"
                id="gst"
                value={invoiceState.customer_billing_gstin}
                onChange={(e) =>
                  handleChange("customer_billing_gstin", e.target.value)
                }
              >
                {gst_list?.map((option) => (
                  <option key={option.text} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
              <br />
              State Code:
              <select
                name="state"
                id="state"
                value={invoiceState.customer_billing_state_name}
                onChange={(e) =>
                  handleChange("customer_billing_state_name", e.target.value)
                }
              >
                {state_list?.map((option) => (
                  <option key={option.text} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </td>

            <td className="top-right-td">
              Buyer's Order No.
              <br />
              <input
                type="text"
                name="buyers-order-number"
                id="buyers-order-number"
                value={invoiceState.buyers_order_number}
                placeholder="Enter"
                onChange={(e) =>
                  handleChange("buyers_order_number", e.target.value)
                }
              />
            </td>
            <td className="top-right-td">
              Dated
              <br />
              <input
                type="text"
                name="dated-customer"
                id="dated-customer"
                value={invoiceState.dated_customer}
                placeholder="Enter"
                onChange={(e) => handleChange("dated_customer", e.target.value)}
              ></input>
            </td>
          </tr>
          <tr>
            <td className="top-right-td">
              Dispatch Doc
              <br />
              <input
                type="text"
                name="dispatch-doc"
                id="dispatch-doc"
                value={invoiceState.dispatch_doc_number}
                placeholder="Enter"
                onChange={(e) =>
                  handleChange("dispatch_doc_number", e.target.value)
                }
              />
            </td>
            <td className="top-right-td">
              Delivery Note Date
              <input
                type="text"
                name="delivery-note-date"
                id="delivery-note-date"
                value={invoiceState.delivery_note_date}
                placeholder="Enter"
                onChange={(e) =>
                  handleChange("delivery_note_date", e.target.value)
                }
              />
            </td>
          </tr>
          <tr>
            <td className="top-right-td">
              Dispatched through
              <input
                type="text"
                name="dispatched-through"
                id="dispatched-through"
                value={invoiceState.dispatched_through}
                placeholder="Enter"
                onChange={(e) =>
                  handleChange("dispatched_through", e.target.value)
                }
              />
            </td>
            <td className="top-right-td">
              Destination
              <input
                type="text"
                name="destination"
                id="destination"
                value={invoiceState.destination}
                placeholder="Enter"
                onChange={(e) => handleChange("destination", e.target.value)}
              />
            </td>
          </tr>

          <tr>
            <td>
            <select
                name="customer-shipping-company-name"
                id="customer-shipping-company-name"
                value={invoiceState.customer_shipping_company_name}
                onChange={(e) =>
                  handleChange("customer_shipping_company_name", e.target.value)
                }
              ><option>Select Company Name</option>
              {customer_name_list?.map((option) => (
                <option key={option.text} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
              <br />
              <textarea
                value={invoiceState.customer_shipping_address}
                onChange={(e) =>
                  handleChange("customer_shipping_address", e.target.value)
                }
                name="customer-shipping-address"
                id="customer-shipping-address"
                placeholder="Enter Address"
              ></textarea>
              <br />
              GST:{" "}
              <select
                name="gst"
                id="gst"
                value={invoiceState.customer_shipping_gstin}
                onChange={(e) =>
                  handleChange("customer_shipping_gstin", e.target.value)
                }
              >
                {gst_list?.map((option) => (
                  <option key={option.text} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
              <br />
              State Code:{" "}
              <select
                name="state"
                id="state"
                value={invoiceState.customer_shipping_state_name}
                onChange={(e) =>
                  handleChange("customer_shipping_state_name", e.target.value)
                }
              >
                {state_list?.map((option) => (
                  <option key={option.text} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </td>
            <td colSpan={2} className="terms-of-delivery">
              Terms of Delivery
              <br />
              <textarea
                value={invoiceState.terms_of_delivery}
                onChange={(e) =>
                  handleChange("terms_of_delivery", e.target.value)
                }
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
