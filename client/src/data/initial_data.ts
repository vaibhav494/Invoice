import { product_line_1, invoice } from './types'

export const initial_product_line: product_line_1 = {
  particulars : "",
  HSN_SAC : "",
  quantity: "0",
  rate: "0",
  per : "0"
}

export const initial_invoice: invoice = {
  buyer_company_name : "",
  buyer_billing_address : "",
  buyer_shipping_address : "",
  buyer_gstin_label : "GSTIN/UIN",
  buyer_gstin : "",
  buyer_state_name_label : "State Name",
  buyer_state_name : "",
  

  seller_consignee_label : "Consignee (Ship to)",
  seller_shipping_company_name : "",
  seller_shipping_address : "",
  seller_shipping_gstin_label : "GSTIN/UIN",
  seller_shipping_gstin : "",
  seller_shipping_state_name_label : "State Name",
  seller_shipping_state_name : "",


  buyer_ship_to_label : "Buyer (Bill to)",
  seller_billing_company_name : "",
  seller_billing_address : "",
  seller_billing_gstin_label : "GSTIN/UIN",
  seller_billing_gstin : "",
  seller_billing_state_name_label : "State Name",
  seller_billing_state_name : "",


  invoice_number_label : "Invoice Number",
  invoice_number : "",

  invoice_date_label : "Invoice Date",
  invoice_date : "",
  
  delivery_note_label : "Delivery Note",
  delivery_note : "",
  
  mode_terms_of_payment_label : "Mode/Terms of Payment",
  mode_terms_of_payment : "",
  
  reference_number_and_date_label : "Reference Number and Date",
  reference_number_and_date : "",
  
  other_references_label : "Other Reference",
  other_references : "",
  
  buyers_order_number_label : "Buyer's Order Number",
  buyers_order_number : "",
  
  dated_label : "Dated",
  dated : "",
  
  dispatch_doc_number_label : "Dispatch Doc Number",
  dispatch_doc_number : "",
  
  delivery_note_date_label : "Delivery Note Date",
  delivery_note_date : "",
  
  dispatched_event_label : "Dispatch event",
  dispatched_event : "",
  
  destination_label : "Destination",
  destination : "",

  terms_of_delivery_label : "Terms of Delivery",
  terms_of_delivery : "",


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
  IGST_label : "IGST",
  CGST_label : "CGST",
  SGST_label : "SGST",

  total_label: "TOTAL",
  currency: "₹",
  amount_chargeable_in_words_label : "Amount Chargeable in Words",

}