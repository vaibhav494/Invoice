// models/full_invoice_detail.js
const mongoose = require('mongoose');

const invoiceDetailSchema = new mongoose.Schema({
  Supplier_Name: { type: String, unique:false },
  Customer_Name: { type: String, unique:false },
  Invoice_Number: { type: String,  unique:false },
  Invoice_Date: { type: String, unique:false },
  Total_Amount: { type: Number, unique:false },
  // Ensure there's no unique: true for Seller_Name
  // All_invoice_detail: {type: Object, required:true},
  // All_Product_detail: {type: Object, required:true},
  // All_Tax_detail: {type:Object, required:true}

});

const Invoice_detail = mongoose.model('Invoice_detail', invoiceDetailSchema);

module.exports = Invoice_detail;
