const mongoose = require('mongoose');
const ReactFormDataSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    address: { type: Array, required: true },
    gst: { type: String, required: true, unique: true },
    state: { type: String, required: true },
    stateCode: { type: String, required: true },
    userId: { type: String, required: true }
});

const Supplier = mongoose.model('Supplier', ReactFormDataSchema);

module.exports = Supplier;
