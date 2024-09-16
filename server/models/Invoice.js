const mongoose = require('mongoose');

const NewInvoice = new mongoose.Schema({
    supplier: {
        type: Object,
    },
    customer: {
        type: Object,
    },
    productLines: {
        type: Array,
    },
    invoiceNumber: {
        type: String,
    },
    invoiceDate: {
        type: String,
    },
    buyerOrderNo: {
        type: String,
    },
    buyerOrderDate: {
        type: String,
    },
    dispatchDocNo: {
        type: String,
    },
    dispatchedThrough: {
        type: String,
    },
    destination: {
        type: String,
    },
    taxLines: {
        type: Array,
    },
    userId:{
        type: String
    }
    
});

const Invoice = mongoose.model('Invoice', NewInvoice);

module.exports = Invoice;
