const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const { Webhook } = require("svix");
const bodyParser = require("body-parser");
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
const TodaysDetail = require("./models/TodayDetail")
const AdminUser = require("./models/AdminUser");
const Product = require('./models/Product');

app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/invoice");


// app.post(
//   "/api/webhooks",
//   bodyParser.raw({ type: "application/json" }), // Parse raw payload as a buffer
//   async function (req, res) {
//     try {
//       const payloadBuffer = req.body; 
//       const payloadString = JSON.stringify(payloadBuffer); 
//       const svixHeaders = req.headers;
//       const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
//       const evt = wh.verify(payloadString, svixHeaders); 
//       const { id, ...attributes } = evt.data;
//       const eventType = evt.type;
//       switch (eventType) {
//         case "user.created":
//           console.log(`User ${id} was created`);
//           console.log(attributes);
//           const { first_name, last_name } = attributes;
//           const newUser = new User({
//             clerkUserId: id,
//             firstName: first_name,
//             lastName: last_name,
//           });
//           await newUser.save();
//           console.log("User saved to database");
//           break;
//         case "user.updated":
//           console.log(`User ${id} was updated`);
//           console.log(attributes);
//           const updatedUser = await User.findOneAndUpdate(
//             { clerkUserId: id },
//             {
//               firstName: attributes.first_name,
//               lastName: attributes.last_name,
//               // Add other fields you want to update
//             },
//             { new: true }
//           );
//           if (updatedUser) {
//             console.log("User updated in database");} else {console.log("User not found in database");}
//           break;
//         case "user.deleted":
//           console.log(`User ${id} deleted`);
//           const deleteResult = await User.deleteOne({ clerkUserId: id });
//           if (deleteResult.deletedCount > 0) {
//             console.log("User deleted from database");
//           } else {
//             console.log("User not found in database");
//           }
//           break;
//         default:
//           console.log(`Unhandled event type: ${eventType}`);
//       }
//       res.status(200).json({
//         success: true,
//         message: "Webhook received and verified",
//       });
//     } catch (err) {
//       console.error("Webhook verification failed:", err.message); // Detailed error message
//       res.status(400).json({
//         success: false,
//         message: err.message,
//       });
//     }
//   }
// );



