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
// import Download from "./download_pdf";
import { format } from "date-fns/format";
import { useCommonContext } from "../context_common/context";
import axios from "axios";
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
}

const MainInvoice: FC<Props> = ({ data, pdfMode, onChange }) => {
  const [invoiceState, setInvoiceState] = useState<invoice>(
    //use the comment section to remember data when reload
    //data ? { ...data } : { ...initial_invoice }
    initial_invoice
  );
  // will be using this seller_name here

  const { sname } = useCommonContext();

  const seller_name_list = sname.map((seller: any) => ({
    value: seller.id,
    text: seller.name,
  }));

  const [subTotal, setSubTotal] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);

  const date_format = "MMM dd, yyyy";
  const invoiceDate =
    invoiceState.invoice_date !== ""
      ? new Date(invoiceState.invoice_date)
      : new Date();

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

  return (
    <>
      <Document pdfMode={pdfMode}>
        <Page className="invoice-wrapper" pdfMode={pdfMode}>
          {/* {!pdfMode && <Download data={invoiceState} setData={(d) => setInvoiceState(d)} />} */}

          <View className="flex" pdfMode={pdfMode}>
            {/* main start */}

            <View className="w-50" pdfMode={pdfMode}>
              {/* first half starts here */}

              {/* company name start */}
              <Input
                className="fs-20 bold"
                placeholder="Your Company Name"
                value={invoiceState.buyer_company_name}
                onChange={(value) => handleChange("buyer_company_name", value)}
                pdfMode={pdfMode}
              />
              {/* company name end */}

              {/* company address start */}
              <Textarea
                placeholder="Company's Address"
                value={invoiceState.buyer_billing_address}
                onChange={(value) =>
                  handleChange("buyer_billing_address", value)
                }
                pdfMode={pdfMode}
              />
              {/* company address end */}

              <View className="flex mb-5" pdfMode={pdfMode}>
                {/* gst starts */}

                <View className="w-40" pdfMode={pdfMode}>
                  {/* gst label start */}
                  <Input
                    editable={false}
                    className="bold"
                    value={invoiceState.buyer_gstin_label}
                    // onChange={(value) => handleChange("buyer_gstin_label", value)}
                    pdfMode={pdfMode}
                  />
                </View>
                {/* gst label end */}

                <View className="w-60" pdfMode={pdfMode}>
                  {/* gst select start */}
                  <Select
                    options={state_list}
                    value={invoiceState.buyer_gstin}
                    onChange={(value) => handleChange("buyer_gstin", value)}
                    pdfMode={pdfMode}
                  />
                </View>
                {/* gst select end */}
              </View>
              {/* gst end */}

              {/* state starts */}
              <View className="flex mb-5" pdfMode={pdfMode}>
                <View className="w-40" pdfMode={pdfMode}>
                  <Input
                    editable={false}
                    className="bold"
                    value={invoiceState.buyer_state_name_label}
                    // onChange={(value) =>
                    //   handleChange("buyer_state_name_label", value)
                    // }
                    pdfMode={pdfMode}
                  />
                </View>

                <View className="w-60" pdfMode={pdfMode}>
                  <Select
                    options={state_list}
                    value={invoiceState.buyer_state_name}
                    onChange={(value) =>
                      handleChange("buyer_state_name", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
              </View>

              <hr />

              {/*seller shipping starts here */}
              <Input
                editable={false}
                className="bold"
                value={invoiceState.seller_consignee_label}
                onChange={(value) =>
                  handleChange("seller_consignee_label", value)
                }
                pdfMode={pdfMode}
              />
              <Select
                className="fs-20 bold"
                options={seller_name_list}
                placeholder="Seller Company Name"
                value={invoiceState.seller_billing_company_name}
                onChange={(value) =>
                  handleChange("seller_billing_company_name", value)
                }
                pdfMode={pdfMode}
              />
              {/* company name end */}

              {/* company address start */}
              <Textarea
                placeholder="Billing Address"
                value={invoiceState.seller_billing_address}
                onChange={(value) =>
                  handleChange("seller_billing_address", value)
                }
                pdfMode={pdfMode}
              />
              {/* company address end */}

              <View className="flex mb-5" pdfMode={pdfMode}>
                {/* gst starts */}

                <View className="w-40" pdfMode={pdfMode}>
                  {/* gst label start */}
                  <Input
                    editable={false}
                    className="bold"
                    value={invoiceState.seller_billing_gstin_label}
                    onChange={(value) =>
                      handleChange("seller_billing_gstin_label", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
                {/* gst label end */}

                <View className="w-60" pdfMode={pdfMode}>
                  {/* gst select start */}
                  <Select
                    options={gst_list}
                    value={invoiceState.seller_billing_gstin}
                    onChange={(value) =>
                      handleChange("seller_billing_gstin", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
                {/* gst select end */}
              </View>
              {/* gst end */}

              {/* state starts */}
              <View className="flex mb-5" pdfMode={pdfMode}>
                <View className="w-40" pdfMode={pdfMode}>
                  <Input
                    editable={false}
                    className="bold"
                    value={invoiceState.seller_billing_state_name_label}
                    onChange={(value) =>
                      handleChange("seller_billing_state_name_label", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>

                <View className="w-60" pdfMode={pdfMode}>
                  <Select
                    options={state_list}
                    value={invoiceState.seller_billing_state_name}
                    onChange={(value) =>
                      handleChange("seller_billing_state_name", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
              </View>

              {/* seller billing starts */}
              <hr />

              {/*seller starts here */}
              <Input
                editable={false}
                className="bold"
                value={invoiceState.buyer_ship_to_label}
                onChange={(value) => handleChange("buyer_ship_to_label", value)}
                pdfMode={pdfMode}
              />
              <Select
                className="fs-20 bold"
                options={seller_name_list}
                placeholder="Seller Company Name"
                value={invoiceState.seller_shipping_company_name}
                onChange={(value) =>
                  handleChange("seller_shipping_company_name", value)
                }
                pdfMode={pdfMode}
              />
              {/* company name end */}

              {/* company address start */}
              <Textarea
                placeholder="Shipping Address"
                value={invoiceState.seller_shipping_address}
                onChange={(value) =>
                  handleChange("seller_shipping_address", value)
                }
                pdfMode={pdfMode}
              />
              {/* company address end */}

              <View className="flex mb-5" pdfMode={pdfMode}>
                {/* gst starts */}

                <View className="w-40" pdfMode={pdfMode}>
                  {/* gst label start */}
                  <Input
                    editable={false}
                    className="bold"
                    value={invoiceState.seller_shipping_gstin_label}
                    onChange={(value) =>
                      handleChange("seller_shipping_gstin_label", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
                {/* gst label end */}

                <View className="w-60" pdfMode={pdfMode}>
                  {/* gst select start */}
                  <Select
                    options={gst_list}
                    value={invoiceState.seller_shipping_gstin}
                    onChange={(value) =>
                      handleChange("seller_shipping_gstin", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
                {/* gst select end */}
              </View>
              {/* gst end */}

              {/* state starts */}
              <View className="flex mb-5" pdfMode={pdfMode}>
                <View className="w-40" pdfMode={pdfMode}>
                  <Input
                    editable={false}
                    className="bold"
                    value={invoiceState.seller_shipping_state_name_label}
                    onChange={(value) =>
                      handleChange("seller_shipping_state_name_label", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>

                <View className="w-60" pdfMode={pdfMode}>
                  <Select
                    options={state_list}
                    value={invoiceState.seller_shipping_state_name}
                    onChange={(value) =>
                      handleChange("seller_shipping_state_name", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
              </View>
            </View>
            {/* left half ends here*/}

            {/* right half starts here */}
            <View className="w-50" pdfMode={pdfMode}>
            {/* <Input
            editable={true}
              className="fs-45 right bold"
              placeholder="Invoice"
              value={invoiceState.buyer_company_name}
              onChange={(value) => handleChange("buyer_company_name", value)}
              pdfMode={pdfMode}
            /> */}


            <View className="flex mb-5" pdfMode={pdfMode}>
                <View className="w-50" pdfMode={pdfMode}>
                  {/* invoice number label start */}
                  <Input
                    editable={false}
                    className="bold"
                    value={invoiceState.invoice_number_label}
                    onChange={(value) =>
                      handleChange("invoice_number_label", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
                <View className="w-50" pdfMode={pdfMode}>
                  <Input
                    editable={false}
                    className="bold"
                    value={invoiceState.dated_seller_label}
                    onChange={(value) =>
                      handleChange("dated_seller_label", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
              </View>




              <View className="flex mb-5" pdfMode={pdfMode}>
                <View className="w-50" pdfMode={pdfMode}>
                  {/* invoice number label start */}
                  <Input
                    editable={true}
                    value={invoiceState.invoice_number}
                    onChange={(value) =>
                      handleChange("invoice_number", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
                
                <View className="w-50" pdfMode={pdfMode}>
                  <Input
                    editable={true}
                    value={invoiceState.dated_seller}
                    onChange={(value) =>
                      handleChange("dated_seller", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
              </View>
              <hr />
              <View className="flex mb-5" pdfMode={pdfMode}>
                <View className="w-50" pdfMode={pdfMode}>
                  <Input
                    editable={false}
                    className="bold"
                    value={invoiceState.delivery_note_label}
                    onChange={(value) =>
                      handleChange("delivery_note_label", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
                <View className="w-50" pdfMode={pdfMode}>
                  <Input
                    editable={false}
                    className="bold"
                    value={invoiceState.mode_terms_of_payment_label}
                    onChange={(value) =>
                      handleChange("mode_terms_of_payment_label", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
              </View>




              <View className="flex mb-5" pdfMode={pdfMode}>
                <View className="w-50" pdfMode={pdfMode}>
                  {/* invoice number label start */}
                  <Input
                    editable={true}
                    value={invoiceState.delivery_note}
                    onChange={(value) =>
                      handleChange("delivery_note", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
                
                <View className="w-50" pdfMode={pdfMode}>
                  <Input
                    editable={true}
                    value={invoiceState.mode_terms_of_payment}
                    onChange={(value) =>
                      handleChange("mode_terms_of_payment", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
              </View>
              <hr />
              <View className="flex mb-5" pdfMode={pdfMode}>
                <View className="w-50" pdfMode={pdfMode}>
                  <Input
                    editable={false}
                    className="bold"
                    value={invoiceState.reference_number_and_date_label}
                    onChange={(value) =>
                      handleChange("reference_number_and_date_label", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
                <View className="w-50" pdfMode={pdfMode}>
                  <Input
                    editable={false}
                    className="bold"
                    value={invoiceState.other_references_label}
                    onChange={(value) =>
                      handleChange("other_references_label", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
              </View>




              <View className="flex mb-5" pdfMode={pdfMode}>
                <View className="w-50" pdfMode={pdfMode}>
                 
                  <Input
                    editable={true}
                    value={invoiceState.reference_number_and_date}
                    onChange={(value) =>
                      handleChange("reference_number_and_date", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
                
                <View className="w-50" pdfMode={pdfMode}>
                  <Input
                    editable={true}
                    value={invoiceState.other_references}
                    onChange={(value) =>
                      handleChange("other_references", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
              </View>
              <hr />
              <View className="flex mb-5" pdfMode={pdfMode}>
                <View className="w-50" pdfMode={pdfMode}>
                  <Input
                    editable={false}
                    className="bold"
                    value={invoiceState.buyers_order_number_label}
                    onChange={(value) =>
                      handleChange("buyers_order_number_label", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
                <View className="w-50" pdfMode={pdfMode}>
                  <Input
                    editable={false}
                    className="bold"
                    value={invoiceState.dated_buyer_label}
                    onChange={(value) =>
                      handleChange("dated_buyer_label", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
              </View>




              <View className="flex mb-5" pdfMode={pdfMode}>
                <View className="w-50" pdfMode={pdfMode}>
                  {/* invoice number label start */}
                  <Input
                    editable={true}
                    value={invoiceState.buyers_order_number}
                    onChange={(value) =>
                      handleChange("buyers_order_number", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
                
                <View className="w-50" pdfMode={pdfMode}>
                  <Input
                    editable={true}
                    value={invoiceState.dated_buyer}
                    onChange={(value) =>
                      handleChange("dated_buyer", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
              </View>
              <hr />




              <View className="flex mb-5" pdfMode={pdfMode}>
                <View className="w-50" pdfMode={pdfMode}>
                  <Input
                    editable={false}
                    className="bold"
                    value={invoiceState.dispatch_doc_number_label}
                    onChange={(value) =>
                      handleChange("buyers_order_number_label", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
                <View className="w-50" pdfMode={pdfMode}>
                  <Input
                    editable={false}
                    className="bold"
                    value={invoiceState.delivery_note_date_label}
                    onChange={(value) =>
                      handleChange("delivery_note_date_label", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
              </View>




              <View className="flex mb-5" pdfMode={pdfMode}>
                <View className="w-50" pdfMode={pdfMode}>
                  {/* invoice number label start */}
                  <Input
                    editable={true}
                    value={invoiceState.dispatch_doc_number}
                    onChange={(value) =>
                      handleChange("dispatch_doc_number", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
                
                <View className="w-50" pdfMode={pdfMode}>
                  <Input
                    editable={true}
                    value={invoiceState.delivery_note_date}
                    onChange={(value) =>
                      handleChange("delivery_note_date", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
              </View>
              <hr />
              <View className="flex mb-5" pdfMode={pdfMode}>
                <View className="w-50" pdfMode={pdfMode}>
                  <Input
                    editable={false}
                    className="bold"
                    value={invoiceState.dispatched_through_label}
                    onChange={(value) =>
                      handleChange("dispatched_through_label", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
                <View className="w-50" pdfMode={pdfMode}>
                  <Input
                    editable={false}
                    className="bold"
                    value={invoiceState.destination_label}
                    onChange={(value) =>
                      handleChange("destination_label", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
              </View>




              <View className="flex mb-5" pdfMode={pdfMode}>
                <View className="w-50" pdfMode={pdfMode}>
                  <Input
                    editable={true}
                    value={invoiceState.dispatched_through}
                    onChange={(value) =>
                      handleChange("dispatched_through", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
                
                <View className="w-50" pdfMode={pdfMode}>
                  <Input
                    editable={true}
                    value={invoiceState.destination}
                    onChange={(value) =>
                      handleChange("destination", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
              </View>
              <hr />


              <View>
                <Input
                  editable={false}
                  className="bold"
                  value={invoiceState.terms_of_delivery_label}
                  onChange={(value) =>
                    handleChange("terms_of_delivery_label", value)
                  }
                  pdfMode={pdfMode}
                />
                <Textarea 
                  placeholder="Company's Address"
                  value={invoiceState.terms_of_delivery}
                  onChange={(value) =>
                    handleChange("terms_of_delivery", value)
                  }
                  pdfMode={pdfMode}
                />
              </View>



          </View>
          </View>
          {/* main ends here */}

          {/* product row heading */}
          <View className="mt-30 bg-dark flex" pdfMode={pdfMode}>
            <View className="w-48 p-4-8" pdfMode={pdfMode}>
              <Input
                editable={false}
                className="white bold"
                value={invoiceState.product_particulars_label}
                onChange={(value) =>
                  handleChange("product_particulars_label", value)
                }
                pdfMode={pdfMode}
              />
            </View>
            <View className="w-17 p-4-8" pdfMode={pdfMode}>
              <Input
                editable={false}
                className="white bold right"
                value={invoiceState.product_HSN_SAC_label}
                onChange={(value) =>
                  handleChange("product_HSN_SAC_label", value)
                }
                pdfMode={pdfMode}
              />
            </View>
            <View className="w-17 p-4-8" pdfMode={pdfMode}>
              <Input
                editable={false}
                className="white bold right"
                value={invoiceState.product_quantity_label}
                onChange={(value) =>
                  handleChange("product_quantity_label", value)
                }
                pdfMode={pdfMode}
              />
            </View>
            <View className="w-17 p-4-8" pdfMode={pdfMode}>
              <Input
                editable={false}
                className="white bold right"
                value={invoiceState.product_rate_label}
                onChange={(value) => handleChange("product_rate_label", value)}
                pdfMode={pdfMode}
              />
            </View>
            <View className="w-17 p-4-8" pdfMode={pdfMode}>
              <Input
                editable={false}
                className="white bold right"
                value={invoiceState.product_per_label}
                onChange={(value) => handleChange("product_per_label", value)}
                pdfMode={pdfMode}
              />
            </View>

            <View className="w-18 p-4-8" pdfMode={pdfMode}>
              <Input
                editable={false}
                className="white bold right"
                value={invoiceState.product_amount_label}
                onChange={(value) =>
                  handleChange("product_amount_label", value)
                }
                pdfMode={pdfMode}
              />
            </View>
          </View>
          {/* product row heading end*/}

          {/* product row detail */}
          {invoiceState.product_all_detail.map((Product_line_1, i) => {
            return pdfMode && Product_line_1.particulars === "" ? (
              <Text key={i}></Text>
            ) : (
              <View key={i} className="row flex" pdfMode={pdfMode}>
                <View className="w-48 p-4-8 pb-10" pdfMode={pdfMode}>
                  <Input
                    editable={true}
                    className="dark"
                    placeholder="Enter item name/description"
                    value={Product_line_1.particulars}
                    onChange={(value) =>
                      handleProductLineChange(i, "particulars", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
                <View className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
                  <Input
                    editable={true}
                    className="dark right"
                    value={Product_line_1.HSN_SAC}
                    onChange={(value) =>
                      handleProductLineChange(i, "HSN_SAC", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
                <View className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
                  <Input
                    editable={true}
                    className="dark right"
                    value={Product_line_1.quantity}
                    onChange={(value) =>
                      handleProductLineChange(i, "quantity", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
                <View className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
                  <Input
                    editable={true}
                    className="dark right"
                    value={Product_line_1.rate}
                    onChange={(value) =>
                      handleProductLineChange(i, "rate", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
                <View className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
                  <Input
                    editable={true}
                    className="dark right"
                    value={Product_line_1.per}
                    onChange={(value) =>
                      handleProductLineChange(i, "per", value)
                    }
                    pdfMode={pdfMode}
                  />
                </View>
                <View className="w-18 p-4-8 pb-10" pdfMode={pdfMode}>
                  <Text className="dark right" pdfMode={pdfMode}>
                    {calculateAmount(
                      Product_line_1.quantity,
                      Product_line_1.rate
                    )}
                  </Text>
                </View>
                {!pdfMode && (
                  <button
                    className="link row__remove"
                    aria-label="Remove Row"
                    title="Remove Row"
                    onClick={() => handleRemove(i)}
                  >
                    <span className="icon icon-remove bg-red"></span>
                  </button>
                )}
              </View>
            );
          })}
          {/* product row heading detail end*/}
          <View className="flex" pdfMode={pdfMode}>
            <View className="w-50 mt-10" pdfMode={pdfMode}>
              {!pdfMode && (
                <button className="link" onClick={handleAdd}>
                  <span className="icon icon-add bg-green mr-10"></span>
                  Add Line Item
                </button>
              )}
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
};

export default MainInvoice;
