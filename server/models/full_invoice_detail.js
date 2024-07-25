// models/full_invoice_detail.js
const mongoose = require('mongoose');

const invoiceDetailSchema = new mongoose.Schema({
  Buyer_Name: { type: String, required: true, unique:false },
  Seller_Name: { type: String, required: true, unique:false },
  Invoice_Number: { type: String, required: true, unique:false },
  Invoice_Date: { type: Date, required: true, unique:false },
  Total_Amount: { type: Number, required: true, unique:false }
  // Ensure there's no unique: true for Seller_Name
});

const Invoice_detail = mongoose.model('Invoice_detail', invoiceDetailSchema);

module.exports = Invoice_detail;
