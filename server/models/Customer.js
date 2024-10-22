const mongoose = require('mongoose');
    const ReactFormDataSchema = new mongoose.Schema({
        name: { type: String, required: true, unique: true },
        address: { type: Array, required: true },
        gst: { type: String, required: true, unique: true },
        state: { type: String, required: true },
        stateCode: { type: String, required: true },
        userId: { type: String, required: true },
        //Date: { type: Date, required: true }
    });

const Customer = mongoose.model('Customers', ReactFormDataSchema);

module.exports = Customer;
