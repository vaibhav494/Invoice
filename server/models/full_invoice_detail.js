const mongoose = require('mongoose');

const Full_invoice_detail = new mongoose.Schema({
    Seller_Name: {
        type: String,
        required: true,
        unique:true
    },
    Buyer_Name: {
        type: String,
        required: true,
        unique:true
    },
    Invoice_Number: {
        type: String,
        required: true,
        unique:true
    },
    Invoice_Date: {
        type: String,
        required: true,
        unique:true
    },
    Total_Amount: {
        type: String,
        required: true,
        unique:true
    },

});
const Invoice_detail = mongoose.model('Invoice_detail', Full_invoice_detail);

module.exports=Invoice_detail