app.post(
  "/api/webhooks",
  bodyParser.raw({ type: "application/json" }), // Parse raw payload as a buffer
  async function (req, res) {
    try {
      const payloadBuffer = req.body; // This is a Buffer because of .raw()
      const payloadString = JSON.stringify(payloadBuffer); // Convert Buffer to string for verification
      const svixHeaders = req.headers;

      const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
      const evt = wh.verify(payloadString, svixHeaders); // Verifies the incoming webhook payload
      
      const { id, ...attributes } = evt.data;
      const eventType = evt.type;
      if (eventType === "user.created") {
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
        console.log("User saved to database");
      }
      if (eventType === "user.deleted") {
        console.log(`User ${id} deleted`);
        User.deleteOne({ clerkUserId: id });
      }

      res.status(200).json({
        success: true,
        message: "Webhook received and verified",
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

//admin-dashboard user
app.get('/get-users', async (req, res) => {
  try {
    const userDetail = await User.find();
    res.json(userDetail);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
});




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
    userId: req.body.UserId,
    status: req.body.Status,
    profit: req.body.Profit
  });
  await newInvoice.save();
});
app.get("/insert_full_invoice_detail", async (req, res) => {
  const userId = req.query.userId; // Get userId from query parameters
  const adminUser = await AdminUser.findOne({ userId });
  if (!adminUser) {
    try {
      const invoices = await Invoice.find({ userId });
      const formattedInvoices = invoices.map((invoice) => {
        const totalAmount =
          invoice.productLines && invoice.productLines.length > 0
            ? invoice.productLines.reduce(
                (sum, product) => sum + (product.amount || 0),
                0
              )
            : 0;
        return {
          sellerName: invoice.supplier?.name || "",
          customerName: invoice.customer_billing?.name,
          invoiceNumber: invoice.invoiceNumber || "",
          invoiceDate: invoice.invoiceDate || "",
          totalAmount: totalAmount,
          status: invoice.status,
          userId: invoice.userId,
        };
      });
      res.json(formattedInvoices);
    } catch (err) {
      console.error("Error fetching invoices:", err);
      res.status(500).json({ error: err.message });
    }
  } else {
    try {
      const invoices = await Invoice.find();
      const formattedInvoices = invoices.map((invoice) => {
        const totalAmount =
          invoice.productLines && invoice.productLines.length > 0
            ? invoice.productLines.reduce(
                (sum, product) => sum + (product.amount || 0),
                0
              )
            : 0;
        return {
          sellerName: invoice.supplier?.name || "",
          customerName: invoice.customer_billing?.name,
          invoiceNumber: invoice.invoiceNumber || "",
          invoiceDate: invoice.invoiceDate || "",
          totalAmount: totalAmount,
          status: invoice.status,
          userId: invoice.userId,
        };
      });
      res.json(formattedInvoices);
    } catch (err) {
      console.error("Error fetching invoices:", err);
      res.status(500).json({ error: err.message });
    }
  }
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
    return res
      .status(400)
      .json({ error: "Name and company query parameters are required" });
  }

  const query = { name: name };
  if (company === "supplier") {
    Supplier.findOne(query)
      .then((supplier_detail) => {
        if (!supplier_detail) {
          return res.status(404).json({ error: "Seller not found" });
        }
        res.json(supplier_detail);
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  } else if (
    company === "customer_billing" ||
    company === "customer_shipping"
  ) {
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

app.get("/insert", (req, res) => {
  Customer.find({}, "name")
    .then((customer_name) => res.json(customer_name))
    .catch((err) => res.json(err));
});

app.get("/get_invoice_number", async (req, res) => {
  try {
    const { userId } = req.query;

    const result = await Invoice.aggregate([
      {
        $match: {
          userId: userId.toString(), // Ensure userId is a string
        },
      },
      {
        $project: {
          invoiceNumberAsInt: {
            $toInt: "$invoiceNumber", // Convert string invoiceNumber to integer for sorting
          },
          originalInvoiceNumber: "$invoiceNumber",
        },
      },
      {
        $sort: { invoiceNumberAsInt: -1 }, // Sort in descending order to get the latest invoice number
      },
      {
        $limit: 1, // Limit to the highest invoice number
      },
    ]);


    const maxInvoiceNumber = result.length > 0 ? result[0].originalInvoiceNumber : "0";
    res.status(200).json({ maxInvoiceNumber });
  } catch (err) {
    console.error("Error retrieving invoice number:", err); // Log the error for debugging
    res.status(500).json({ message: "Error retrieving invoice number", error: err.message });
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
      userId: req.body.userId,
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
      userId: req.body.userId,
    });

    await formData.save();
    res.send("inserted data..");
  } catch (err) {
    console.log(err);
  }
});
app.get("/getCustomer", (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  Customer.find({ userId: userId })
    .then((customers) => res.json(customers))
    .catch((err) => res.status(500).json({ error: err.message }));
});
app.get("/getSupplier", (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  Supplier.find({ userId: userId })
    .then((supplier) => res.json(supplier))
    .catch((err) => res.status(500).json({ error: err.message }));
});


//statusupdate
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

    res.status(200).json({
      message: "Invoice status updated successfully",
      invoice: updatedInvoice,
    });
  } catch (error) {
    console.error("Error updating invoice status:", error);
    res
      .status(500)
      .json({ message: "Error updating invoice status", error: error.message });
  }
});

app.get('/api/check', async (req, res) => {
  const userId = req.query.userId;

  try {
    // Check if the user is an admin
    const adminUser = await AdminUser.findOne({ userId });
    if (!adminUser) {
      return res.json(false);  // Return false if no admin user is found
    } else {
      return res.json(true);   // Return true if an admin user exists
    }
  } catch (error) {
    // Handle any errors that occur during the query
    console.error("Error finding admin user:", error);
    return res.status(500).json({ message: 'Server Error' });
  }
});



app.get("/api/expenses", async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const adminUser = await AdminUser.findOne({ userId });
    let expenses = "";
    if (!adminUser) {
      expenses = await Expense.find({ userId });
    } else {
      expenses = await Expense.find();
    }
    res.json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res
      .status(500)
      .json({ message: "Error fetching expenses", error: error.message });
  }
});

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
    res
      .status(500)
      .json({ message: "Error adding expense", error: error.message });
  }
});

