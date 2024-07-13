const mongoose = require('mongoose');

const ReactFormDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    address: {
        type: String,
        required: true,
        unique:true
    },
    gst: {
        type: String,
        required: true,
        unique:true
    },
    state: {
        type: String,
        required: true,
        unique:true
    },

});
const User = mongoose.model('Users', ReactFormDataSchema);

module.exports=User
