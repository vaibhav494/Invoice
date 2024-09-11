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

const User = mongoose.model('Users', ReactFormDataSchema);

module.exports = User;
