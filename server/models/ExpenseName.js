const mongoose = require('mongoose');

const ExpenseNameSchema = new mongoose.Schema({
  name: {type: String, required: true},
  userId: {type: String,required: true}
});

// Compound index to ensure uniqueness of name per user
ExpenseNameSchema.index({ name: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('ExpenseName', ExpenseNameSchema);