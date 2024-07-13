import { CSSProperties } from 'react'
import { z, TypeOf } from 'zod'

export interface product_line_1 {
    particulars : string,
    HSN_SAC : string,
    quantity: string,
    rate: string,
    per : string
}
// export interface product_line_2 { 
//     HSN_SAC : string,
//     taxable_Value : string,
//     rate : string,
//     amount : string,
//     total_tax_amount : string
// }

export const t_product_line_1 = z.object({
    particulars : z.string(),
    HSN_SAC : z.string(),
    quantity: z.string(),
    rate: z.string(),
    per : z.string(),
})

// export const t_product_line_2 = z.object({
//     HSN_SAC : z.string(),
//     taxable_Value : z.string(),
//     rate : z.string(),
//     amount : z.string(),
//     total_tax_amount : z.string()

// })

export const t_invoice = z.object({
    buyer_company_name : z.string(),
    buyer_billing_address : z.string(),
    buyer_shipping_address : z.string(),
    buyer_gstin_label : z.string(),
    buyer_gstin : z.string(),
    buyer_state_name_label : z.string(),
    buyer_state_name : z.string(),
    
    seller_consignee_label : z.string(),
    seller_shipping_company_name : z.string(),
    seller_shipping_address : z.string(),
    seller_shipping_gstin_label : z.string(),
    seller_shipping_gstin : z.string(),
    seller_shipping_state_name_label : z.string(),
    seller_shipping_state_name : z.string(),


    buyer_ship_to_label : z.string(),
    seller_billing_company_name : z.string(),
    seller_billing_address : z.string(),
    seller_billing_gstin_label : z.string(),
    seller_billing_gstin : z.string(),
    seller_billing_state_name_label : z.string(),
    seller_billing_state_name : z.string(),


    invoice_number_label : z.string(),
    invoice_number : z.string(),

    invoice_date_label : z.string(),
    invoice_date : z.string(),
    
    delivery_note_label : z.string(),
    delivery_note : z.string(),
    
    mode_terms_of_payment_label : z.string(),
    mode_terms_of_payment : z.string(),
    
    reference_number_and_date_label : z.string(),
    reference_number_and_date : z.string(),
    
    other_references_label : z.string(),
    other_references : z.string(),
    
    buyers_order_number_label : z.string(),
    buyers_order_number : z.string(),
    
    dated_label : z.string(),
    dated : z.string(),
    
    dispatch_doc_number_label : z.string(),
    dispatch_doc_number : z.string(),
    
    delivery_note_date_label : z.string(),
    delivery_note_date : z.string(),
    
    dispatched_event_label : z.string(),
    dispatched_event : z.string(),
    
    destination_label : z.string(),
    destination : z.string(),

    terms_of_delivery_label : z.string(),
    terms_of_delivery : z.string(),


    product_sr_number_label : z.string(),
    product_particulars_label : z.string(),
    product_HSN_SAC_label : z.string(),
    product_quantity_label : z.string(),
    product_rate_label : z.string(),
    product_per_label : z.string(),
    product_amount_label : z.string(),
   
    product_all_detail : z.array(t_product_line_1), 

    product_discount_label : z.string(),
    product_discount : z.string(),
    IGST_label : z.string(),
    CGST_label : z.string(),
    SGST_label : z.string(),

    total_label: z.string(),
    currency: z.string(),
    amount_chargeable_in_words_label : z.string(),
    /*amount_chargeable_in_words : z.string(),*/

    /* now will be adding each product tax in a table */

})

export type invoice = TypeOf<typeof t_invoice>

export interface CSSClasses {
  [key: string]: CSSProperties
}
