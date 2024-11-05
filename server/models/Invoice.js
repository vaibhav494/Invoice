const mongoose = require('mongoose');

const NewInvoice = new mongoose.Schema({
    supplier: {type: Object},
    customer_shipping: {type: Object},
    customer_billing: {type: Object},
    productLines: {type: Array},
    invoiceNumber: {type: String},
    invoiceDate: {type: String},
    buyerOrderNo: {type: String},
    buyerOrderDate: {type: String},
    dispatchDocNo: {type: String},
    dispatchedThrough: {type: String},
    destination: {type: String},
    taxLines: {type: Array},
    userId: {type: String},
    status: {type: String},
    profit:{type:String}
});
// Matching combination of userId and invoiceNumber unique combination 
NewInvoice.index({ invoiceNumber: 1, userId: 1 }, { unique: true });

const Invoice = mongoose.model('Invoice', NewInvoice);

module.exports = Invoice;
