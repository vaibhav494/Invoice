console.log("index js started")

const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');
const app = express();

const Customer = require('./models/dataScheme')
const Invoice_detail = require('./models/full_invoice_detail')
const User = require('./models/UserModel')
app.use(express.json());

app.use(cors());
console.log("before mongo conn")
mongoose.connect('mongodb://localhost:27017/invoice')


app.post('/users', async (req, res) => {
    const { clerkId, firstName, lastName, email } = req.body;
  
    const newUser = new User({ clerkId, firstName, lastName, email });
    await newUser.save();
    res.status(201).send('User created');
  });


app.get('/get_seller_detail/:name', (req, res) => {
    const { name } = req.params;

    if (!name) {
        return res.status(400).json({ error: 'Name query parameter is required' });
    }

    Customer.findOne({ name: name })
        .then(seller_detail => {
            if (!seller_detail) {
                return res.status(404).json({ error: 'Seller not found' });
            }
            res.json(seller_detail);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/')

app.post('/insert_full_invoice_detail', async(req, res)=>{
    try {
        const sn = req.body.Supplier_name;
        const cn = req.body.Customer_name;
        const In = req.body.Invoice_number;
        const id = req.body.Invoice_date;
        const ta = req.body.Total_amount;

        const formData1 = await Invoice_detail.create({

            Supplier_Name: sn,
            Customer_Name: cn,
            Invoice_Number: In,
            Invoice_Date: id,
            Total_Amount: ta,
            // All_invoice_detail: req.body.all_data,
            // All_Product_detail: req.body.product_detail,
            // All_Tax_detail: req.body.tax_detail


        })
            await formData1.save();
            res.send("invoice data added..")
        } catch(err) {
            console.log(err)
        }
})

app.get('/insert_full_invoice_detail', (req, res)=>{

    Invoice_detail.find()
    .then(invoice_detail => res.json(invoice_detail))
    .catch(err => res.json(err))
})

app.get('/insert', (req, res)=>{
    Customer.find({},'name')
    .then(customer_name => res.json(customer_name))
    .catch(err => res.json(err))
})



app.get('/get_invoice_number', async (req, res) => {
    try {
        const result = await Invoice_detail.aggregate([
            {
                $project: {
                    invoiceNumberAsInt: {
                        $toInt: "$All_invoice_detail.invoice_number"
                    },
                    originalInvoiceNumber: "$All_invoice_detail.invoice_number"
                }
            },
            {
                $sort: { invoiceNumberAsInt: -1 }
            },
            {
                $limit: 1
            }
        ]);

        // Extract the highest invoice number from the result
        const maxInvoiceNumber = result.length > 0 ? result[0].originalInvoiceNumber : "0";
        
        // Send the invoice number as the response
        res.status(200).json({ maxInvoiceNumber });
    } catch (err) {
        console.error('Error retrieving invoice number:', err);  // Log the error for debugging
        res.status(500).json({ message: 'Error retrieving invoice number', error: err.message });
    }
});



app.post('/insert', async(req, res) => {
    try {
    const formData = await Customer.create({
        name: req.body.customer_name,
        address: req.body.customer_address,
        gst: req.body.customer_gst,
        state: req.body.customer_state,
        stateCode: req.body.customer_state_code   
    })

    await formData.save();
    res.send("inserted data..")
    } catch(err) {
        console.log(err)
    }
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
