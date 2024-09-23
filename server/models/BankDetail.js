const mongoose = require('mongoose');

const BankDetailModel = new mongoose.Schema({
    name: { type: String, required: true },
    Ac_No: { type: String, required: true, unique: true },
    branch_ifsc: { type: String, required: true },
    userId: { type: String, required: true }
});

const BankDetail = mongoose.model('BankDetail', BankDetailModel);

module.exports = BankDetail;
