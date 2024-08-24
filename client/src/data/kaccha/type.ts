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
    supplier_company_name : z.string(),
    supplier_billing_address : z.string(),
    supplier_gstin_label : z.string(),
    supplier_gstin : z.string(),
    supplier_state_name_label : z.string(),
    supplier_state_name : z.string(),
    
    customer_consignee_label : z.string(),
    customer_shipping_company_name : z.string(),
    customer_shipping_address : z.string(),
    customer_shipping_gstin_label : z.string(),
    customer_shipping_gstin : z.string(),
    customer_shipping_state_name_label : z.string(),
    customer_shipping_state_name : z.string(),


    customer_ship_to_label : z.string(),
    customer_billing_company_name : z.string(),
    customer_billing_address : z.string(),
    customer_billing_gstin_label : z.string(),
    customer_billing_gstin : z.string(),
    customer_billing_state_name_label : z.string(),
    customer_billing_state_name : z.string(),


    invoice_number_label : z.string(),
    invoice_number : z.string(),

    // dated_supplier_label : z.string(),
    // dated_supplier : z.string(),

    invoice_date_label : z.string(),
    invoice_date : z.string(),
   
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
