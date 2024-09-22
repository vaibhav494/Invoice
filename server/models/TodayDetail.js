const mongoose = require('mongoose');

const TodayDetails = new mongoose.Schema({
    TodayRevenue:{
        type:String,
        required:true
    },
    TodayExpense: {
        type: String,
        required:true

    },
    OverdueInvoices: {
        type: String,
        required:true

    },
    UpcomingPayments: {
        type: String,
        required:true

    },
    userId:{
        type:String,
        required:true
    }
});

const TodaysDetail = mongoose.model('TodaysDetail', TodayDetails);

module.exports = TodaysDetail;
