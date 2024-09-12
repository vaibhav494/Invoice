const mongoose = require('mongoose');

const ReactFormDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    gst: {
        type: String,
        required: true,
        unique: true
    },
    state: {
        type: String,
        required: true
    },
    stateCode: {
        type: String,
        required: true
    }
});

const Customer = mongoose.model('Customers', ReactFormDataSchema);

module.exports = Customer;
