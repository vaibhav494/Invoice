console.log("index js started");

const express = require("express");
const dotenv = require('dotenv');
dotenv.config();

console.log('CLERK_WEBHOOK_SECRET_KEY:', process.env.CLERK_WEBHOOK_SECRET_KEY ? 'Set' : 'Not set');
console.log(process.env.CLERK_WEBHOOK_SECRET_KEY)
const mongoose = require("mongoose");
const { Webhook } = require('svix');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();

const Customer = require("./models/Customer");
const Invoice_detail = require("./models/full_invoice_detail");
const User = require("./models/UserModel");
const Invoice = require("./models/Invoice");
const Expense = require("./models/Expense"); // Make sure to create this model
const ExpenseName = require("./models/ExpenseName"); // Make sure to create this model
const BankDetail = require("./models/BankDetail");
const Supplier = require("./models/Supplier");

app.use(express.json());

app.use(cors());
console.log("before mongo conn");
mongoose.connect("mongodb://localhost:27017/invoice");

app.get('/',(req, res) => {
  res.send('hello world');
})
app.post(
  '/api/webhooks',
  bodyParser.raw({ type: 'application/json' }), // Parse raw payload as a buffer
  async function (req, res) {
    try {
      console.log('hoooooooo')
      
      const payloadBuffer = req.body; // This is a Buffer because of bodyParser.raw()
      const payloadString = JSON.stringify(payloadBuffer) // Convert Buffer to string for verification
      const svixHeaders = req.headers;

      const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
      console.log(wh)
      console.log(svixHeaders)
      console.log(payloadString)
      const evt = wh.verify(payloadString, svixHeaders); // Verifies the incoming webhook payload
      console.log(svixHeaders)
      const { id, ...attributes } = evt.data;

      // Handle the webhook event
      const eventType = evt.type;
      if (eventType === 'user.created') {
        console.log(`User ${id} was created`);
        console.log(attributes);

        const firstName = attributes.first_name;
        const lastName = attributes.last_name;

        const user = new User({
          clerkUserId: id,
          firstName: firstName,
          lastName: lastName,
        });

        await user.save();
        console.log('User saved to database');
      }
      if (eventType === 'user.deleted') {
        console.log(`User ${id} deleted`);
        User.deleteOne( { clerkUserId: id } )
      }

      res.status(200).json({
        success: true,
        message: 'Webhook received and verified',
      });
    } catch (err) {
      console.error("Webhook verification failed:", err.message); // Detailed error message
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
);

app.post("/addinvoicedatabase", async (req, res) => {
  const newInvoice = new Invoice({
    supplier: req.body.Supplier,
    customer_billing: req.body.CustomerBilling,
    customer_shipping: req.body.CustomerShipping,
    productLines: req.body.ProductLine,
    invoiceNumber: req.body.InvoiceNumber,
    invoiceDate: req.body.InvoiceDate,
    buyerOrderNo: req.body.BuyerOrderNo,
    buyerOrderDate: req.body.BuyerOrderDate,
    dispatchDocNo: req.body.DispatchDocNo,
    dispatchedThrough: req.body.DispatchedThrough,
    destination: req.body.Destination,
    taxLines: req.body.TaxLines,
    userId:req.body.UserId,
    status:req.body.Status
  });
  await newInvoice.save();
});

app.post("/users", async (req, res) => {
  const { clerkId, firstName, lastName, email } = req.body;

  const newUser = new User({ clerkId, firstName, lastName, email });
  await newUser.save();
  res.status(201).send("User created");
});

app.get("/get_seller_detail", (req, res) => {
  const { name, company } = req.query;

  if (!name || !company) {
    return res.status(400).json({ error: "Name and company query parameters are required" });
  }

  const query = { name: name };
  if (company === 'supplier') {
    Supplier.findOne(query)
    .then((supplier_detail) => {
      if (!supplier_detail) {
        return res.status(404).json({ error: "Seller not found" });
      }
      res.json(supplier_detail);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
  } else if (company === 'customer_billing' || company === 'customer_shipping'){
    Customer.findOne(query)
    .then((customer_detail) => {
      if (!customer_detail) {
        return res.status(404).json({ error: "Seller not found" });
      }
      res.json(customer_detail);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
  } else {
    return res.status(400).json({ error: "Invalid company type" });
  }

  
});


app.post("/");

// app.post("/insert_full_invoice_detail", async (req, res) => {
//   try {
//     const sn = req.body.Supplier_name;
//     const cn = req.body.Customer_name;
//     const In = req.body.Invoice_number;
//     const id = req.body.Invoice_date;
//     const ta = req.body.Total_amount;

//     const formData1 = await Invoice_detail.create({
//       Supplier_Name: sn,
//       Customer_Name: cn,
//       Invoice_Number: In,
//       Invoice_Date: id,
//       Total_Amount: ta,
//       // All_invoice_detail: req.body.all_data,
//       // All_Product_detail: req.body.product_detail,
//       // All_Tax_detail: req.body.tax_detail
//     });
//     await formData1.save();
//     res.send("invoice data added..");
//   } catch (err) {
//     console.log(err);
//   }
// });

app.get("/insert_full_invoice_detail", async (req, res) => {
  const userId = req.query.userId; // Get userId from query parameters
  try {
    const invoices = await Invoice.find({ userId }); // Filter invoices by userId
    const formattedInvoices = invoices.map(invoice => {
      const totalAmount = invoice.productLines && invoice.productLines.length > 0
        ? invoice.productLines.reduce((sum, product) => sum + (product.amount || 0), 0)
        : 0;
      return {
        sellerName: invoice.supplier?.name || '',
        customerName: invoice.customer_billing?.name,
        invoiceNumber: invoice.invoiceNumber || '',
        invoiceDate: invoice.invoiceDate || '',
        totalAmount: totalAmount,
        status: invoice.status, 
        userId: invoice.userId
      };
    });
    res.json(formattedInvoices);
  } catch (err) {
    console.error("Error fetching invoices:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/insert", (req, res) => {
  Customer.find({}, "name")
    .then((customer_name) => res.json(customer_name))
    .catch((err) => res.json(err));
});

app.get("/get_invoice_number", async (req, res) => {
  try {
    const result = await Invoice_detail.aggregate([
      {
        $project: {
          invoiceNumberAsInt: {
            $toInt: "$All_invoice_detail.invoice_number",
          },
          originalInvoiceNumber: "$All_invoice_detail.invoice_number",
        },
      },
      {
        $sort: { invoiceNumberAsInt: -1 },
      },
      {
        $limit: 1,
      },
    ]);

    // Extract the highest invoice number from the result
    const maxInvoiceNumber =
      result.length > 0 ? result[0].originalInvoiceNumber : "0";

    // Send the invoice number as the response
    res.status(200).json({ maxInvoiceNumber });
  } catch (err) {
    console.error("Error retrieving invoice number:", err); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Error retrieving invoice number", error: err.message });
  }
});

app.post("/insertCustomer", async (req, res) => {
  try {
    const formData = await Customer.create({
      name: req.body.customer_name,
      address: req.body.customer_address,
      gst: req.body.customer_gst,
      state: req.body.customer_state,
      stateCode: req.body.customer_state_code,
      userId: req.body.userId
    });

    await formData.save();
    res.send("inserted data..");
  } catch (err) {
    console.log(err);
  }
});
app.post("/insertSupplier", async (req, res) => {
  try {
    const formData = await Supplier.create({
      name: req.body.supplier_name,
      address: req.body.supplier_address,
      gst: req.body.supplier_gst,
      state: req.body.supplier_state,
      stateCode: req.body.supplier_state_code,
      userId: req.body.userId
    });

    await formData.save();
    res.send("inserted data..");
  } catch (err) {
    console.log(err);
  }
});

app.put("/update_invoice_status", async (req, res) => {
  try {
    const { invoiceNumber, newStatus, userId } = req.body;

    const updatedInvoice = await Invoice.findOneAndUpdate(
      { invoiceNumber: invoiceNumber, userId: userId },
      { $set: { status: newStatus } },
      { new: true }
    );

    if (!updatedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json({ message: "Invoice status updated successfully", invoice: updatedInvoice });
  } catch (error) {
    console.error("Error updating invoice status:", error);
    res.status(500).json({ message: "Error updating invoice status", error: error.message });
  }
});

// GET /api/expenses: Returns all expenses for a specific user
app.get("/api/expenses", async (req, res) => {
  try {
    const userId = req.query.userId; // Assuming userId is passed as a query parameter
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    const expenses = await Expense.find({ userId });
    res.json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Error fetching expenses", error: error.message });
  }
});

// POST /api/expenses: Adds a new expense for a specific user
app.post("/api/expenses", async (req, res) => {
  try {
    const { name, amount, date, userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    const newExpense = new Expense({ name, amount, date, userId });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ message: "Error adding expense", error: error.message });
  }
});

// GET /api/expense-names: Returns all expense names for a specific user
app.get("/api/expense-names", async (req, res) => {
  try {
    const userId = req.query.userId; // Assuming userId is passed as a query parameter
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    const expenseNames = await ExpenseName.find({ userId });
    res.json(expenseNames.map(expenseName => expenseName.name));
  } catch (error) {
    console.error("Error fetching expense names:", error);
    res.status(500).json({ message: "Error fetching expense names", error: error.message });
  }
});

// POST /api/expense-names: Adds a new expense name for a specific user
app.post("/api/expense-names", async (req, res) => {
  try {
    const { name, userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    const newExpenseName = new ExpenseName({ name, userId });
    await newExpenseName.save();
    res.status(201).json(newExpenseName);
  } catch (error) {
    console.error("Error adding expense name:", error);
    res.status(500).json({ message: "Error adding expense name", error: error.message });
  }
});

// GET /api/bank-details: Returns all bank details for a specific user
app.get("/api/bank-details", async (req, res) => {
  try {
    const userId = req.query.userId; // Assuming userId is passed as a query parameter
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    const bankDetails = await BankDetail.find({ userId });
    res.json(bankDetails);
  } catch (error) {
    console.error("Error fetching bank details:", error);
    res.status(500).json({ message: "Error fetching bank details", error: error.message });
  }
});

// POST /api/bank-details: Adds a new bank detail for a specific user
app.post("/api/bank-details", async (req, res) => {
  try {
    const { name, Ac_No, branch_ifsc, userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    const newBankDetail = new BankDetail({ name, Ac_No, branch_ifsc, userId });
    await newBankDetail.save();
    res.status(201).json(newBankDetail);
  } catch (error) {
    console.error("Error adding bank detail:", error);
    res.status(500).json({ message: "Error adding bank detail", error: error.message });
  }
});

app.get('/getCustomer', (req, res) => {
  const userId = req.query.userId;
  
  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  Customer.find({ userId: userId })
    .then((customers) => res.json(customers))
    .catch((err) => res.status(500).json({ error: err.message }));
})
app.get('/getSupplier', (req, res) => {
  const userId = req.query.userId;
  
  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  Supplier.find({ userId: userId })
    .then((supplier) => res.json(supplier))
    .catch((err) => res.status(500).json({ error: err.message }));
})


app.get('/getCustomerName', (req, res) => {
  const userId = req.query.userId;
  
  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  // Find all customers with the given userId and select only the 'name' field
  Customer.find({ userId: userId }, 'name')
    .then((customers) => {
      if (customers.length === 0) {
        return res.status(404).json({ error: "Customers not found" });
      }
      // Return an array of customer names
      const customerNames = customers.map(customer => customer.name);
      res.json(customerNames);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.get('/getSupplierName', (req, res) => {
  const userId = req.query.userId;
  
  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  // Find all suppliers with the given userId and select only the 'name' field
  Supplier.find({ userId: userId }, 'name')
    .then((suppliers) => {
      if (suppliers.length === 0) {
        return res.status(404).json({ error: "Suppliers not found" });
      }
      // Return an array of supplier names
      const supplierNames = suppliers.map(supplier => supplier.name);
      res.json(supplierNames);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
