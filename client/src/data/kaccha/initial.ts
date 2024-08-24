import { product_line_1, invoice } from './type'

export const initial_product_line: product_line_1 = {
  particulars : "",
  HSN_SAC : "",
  quantity: "0",
  rate: "0",
  per : "0"
}

export const initial_invoice: invoice = {
  supplier_company_name : "",
  supplier_billing_address : "",
  supplier_gstin_label : "GSTIN/UIN",
  supplier_gstin : "",
  supplier_state_name_label : "State Name",
  supplier_state_name : "",
  

  customer_consignee_label : "Consignee (Ship to)",
  customer_shipping_company_name : "",
  customer_shipping_address : "",
  customer_shipping_gstin_label : "GSTIN/UIN",
  customer_shipping_gstin : "",
  customer_shipping_state_name_label : "State Name",
  customer_shipping_state_name : "",


  customer_ship_to_label : "Buyer (Bill to)",
  customer_billing_company_name : "",
  customer_billing_address : "",
  customer_billing_gstin_label : "GSTIN/UIN",
  customer_billing_gstin : "",
  customer_billing_state_name_label : "State Name",
  customer_billing_state_name : "",


  invoice_number_label : "Invoice Number",
  invoice_number : '',

  // dated_seller_label : "Dated",
  // dated_seller : "",

  invoice_date_label : "Dated",
  invoice_date : "",
 

  product_sr_number_label : "Sr No.",
  product_particulars_label : "Particulars",
  product_HSN_SAC_label : "HSN/SAC",
  product_quantity_label : "Quantity",
  product_rate_label : "Rate",
  product_per_label : "%",
  product_amount_label : "Amount",


  product_all_detail :[
    {
      particulars : "",
      HSN_SAC : "",
      quantity: "0",
      rate: "0",
      per : "0"
    },
    {...initial_product_line},
    {...initial_product_line},
  ], 

  product_discount_label : "Discount", 
  product_discount : "",
  

  total_label: "SUB_TOTAL:",
  currency: "₹",
  amount_chargeable_in_words_label : "Amount Chargeable in Words:",

}