app.get("/api/expense-names", async (req, res) => {
  try {
    const userId = req.query.userId; // Assuming userId is passed as a query parameter
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    const expenseNames = await ExpenseName.find({ userId });
    res.json(expenseNames.map((expenseName) => expenseName.name));
  } catch (error) {
    console.error("Error fetching expense names:", error);
    res
      .status(500)
      .json({ message: "Error fetching expense names", error: error.message });
  }
});

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
    res
      .status(500)
      .json({ message: "Error adding expense name", error: error.message });
  }
});

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
    res
      .status(500)
      .json({ message: "Error fetching bank details", error: error.message });
  }
});

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
    res
      .status(500)
      .json({ message: "Error adding bank detail", error: error.message });
  }
});



app.get("/getCustomerName", (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  Customer.find({ userId: userId }, "name")
    .then((customers) => {
      if (customers.length === 0) {
        return res.status(404).json({ error: "Customers not found" });
      }
      const customerNames = customers.map((customer) => customer.name);
      res.json(customerNames);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.get("/getSupplierName", (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  Supplier.find({ userId: userId }, "name")
    .then((suppliers) => {
      if (suppliers.length === 0) {
        return res.status(404).json({ error: "Suppliers not found" });
      }

      const supplierNames = suppliers.map((supplier) => supplier.name);
      res.json(supplierNames);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.get("/api/sales", async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    const sampleInvoice = await Invoice.findOne();

    const salesData = await Promise.all(
      Array.from({ length: 12 }, async (_, month) => {
        const { start, end } = getMonthRange(currentYear, month);
        const result = await Invoice.aggregate([
          {
            $match: {
              invoiceDate: {
                $gte: start.toISOString().split("T")[0],
                $lte: end.toISOString().split("T")[0],
              },
            },
          },
          {
            $unwind: {
              path: "$productLines",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $group: {
              _id: null,
              totalSales: { $sum: { $toDouble: "$productLines.amount" } },
            },
          },
        ]);

        return result.length > 0 ? result[0].totalSales : 0;
      })
    );
    res.json(salesData);
  } catch (error) {
    console.error("Error in /api/sales:", error);
    res.status(500).json({ message: error.message });
  }
});
app.get("/api/revenue", async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    const revenueData = await Promise.all(
      Array.from({ length: 12 }, async (_, month) => {
        const { start, end } = getMonthRange(currentYear, month);

        const result = await Invoice.aggregate([
          {
            $match: {
              invoiceDate: {
                $gte: start.toISOString().split("T")[0],
                $lte: end.toISOString().split("T")[0],
              },
            },
          },
          {
            $unwind: {
              path: "$taxLines",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $group: {
              _id: null,
              totalRevenue: {
                $sum: {
                  $add: [
                    { $toDouble: "$taxLines.taxableValue" },
                    { $toDouble: "$taxLines.totalTaxAmount" },
                  ],
                },
              },
            },
          },
        ]);

        return result.length > 0 ? result[0].totalRevenue : 0;
      })
    );

    res.json(revenueData);
  } catch (error) {
    console.error("Error in /api/revenue:", error);
    res.status(500).json({ message: error.message });
  }
});

function getMonthRange(year, month) {
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0);
  return { start, end };
}



// API to get summary data
app.get("/api/summary", async (req, res) => {
  try {
    const summary = await Invoice.aggregate([
      {
        $facet: {
          totalSales: [
            { $unwind: "$productLines" },
            { $group: { _id: null, total: { $sum: "$productLines.amount" } } },
          ],
          totalRevenue: [
            { $unwind: "$taxLines" },
            {
              $group: {
                _id: null,
                total: {
                  $sum: {
                    $add: [
                      "$taxLines.taxableValue",
                      "$taxLines.totalTaxAmount",
                    ],
                  },
                },
              },
            },
          ],
        },
      },
    ]);

    const totalSales = summary[0].totalSales[0]?.total || 0;
    const totalRevenue = summary[0].totalRevenue[0]?.total || 0;
    const profitMargin =
      totalSales > 0 ? ((totalRevenue - totalSales) / totalSales) * 100 : 0;

    res.json({
      totalSales,
      totalRevenue,
      profitMargin: profitMargin.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/calculate-expense', async (req, res)=>{
  const userId = req.query.userId;
  const expenses = await Expense.find({userId:userId}, "amount date" )
  
  totalExpense = 0
  expenses.forEach(expense=>{
    const parsedDate = new Date(expense.date);
    parsedDate.setHours(0, 0, 0, 0)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (parsedDate.getTime() === today.getTime()) {
      totalExpense += expense.amount;
    }
  })
  

  res.status(200).json({ totalExpense });
})
app.get('/calculate-revenue', async (req, res) => {
  try {
    const userId = req.query.userId;
    
    // Fetch invoices for the given userId from the database
    const invoices = await Invoice.find({ userId: userId }, "invoiceDate productLines taxLines");

    let totalRevenue = 0;

    invoices.forEach(invoice => {
      // Calculate the total amount for each invoice
      const totalProductAmount = invoice.productLines.reduce((sum, line) => sum + (line.amount || 0), 0);
      const totalTaxAmount = invoice.taxLines.reduce((sum, line) => sum + (line.totalTaxAmount || 0), 0);
      const totalAmount = totalProductAmount + totalTaxAmount;
      
      // Parse the date string into a Date object
      const parsedDate = new Date(invoice.invoiceDate);
      parsedDate.setHours(0, 0, 0, 0)

      // Get today's date and set time to midnight for a clean comparison
      const today = new Date();
      today.setHours(0, 0, 0, 0);


      // Add to total revenue if the parsed date matches today's date
      if (parsedDate.getTime() === today.getTime()) {
        totalRevenue += totalAmount;
      }
    });

    // Send the calculated total revenue as a response
    res.status(200).json({ totalRevenue });
  } catch (error) {
    console.error('Error calculating revenue:', error);
    res.status(500).json({ message: 'Error calculating revenue', error });
  }
});


app.get('/products/:userId', async (req, res) => {
  const { userId } = req.params;
  
  try {
    const products = await Product.find({ userId });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});



app.post('/products', async (req, res) => {
  const { userId, name, hsn, cost, per } = req.body;

  if (!userId || !name || !cost) {
    return res.status(400).json({ message: 'UserId, name, and cost are required' });
  }

  try {
    const newProduct = new Product({
      userId,
      name,
      hsn,
      cost,
      per
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error saving product', error });
  }
});


//isDefault
app.post('/setDefaultSupplier', async (req, res) => {
  try {
    const { userId, supplierId } = req.body;

    // Reset all suppliers to non-default
    await Supplier.updateMany({ userId }, { isDefault: false });

    // Set the selected supplier as default
    await Supplier.findOneAndUpdate(
      { _id: supplierId, userId },
      { isDefault: true },
      { new: true }
    );

    res.status(200).json({ message: 'Default supplier set successfully' });
  } catch (error) {
    console.error('Error setting default supplier:', error);
    res.status(500).json({ message: 'Failed to set default supplier' });
  }
});

app.get('/getDefaultSupplier', async(req, res) => {
  try {
    const userId = req.query.userId;

    
    if (!userId) {
      console.log("No userId provided");
      return res.status(400).json({ message: 'userId is required' });
    }

    const defaultSupplier = await Supplier.findOne({ 
      userId: userId.toString(), // Ensure userId is a string
      isDefault: true 
    });
    

    
    if (!defaultSupplier) {
      console.log("No default supplier found for userId:", userId);
      return res.status(404).json({ message: 'No default supplier found' });
    }

    res.status(200).json(defaultSupplier);
  } catch (error) {
    console.error('Error fetching default supplier:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
