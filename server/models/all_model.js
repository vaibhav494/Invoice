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
    status: {type: String}
});

const Supplier = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    address: { type: Array, required: true },
    gst: { type: String, required: true, unique: true },
    state: { type: String, required: true },
    stateCode: { type: String, required: true },
    userId: { type: String, required: true }
});

const Customer = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    address: { type: Array, required: true },
    gst: { type: String, required: true, unique: true },
    state: { type: String, required: true },
    stateCode: { type: String, required: true },
    userId: { type: String, required: true },
    Date: { type: Date, required: true }
});

const TodayDetails = new mongoose.Schema({
    TodayRevenue: {type: String, required: true},
    TodayExpense: {type: String, required: true},
    OverdueInvoices: {type: String, required: true},
    UpcomingPayments: {type: String, required: true},
    userId: {type: String, required: true}
});

const userSchema = new mongoose.Schema(
    {
      clerkUserId: { type: String, unique: true, required: true },
      firstName: String,
      lastName: String,
    },{ timestamps: true }
  );

const BankDetailModel = new mongoose.Schema({
    name: { type: String, required: true },
    Ac_No: { type: String, required: true, unique: true },
    branch_ifsc: { type: String, required: true },
    userId: { type: String, required: true }
});

const ExpenseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    userId: { type: String, required: true }
});

const ExpenseNameSchema = new mongoose.Schema({
    name: {type: String, required: true},
    userId: {type: String,required: true}
});
  