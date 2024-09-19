const mongoose = require('mongoose');

const AdminUserModel = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    }
});

const AdminUser = mongoose.model('AdminUser', AdminUserModel);

module.exports = AdminUser;
