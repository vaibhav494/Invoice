const mongoose = require('mongoose');

const Full_invoice_detail = new mongoose.Schema({
    Seller_Name: {
        type: String,
        required: true,
    },
    Buyer_Name: {
        type: String,
        required: true,
    },
    Invoice_Number: {
        type: String,
        required: true,
    },
    Invoice_Date: {
        type: String,
        required: true,
    },
    Total_Amount: {
        type: String,
        required: true,
    },

});
const Invoice_detail = mongoose.model('Invoice_detail', Full_invoice_detail);

module.exports=Invoice_detail
